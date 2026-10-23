import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { razorpay, COURSE_PLANS, isEmail } from "@/lib/razorpay";
import { markPaidAndNotify } from "@/lib/enrollment";
import {
  getBookableDates,
  subjectsFor,
  isPhone,
  isMeetingMode,
  HOLD_MINUTES,
} from "@/lib/consulting";

const bad = (error: string, status = 400) =>
  NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return bad("Invalid request");
    const { email, courseKey, consultDate, subjects, contactEmail, contactPhone, meetingMode  } = body;

    const plan = COURSE_PLANS[courseKey];
    if (!isEmail(email) || !plan) return bad("Invalid request");

    if (typeof consultDate !== "string" || !getBookableDates().includes(consultDate)) {
      return bad("Please choose a valid date (Monday to Saturday).");
    }

    const allowed = subjectsFor(courseKey);
    if (
      !Array.isArray(subjects) ||
      subjects.length === 0 ||
      !subjects.every((s) => typeof s === "string" && allowed.includes(s))
    ) {
      return bad("Please select at least one valid class.");
    }
    const cleanSubjects = Array.from(new Set(subjects as string[]));

    if (!isEmail(contactEmail)) return bad("Enter a valid contact email.");
    if (!isMeetingMode(meetingMode)) return bad("Please choose Online or Offline.");
    const cleanEmail = email.trim().toLowerCase();
    const cleanContactEmail = contactEmail.trim().toLowerCase();

    // Never create an order for an unregistered email
    const student = await prisma.studentRegistration.findUnique({
      where: { email: cleanEmail },
      select: { phone: true },
    });
    if (!student) return NextResponse.json({ notRegistered: true });

    // Blank phone = use the registered one
    const phone = contactPhone ? String(contactPhone) : student.phone;
    if (!isPhone(phone)) return bad("Enter a valid 10-digit phone number.");

    const now = new Date();

    // Free every hold whose time has run out
    await prisma.consulting_payment.updateMany({
      where: { status: "PENDING", holdExpiresAt: { lt: now } },
      data: { status: "EXPIRED", slotKey: null },
    });

    // ---- This student already has a live order: reuse the SAME row and order id ----
    const existing = await prisma.consulting_payment.findFirst({
      where: {
        email: cleanEmail,
        status: "PENDING",
        holdExpiresAt: { gt: now },
        amount: plan.amount,
      },
    });

    if (existing) {
      // Was that order already paid (e.g. the network dropped after paying)?
      try {
        const rzOrder = await razorpay.orders.fetch(existing.razorpayOrderId);
        if (rzOrder.status === "paid") {
          const pays: any = await razorpay.orders.fetchPayments(existing.razorpayOrderId);
          const captured = (pays?.items ?? []).find((p: any) => p.status === "captured");
          if (captured) await markPaidAndNotify(existing.razorpayOrderId, captured.id);
          return bad(
            "Your payment for this booking was already received. Please check your email for the confirmation.",
            409,
          );
        }
      } catch (err) {
        console.error("[payments/create-order] could not check existing order", err);
        // fall through and reuse the order anyway
      }

      try {
        // Same row, same order: only the details change. The expiry is NOT extended.
        await prisma.consulting_payment.update({
          where: { id: existing.id },
          data: {
            courseKey,
            consultDate: new Date(`${consultDate}T00:00:00Z`),
            slotKey: consultDate, // unique: if taken, this fails and the old date stays held
            meetingMode,
            subjects: cleanSubjects,
            contactEmail: cleanContactEmail,
            contactPhone: phone,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
          return bad("Sorry, that date was just booked. Please pick another.", 409);
        }
        throw e;
      }

      // Keep the Razorpay order's notes in step (best effort)
      try {
        await (razorpay.orders as any).edit(existing.razorpayOrderId, {
          notes: { email: cleanEmail, courseKey, consultDate },
        });
      } catch {}

      return NextResponse.json({
        orderId: existing.razorpayOrderId,
        amount: existing.amount,
        currency: "INR",
        keyId: process.env.RAZORPAY_KEY_ID,
        courseName: plan.name,
      });
    }

    // ---- No live order: create a new one ----
    const order = await razorpay.orders.create({
      amount: plan.amount,
      currency: "INR",
      receipt: `${courseKey}_${Date.now()}`,
      notes: { email: cleanEmail, courseKey, consultDate },
    });

    try {
      // Release any other unpaid hold of this student, then take the date, in one step
      await prisma.$transaction([
        prisma.consulting_payment.updateMany({
          where: { status: "PENDING", email: cleanEmail },
          data: { status: "EXPIRED", slotKey: null },
        }),
        prisma.consulting_payment.create({
          data: {
            email: cleanEmail,
            contactEmail: cleanContactEmail,
            contactPhone: phone,
            courseKey,
            subjects: cleanSubjects,
            consultDate: new Date(`${consultDate}T00:00:00Z`),
            slotKey: consultDate, // unique: the DB rejects a double booking
            holdExpiresAt: new Date(now.getTime() + HOLD_MINUTES * 60_000),
            amount: plan.amount,
            razorpayOrderId: order.id,
          },
        }),
      ]);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        return bad("Sorry, that date was just booked. Please pick another.", 409);
      }
      throw e;
    }

    return NextResponse.json({
      orderId: order.id,
      amount: plan.amount,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID,
      courseName: plan.name,
    });
  } catch (err) {
    console.error("[payments/create-order]", err);
    return bad("Server error", 500);
  }
}