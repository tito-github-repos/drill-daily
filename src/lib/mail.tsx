import PaymentConfirmation from "@/templates/paymentConfirmation";
import PaymentAdminNotification from "@/templates/paymentAdminNotification";
import { resend } from "./resend";

interface PaymentEmailData {
  to: string;              // contact email from the booking form
  registeredEmail: string;
  firstName: string;
  studentName: string;
  phone: string;
  courseName: string;
  amountPaise: number;
  paymentId: string;
  orderId: string;
  consultDate: string;     // already formatted
  slot: string;
  subjects: string[];
}

const formatINR = (paise: number) => (paise / 100).toLocaleString("en-IN");

export async function sendPaymentEmails(d: PaymentEmailData) {
  const amount = formatINR(d.amountPaise);

  const results = await Promise.allSettled([
    resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: d.to,
      subject: `Consultation booked: ${d.consultDate}`,
      react: (
        <PaymentConfirmation
          firstName={d.firstName}
          courseName={d.courseName}
          amount={amount}
          paymentId={d.paymentId}
          consultDate={d.consultDate}
          slot={d.slot}
          subjects={d.subjects}
        />
      ),
    }),
    resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New consultation: ${d.courseName} on ${d.consultDate}`,
      react: (
        <PaymentAdminNotification
          studentName={d.studentName}
          email={d.to}
          registeredEmail={d.registeredEmail}
          phone={d.phone}
          courseName={d.courseName}
          amount={amount}
          paymentId={d.paymentId}
          orderId={d.orderId}
          consultDate={d.consultDate}
          slot={d.slot}
          subjects={d.subjects}
        />
      ),
    }),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`Payment email ${i === 0 ? "student" : "admin"} failed:`, r.reason);
    }
  });
}