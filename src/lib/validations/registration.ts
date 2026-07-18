import * as yup from "yup";

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
};

// Used by BOTH the client form (field-by-field + full validate) and the
// /api/register route (full validate on the raw request body). Keeping this
// in one file means the two can never drift out of sync.
export const registrationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters"),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
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
  goals: yup.string().trim().optional(),
});

export type FormErrors = Partial<Record<keyof FormState, string>>;
