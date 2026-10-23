import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { COURSE_PLANS, isEmail } from "@/lib/razorpay";
import { COURSE_CATEGORY, getBookableDates, subjectsFor } from "@/lib/consulting";

export async function POST(req: Request) {
  try {
    const { email, courseKey } = await req.json();
    if (!isEmail(email) || !COURSE_PLANS[courseKey]) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const cleanEmail = email.trim().toLowerCase();

    const student = await prisma.studentRegistration.findUnique({
      where: { email: cleanEmail },
      select: {
        firstName: true,
        lastName: true,
        phone: true,
        courseCategory: true,
        preferredCourses: true,
      },
    });
    if (!student) return NextResponse.json({ registered: false });

    const bookableDates = getBookableDates();

    // Taken = paid, or an unexpired hold from someone mid-payment
    const holds = await prisma.consulting_payment.findMany({
      where: {
        slotKey: { in: bookableDates },
        OR: [
          { status: "PAID" },
          { status: "PENDING", holdExpiresAt: { gt: new Date() } },
        ],
      },
      select: {
        slotKey: true,
        email: true,
        status: true,
        holdExpiresAt: true,
        razorpayOrderId: true,
      },    
    });

    const isMine = (h: (typeof holds)[number]) =>
      h.status === "PENDING" && h.email === cleanEmail;

    // The student's own unpaid hold is NOT "booked" for them: they can resume it
    const mine = holds.find(isMine);
    const bookedDates = holds
      .filter((h) => !isMine(h))
      .map((h) => h.slotKey)
      .filter((k): k is string => k !== null);

    // Pre-fill registered classes only if they registered for THIS course category
    const allowed = subjectsFor(courseKey);
    const sameCategory = student.courseCategory === COURSE_CATEGORY[courseKey];
    const saved: string[] = (
      Array.isArray(student.preferredCourses) ? student.preferredCourses : []
    )
      .filter((s): s is string => typeof s === "string" && s.trim() !== "")
      .map((s) => s.trim());
    const subjects = sameCategory
      ? saved
          .map((s) => allowed.find((a) => a.toLowerCase() === s.toLowerCase()))
          .filter((s): s is string => !!s)
      : [];

    return NextResponse.json({
      registered: true,
      student: {
        firstName: student.firstName,
        lastName: student.lastName,
        phone: student.phone,
        subjects,
      },
      bookableDates,
      bookedDates,
      myHold:
        mine && mine.slotKey
          ? {
              date: mine.slotKey,
              orderId: mine.razorpayOrderId,
              expiresAt: mine.holdExpiresAt?.toISOString() ?? null,
            }
          : null,
    });
  } catch (err) {
    console.error("[payments/check]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}