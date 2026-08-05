import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/lib/validations/registration";
import { Prisma } from "@/generated/prisma";
import { sendAdminNotification, sendStudentConfirmation } from "@/lib/email";

// Verifies a Turnstile token with Cloudflare's server. Returns true only if
// Cloudflare confirms the token is real, unexpired, and unused.
async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  try {
    const formData = new URLSearchParams();
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY as string);
    formData.append("response", token);
    if (remoteIp) formData.append("remoteip", remoteIp);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false; // fail closed — if we can't verify, don't trust it
  }
}

export async function POST(req: Request) {
  try {
    // 1. Read request body
    const raw = await req.json();

    // 1a. Honeypot check — must run before anything else.
    // `website` should always be empty for real users (it's hidden via CSS).
    // If it has a value, a bot filled it in. We return a fake "success" so
    // the bot doesn't learn it was caught, but we never touch the DB/email.
    if (typeof raw.website === "string" && raw.website.trim() !== "") {
      return NextResponse.json({
        success: true,
        message: "We will contact you within 24 hours.",
      });
    }

    // 1b. Turnstile check — must run before schema validation/DB work too.
    const turnstileToken = raw.turnstileToken;
    if (typeof turnstileToken !== "string" || !turnstileToken) {
      return NextResponse.json(
        { success: false, message: "Verification failed. Please try again." },
        { status: 400 },
      );
    }

    const remoteIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const isHuman = await verifyTurnstileToken(turnstileToken, remoteIp);

    if (!isHuman) {
      return NextResponse.json(
        { success: false, message: "Verification failed. Please try again." },
        { status: 400 },
      );
    }

    // Strip honeypot + turnstile fields before they reach the real schema —
    // the schema doesn't know about them and doesn't need to.
    const { website, turnstileToken: _token, ...formData } = raw;
    void website;
    void _token;

    // 2. Validate on the server too — never trust the client.
    let body;
    try {
      body = await registrationSchema.validate(formData, {
        abortEarly: false,
        stripUnknown: true,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) throw err; // unreachable, but keeps TS narrow
      const message =
        err && typeof err === "object" && "errors" in err
          ? (err as { errors: string[] }).errors.join(", ")
          : "Invalid submission";
      return NextResponse.json({ success: false, message }, { status: 400 });
    }

    const email = body.email.trim().toLowerCase();
    const phone = body.phone.trim();

    // 3. Check if the student already exists, and say which field collided.
    const existing = await prisma.studentRegistration.findFirst({
      where: { OR: [{ email }, { phone }] },
      select: { email: true, phone: true },
    });

    if (existing) {
      const message =
        existing.email === email
          ? "This email is already registered"
          : "This phone number is already registered";
      return NextResponse.json({ success: false, message }, { status: 409 });
    }

    // 4. Create a new registration
    try {
      const student = await prisma.studentRegistration.create({
        data: {
          firstName: body.firstName.trim(),
          lastName: body.lastName.trim(),
          email,
          phone,
          courseCategory: body.courseCategory,
          preferredCourses: (body.preferredCourses ?? []) as string[],
          classType: body.classType,
          classMode: body.classMode,
          preferredTime: body.preferredTime,
          goals: body.goals?.trim() || null,
        },
      });

      try {
        await Promise.all([
          sendStudentConfirmation({
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            phone: student.phone,
            courseCategory: student.courseCategory,
            preferredCourses: student.preferredCourses as string[],
            classType: student.classType,
            classMode: student.classMode,
            preferredTime: student.preferredTime,
            goals: student.goals ?? undefined,
          }),

          sendAdminNotification({
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            phone: student.phone,
            courseCategory: student.courseCategory,
            preferredCourses: student.preferredCourses as string[],
            classType: student.classType,
            classMode: student.classMode,
            preferredTime: student.preferredTime,
            goals: student.goals ?? undefined,
          }),
        ]);
      } catch (emailError) {
        console.error("Email Sending Error:", emailError);
      }

      return NextResponse.json({
        success: true,
        message: "We will contact you within 24 hours.",
        student,
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        return NextResponse.json(
          { success: false, message: "Student already registered" },
          { status: 409 },
        );
      }
      throw err;
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Registration failed",
        debug: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
