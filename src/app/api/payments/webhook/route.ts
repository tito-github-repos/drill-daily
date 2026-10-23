import { NextResponse } from "next/server";
import crypto from "crypto";
import { markPaidAndNotify } from "@/lib/enrollment";

export async function POST(req: Request) {
  // Must read the RAW body, since the signature is computed over exact bytes
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(raw)
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(raw);

  // Both events carry the payment entity; markPaidAndNotify is idempotent
  if (event.event === "payment.captured" || event.event === "order.paid") {
    const p = event.payload?.payment?.entity;
    if (p?.order_id && p?.id) {
      await markPaidAndNotify(p.order_id, p.id);
    }
  }

  // Always return 200 for events you don't handle, or Razorpay keeps retrying
  return NextResponse.json({ received: true });
}