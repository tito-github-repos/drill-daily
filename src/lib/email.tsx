import StudentConfirmation from "@/templates/studentConfirmation";
import AdminNotification from "@/templates/adminNotification";
import { resend } from "./resend";
import {
  courseCategoryLabels,
  classTypeLabels,
  classModeLabels,
  preferredTimeLabels,
  label,
} from "./registrationLabels";

interface RegistrationEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseCategory: string;
  preferredCourses: string[];
  classType: string;
  classMode: string;
  preferredTime: string;
  goals?: string;
}

export async function sendStudentConfirmation(data: RegistrationEmailData) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: data.email,
    subject: "Drill Daily Registration Confirmation",
    react: (
      <StudentConfirmation
        firstName={data.firstName}
        courseCategory={label(courseCategoryLabels, data.courseCategory)}
        preferredCourses={data.preferredCourses}
        classType={label(classTypeLabels, data.classType)}
        classMode={label(classModeLabels, data.classMode)}
        preferredTime={label(preferredTimeLabels, data.preferredTime)}
      />
    ),
  });
}

export async function sendAdminNotification(data: RegistrationEmailData) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: process.env.ADMIN_EMAIL!,
    subject: "New Drill Daily Registration",
    react: (
      <AdminNotification
        firstName={data.firstName}
        lastName={data.lastName}
        email={data.email}
        phone={data.phone}
        courseCategory={label(courseCategoryLabels, data.courseCategory)}
        preferredCourses={data.preferredCourses}
        classType={label(classTypeLabels, data.classType)}
        classMode={label(classModeLabels, data.classMode)}
        preferredTime={label(preferredTimeLabels, data.preferredTime)}
        goals={data.goals}
      />
    ),
  });
}