import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/lib/validations/registration";
import { Prisma } from "@/generated/prisma";
import { sendAdminNotification, sendStudentConfirmation } from "@/lib/email";

export async function POST(req: Request) {
  try {
    // 1. Read request body
    const raw = await req.json();

    // 2. Validate on the server too — never trust the client.
    let body;
    try {
      body = await registrationSchema.validate(raw, {
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
          // Validated by the schema (min 1), but yup's inferred type still
          // carries `| undefined` here — coalesce so it matches Prisma's
          // InputJsonValue instead of fighting yup's TS inference.
          preferredCourses: (body.preferredCourses ?? []) as string[],
          classType: body.classType,
          classMode: body.classMode,
          preferredTime: body.preferredTime,
          goals: body.goals?.trim() || null,
        },
      });

      // Send emails (doesn't fail the registration if email sending fails)
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
        // Registration is already saved, so don't return an error.
      }

      return NextResponse.json({
        success: true,
        message: "We will contact you within 24 hours.",
        student,
      });
    } catch (err) {
      // Race condition: two submits with the same email/phone landed between
      // our findFirst check and this create() call.
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
    // TEMPORARY — remove once the deployed 500 is diagnosed and fixed.
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
