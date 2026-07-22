// Maps the raw values stored on StudentRegistration (which match the <select>
// values in RegistrationForm.tsx / registrationSchema) to readable labels for
// use in emails and anywhere else we display a registration to a human.

export const courseCategoryLabels: Record<string, string> = {
  "job-exams": "Job Exams",
  "higher-education": "Higher Education Entrance Exams",
  "abroad-education": "Abroad Education Exams",
};

export const classTypeLabels: Record<string, string> = {
  "one-to-one": "One-to-One Classes",
  "group-classes": "Group Classes (Up to 12 students)",
};

export const classModeLabels: Record<string, string> = {
  online: "Online Classes",
  offline: "Offline Classes",
  hybrid: "Hybrid (Both Online & Offline)",
};

export const preferredTimeLabels: Record<string, string> = {
  morning: "Morning (9 AM - 12 PM)",
  afternoon: "Afternoon (12 PM - 4 PM)",
  evening: "Evening (4 PM - 8 PM)",
  night: "Night (8 PM - 10 PM)",
  weekend: "Weekends Only",
  flexible: "Flexible",
};

export const label = (
  map: Record<string, string>,
  value: string
): string => map[value] ?? value;