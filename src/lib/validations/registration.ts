import * as yup from "yup";
import sanitizeHtml from "sanitize-html";

export const courseOptions: Record<string, string[]> = {
  "job-exams": [
    "UPSC",
    "SSC",
    "RBI",
    "NDA",
    "AFCAT",
    "CDSE",
    "CAPF",
    "IBPS",
    "PO",
    "RRB",
  ],
  "higher-education": [
    "NEET",
    "NID",
    "NIFT",
    "UCEED",
    "CLAT",
    "IPM",
    "IIT-JEE",
    "CUET",
    "NATA",
  ],
  "abroad-education": [
    "GMAT",
    "LSAT",
    "Mathematics",
    "GRE",
    "SAT",
    "IELTS",
    "TOEFL",
  ],
};

export type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseCategory: string;
  preferredCourses: string[];
  classType: string;
  classMode: string;
  preferredTime: string;
  goals: string;
  website: string; // honeypot field — must stay empty; not shown to real users
};

export const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  courseCategory: "",
  preferredCourses: [],
  classType: "",
  classMode: "",
  preferredTime: "",
  goals: "",
  website: "",
};

// Strips ALL HTML/script content, leaving plain text only. Used on every
// free-text field before it's stored or ever rendered anywhere (DB, admin
// dashboard, email templates). This is what stops XSS — a name like
// "<script>...</script>" becomes empty/plain text, never executable code.
function sanitizeText(value: string): string {
  return sanitizeHtml(value, {
    allowedTags: [], // no HTML tags allowed at all
    allowedAttributes: {}, // no attributes allowed at all
  }).trim();
}

// Used by BOTH the client form (field-by-field + full validate) and the
// /api/register route (full validate on the raw request body). Keeping this
// in one file means the two can never drift out of sync.
//
// NOTE: `website` (the honeypot) is intentionally NOT part of this schema.
// It's checked separately in route.ts BEFORE this schema ever runs.
export const registrationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .transform((value) =>
      typeof value === "string" ? sanitizeText(value) : value,
    )
    .required("First name is required")
    .min(3, "First name must be at least 3 characters")
    .max(50, "First name must be under 50 characters"),
  lastName: yup
    .string()
    .trim()
    .transform((value) =>
      typeof value === "string" ? sanitizeText(value) : value,
    )
    .required("Last name is required")
    .min(1, "Last name must be at least 1 characters")
    .max(50, "Last name must be under 50 characters"),
  email: yup
    .string()
    .trim()
    .transform((value) =>
      typeof value === "string" ? sanitizeText(value) : value,
    )
    .required("Email is required")
    .max(254, "Email is too long")
    .test("email-validation", "Enter a valid email address", (value) => {
      if (!value || value.trim() === "") return true;
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    }),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  courseCategory: yup
    .string()
    .oneOf(Object.keys(courseOptions), "Please select a valid course category")
    .required("Please select a course category"),
  preferredCourses: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one preferred class")
    .test(
      "valid-for-category",
      "Selected classes don't match the chosen category",
      function (value) {
        const category = this.parent.courseCategory as string;
        if (!value || !category || !courseOptions[category]) return true;
        return value.every((c) =>
          courseOptions[category].includes(c as string),
        );
      },
    ),
  classType: yup
    .string()
    .oneOf(["one-to-one", "group-classes"], "Please select a valid class type")
    .required("Please select a class type"),
  classMode: yup
    .string()
    .oneOf(["online", "offline", "hybrid"], "Please select a valid class mode")
    .required("Please select a class mode"),
  preferredTime: yup
    .string()
    .oneOf(
      ["morning", "afternoon", "evening", "night", "weekend", "flexible"],
      "Please select a valid preferred class time",
    )
    .required("Please select a preferred class time"),
  goals: yup
    .string()
    .trim()
    .transform((value) =>
      typeof value === "string" ? sanitizeText(value) : value,
    )
    .max(1000, "Please keep your goals under 1000 characters")
    .optional(),
});

export type FormErrors = Partial<Record<keyof FormState, string>>;
