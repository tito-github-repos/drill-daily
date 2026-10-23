import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isEmail } from "@/lib/razorpay";

// Called when the student closes the Razorpay window without paying
export async function POST(req: Request) {
  try {
    const { email, orderId } = await req.json();
    if (!isEmail(email) || typeof orderId !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Only ever touches an unpaid hold that belongs to this email
    await prisma.consulting_payment.updateMany({
      where: {
        razorpayOrderId: orderId,
        email: email.trim().toLowerCase(),
        status: "PENDING",
      },
      data: { status: "EXPIRED", slotKey: null, holdExpiresAt: null },
    });

    return NextResponse.json({ released: true });
  } catch (err) {
    console.error("[payments/release]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}