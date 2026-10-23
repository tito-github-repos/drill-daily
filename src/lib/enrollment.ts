import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { razorpay, COURSE_PLANS } from "@/lib/razorpay";
import { sendPaymentEmails } from "@/lib/mail";
import { formatSlotDate, SLOT_LABEL } from "@/lib/consulting";

export type PayResult = "paid" | "already" | "refunded" | "conflict" | "notfound";

const payableWhere = (orderId: string) => ({
  razorpayOrderId: orderId,
  status: { in: ["PENDING", "EXPIRED"] },
});

// Paid, but the date now belongs to someone else: refund automatically.
async function refundConflict(orderId: string, paymentId: string): Promise<PayResult> {
  // Only one caller (verify OR webhook) gets to claim and refund
  const claimed = await prisma.consulting_payment.updateMany({
    where: payableWhere(orderId),
    data: {
      status: "CONFLICT",
      razorpayPaymentId: paymentId,
      slotKey: null,
      holdExpiresAt: null,
    },
  });
  if (claimed.count !== 1) return "conflict";

  try {
    await razorpay.payments.refund(paymentId, {
      speed: "normal",
      notes: { reason: "Consultation date no longer available" },
    });
    await prisma.consulting_payment.updateMany({
      where: { razorpayOrderId: orderId },
      data: { status: "REFUNDED" },
    });
    console.error(`SLOT CONFLICT: auto-refunded payment ${paymentId} (order ${orderId})`);
    return "refunded";
  } catch (err) {
    // Row stays CONFLICT so you can find it: refund it manually in the Razorpay dashboard
    console.error(`SLOT CONFLICT: refund FAILED for ${paymentId} (order ${orderId})`, err);
    return "conflict";
  }
}

export async function markPaidAndNotify(
  orderId: string,
  paymentId: string,
): Promise<PayResult> {
  const row = await prisma.consulting_payment.findUnique({
    where: { razorpayOrderId: orderId },
  });
  if (!row) return "notfound";
  if (row.status === "PAID") return "already";
  if (row.status === "REFUNDED") return "refunded";
  if (row.status === "CONFLICT") return "conflict";

  const slot = row.consultDate.toISOString().slice(0, 10);

  let flipped: number;
  try {
    // Atomic: only the first caller flips to PAID.
    // EXPIRED is included so a late payment still counts when the date is free.
    const r = await prisma.consulting_payment.updateMany({
      where: payableWhere(orderId),
      data: { status: "PAID", razorpayPaymentId: paymentId, slotKey: slot, holdExpiresAt: null },
    });
    flipped = r.count;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return refundConflict(orderId, paymentId);
    }
    throw e;
  }
  if (flipped !== 1) return "already"; // another caller got there first, so no duplicate emails

  // The booking is already PAID. A failed email must never undo or hide that.
  try {
    const student = await prisma.studentRegistration.findUnique({
      where: { email: row.email },
      select: { firstName: true, lastName: true },
    });

    await sendPaymentEmails({
      to: row.contactEmail,
      registeredEmail: row.email,
      firstName: student?.firstName ?? "Student",
      studentName: student ? `${student.firstName} ${student.lastName}` : row.email,
      phone: row.contactPhone,
      courseName: COURSE_PLANS[row.courseKey]?.name ?? row.courseKey,
      amountPaise: row.amount,
      paymentId,
      orderId,
      consultDate: formatSlotDate(slot),
      slot: SLOT_LABEL,
      subjects: Array.isArray(row.subjects) ? (row.subjects as string[]) : [],
      meetingMode: row.meetingMode ?? undefined,
    });
  } catch (err) {
    console.error(`[payment email failed] order ${orderId} payment ${paymentId}`, err);
  }

  return "paid";
}