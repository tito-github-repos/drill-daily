import { redirect } from "next/navigation";

// Only Class XI coaching is offered for now.
export default function CoachingIndex() {
  redirect("/coaching/class-xi");
}