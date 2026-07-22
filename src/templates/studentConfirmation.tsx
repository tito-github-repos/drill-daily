import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Row,
  Column,
  Text,
} from "@react-email/components";

interface StudentConfirmationProps {
  firstName: string;
  courseCategory: string;
  preferredCourses: string[];
  classType: string;
  classMode: string;
  preferredTime: string;
}

export default function StudentConfirmation({
  firstName,
  courseCategory,
  preferredCourses,
  classType,
  classMode,
  preferredTime,
}: StudentConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Drill Daily Registration is Confirmed 🎉</Preview>

      <Body
        style={{
          backgroundColor: "#f5f7fa",
          fontFamily: "Arial, sans-serif",
          padding: "30px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            padding: "30px",
          }}
        >
          <Heading
            style={{
              color: "#0f766e",
              fontSize: "26px",
              marginBottom: "20px",
            }}
          >
            Registration Confirmed 🎉
          </Heading>

          <Text>
            Dear <strong>{firstName}</strong>,
          </Text>

          <Text>
            Thank you for registering with Drill Daily. We are excited to
            have you join us!
          </Text>

          <Section
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              padding: "15px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Row>
              <Column>
                <Text>
                  <strong>Course Category:</strong> {courseCategory}
                </Text>

                <Text>
                  <strong>Preferred Classes:</strong>{" "}
                  {preferredCourses.join(", ")}
                </Text>

                <Text>
                  <strong>Class Type:</strong> {classType}
                </Text>

                <Text>
                  <strong>Class Mode:</strong> {classMode}
                </Text>

                <Text>
                  <strong>Preferred Time:</strong> {preferredTime}
                </Text>
              </Column>
            </Row>
          </Section>

          <Text>
            Our team will contact you within 24 hours with further details.
            If you have any questions, feel free to reach out to us.
          </Text>

          <Text>We look forward to helping you reach your goals.</Text>

          <Section
            style={{
              marginTop: "30px",
              borderTop: "1px solid #e5e7eb",
              paddingTop: "20px",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              Drill Daily Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}