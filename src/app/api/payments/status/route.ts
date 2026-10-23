import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { razorpay, isEmail } from "@/lib/razorpay";
import { markPaidAndNotify } from "@/lib/enrollment";

// The browser polls this after a network failure.
// If our database still says unpaid, ask Razorpay directly whether the order was paid.
export async function POST(req: Request) {
  try {
    const { email, orderId } = await req.json();
    if (!isEmail(email) || typeof orderId !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const cleanEmail = email.trim().toLowerCase();

    const find = () =>
      prisma.consulting_payment.findUnique({
        where: { razorpayOrderId: orderId },
        select: { status: true, email: true },
      });

    let row = await find();
    if (!row || row.email !== cleanEmail) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (row.status === "PENDING" || row.status === "EXPIRED") {
      try {
        const res: any = await razorpay.orders.fetchPayments(orderId);
        const paid = (res?.items ?? []).find((p: any) => p.status === "captured");
        if (paid) {
          await markPaidAndNotify(orderId, paid.id);
          row = (await find()) ?? row;
        }
      } catch (err) {
        console.error("[payments/status] Razorpay lookup failed", err);
      }
    }

    return NextResponse.json({ status: row.status });
  } catch (err) {
    console.error("[payments/status]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}