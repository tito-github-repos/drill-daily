import { NextResponse } from "next/server";
import crypto from "crypto";
import { markPaidAndNotify } from "@/lib/enrollment";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const a = Buffer.from(expected);
    const b = Buffer.from(String(razorpay_signature));
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return NextResponse.json({ error: "Signature mismatch" }, { status: 400 });
    }

    const result = await markPaidAndNotify(razorpay_order_id, razorpay_payment_id);

    if (result === "paid" || result === "already") {
      return NextResponse.json({ success: true });
    }
    if (result === "notfound") {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    // "refunded" | "conflict": the date was taken before this payment completed
    return NextResponse.json(
      {
        error:
          "Sorry, this date was taken before your payment completed. Your payment will be refunded to the original payment method. If you don't see it within 7 days, please contact us.",
      },
      { status: 409 },
    );
  } catch (err) {
    console.error("[payments/verify]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}