import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Prices live on the server so the browser can never change the amount.
export const COURSE_PLANS: Record<string, { name: string; amount: number }> = {
  job: { name: "Job Exams", amount: 199900 },
  higher: { name: "Higher Education Entrance Exams", amount: 199900 },
  abroad: { name: "Abroad Education Exams", amount: 199900 },
};

export const isEmail = (v: unknown): v is string =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());