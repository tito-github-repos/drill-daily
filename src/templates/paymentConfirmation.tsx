import {
  Body, Container, Head, Heading, Html, Preview,
  Section, Text, Button,
} from "@react-email/components";

interface PaymentConfirmationProps {
  firstName: string;
  courseName: string;
  amount: string;
  paymentId: string;
  consultDate: string;
  slot: string;
  subjects: string[];
}

export default function PaymentConfirmation({
  firstName, courseName, amount, paymentId, consultDate, slot, subjects,
}: PaymentConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Payment received for {courseName}</Preview>
      <Body style={{ backgroundColor: "#f5f7fa", fontFamily: "Arial, sans-serif", padding: "30px 0" }}>
        <Container
          style={{
            maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff",
            borderRadius: "8px", border: "1px solid #e5e7eb", padding: "30px",
          }}
        >
          <Heading style={{ color: "#16a34a", fontSize: "26px", marginBottom: "20px" }}>
            Consultation Booked
          </Heading>

          <Text>Dear <strong>{firstName}</strong>,</Text>
          <Text>
            Thank you for your payment. Your consultation for <strong>{courseName}</strong> is confirmed.
          </Text>

          <Section
            style={{
              backgroundColor: "#f8fafc", border: "1px solid #e2e8f0",
              borderRadius: "6px", padding: "15px", margin: "20px 0",
            }}
          >
            <Text><strong>Date:</strong> {consultDate}</Text>
            <Text><strong>Time:</strong> {slot}</Text>
            <Text><strong>Subjects:</strong> {subjects.join(", ")}</Text>
            <Text><strong>Amount Paid:</strong> ₹{amount}</Text>
            <Text><strong>Payment ID:</strong> {paymentId}</Text>
          </Section>

          {/* <Button
            href={courseUrl}
            style={{
              backgroundColor: "#16a34a", color: "#fff", padding: "12px 24px",
              borderRadius: "6px", fontWeight: "bold", textDecoration: "none",
            }}
          >
            Start course
          </Button> */}

          <Section style={{ marginTop: "30px", borderTop: "1px solid #e5e7eb", paddingTop: "20px" }}>
            <Text style={{ fontWeight: "bold", color: "#0f172a" }}>Drill Daily Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}