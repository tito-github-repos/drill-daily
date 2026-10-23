import { courseOptions } from "@/lib/validations/registration";

export const COURSE_CATEGORY: Record<string, string> = {
  job: "job-exams",
  higher: "higher-education",
  abroad: "abroad-education",
};

// One subject list for registration AND consulting, so they always match
export const subjectsFor = (courseKey: string): string[] =>
  courseOptions[COURSE_CATEGORY[courseKey]] ?? [];

export const SLOT_LABEL = "11:00 AM – 1:00 PM IST";
export const HOLD_MINUTES = 24*60;

// How far ahead a consultation can be booked
export const BOOKING_WINDOW_DAYS = 180;

const IST_OFFSET_MS = 330 * 60 * 1000;

// Next `days` days starting TOMORROW (IST), Sundays excluded. Returns "YYYY-MM-DD".
export function getBookableDates(days = BOOKING_WINDOW_DAYS): string[] {
  const base = new Date(Date.now() + IST_OFFSET_MS);
  base.setUTCHours(0, 0, 0, 0);
  const out: string[] = [];
  for (let i = 1; i <= days; i++) {
    const d = new Date(base.getTime() + i * 86_400_000);
    if (d.getUTCDay() === 0) continue; // Sunday
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

export const formatSlotDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export const isPhone = (v: unknown): v is string =>
  typeof v === "string" && /^[6-9]\d{9}$/.test(v);

export const maskPhone = (p: string) => `******${p.slice(-4)}`;