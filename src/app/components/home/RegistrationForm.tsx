"use client";

import { useState } from "react";
import * as yup from "yup";
import {
  Box,
  Typography,
  Card,
  TextField,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Alert,
  Grid,
  FormHelperText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";

const courseOptions: Record<string, string[]> = {
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

type FormState = {
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

const initialState: FormState = {
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

// ---- Yup schema ----
const schema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .test(
      "min-name",
      "First name must be at least 3 characters",
      (value) => !value || value.length >= 3,
    ),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .test(
      "min-name",
      "Last name must be at least 3 characters",
      (value) => !value || value.length >= 3,
    ),
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
  courseCategory: yup.string().required("Please select a course category"),
  preferredCourses: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one preferred class"),
  classType: yup.string().required("Please select a class type"),
  classMode: yup.string().required("Please select a class mode"),
  preferredTime: yup.string().required("Please select a preferred class time"),
  goals: yup.string().optional(),
});

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function RegistrationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  // Validate a single field against the schema, using the latest form values
  const validateField = async (
    field: keyof FormState,
    updatedForm: FormState,
  ) => {
    try {
      await schema.validateAt(field, updatedForm);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [field]: err.message }));
      }
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);
    validateField(field, updatedForm);
  };

  const handleCategoryChange = (value: string) => {
    const updatedForm = {
      ...form,
      courseCategory: value,
      preferredCourses: [],
    };
    setForm(updatedForm);
    validateField("courseCategory", updatedForm);
    validateField("preferredCourses", updatedForm);
  };

  const toggleCourse = (course: string) => {
    setForm((prev) => {
      const exists = prev.preferredCourses.includes(course);
      const updatedCourses = exists
        ? prev.preferredCourses.filter((c) => c !== course)
        : [...prev.preferredCourses, course];
      const updatedForm = { ...prev, preferredCourses: updatedCourses };

      validateField("preferredCourses", updatedForm);

      return updatedForm;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate(form, { abortEarly: false });
      setErrors({});
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: FormErrors = {};
        err.inner.forEach((validationError) => {
          if (validationError.path) {
            fieldErrors[validationError.path as keyof FormState] =
              validationError.message;
          }
        });
        setErrors(fieldErrors);
        setStatus("error");
      }
      return; // stop here, don't submit
    }

    setSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm(initialState);
      setErrors({});
    } catch (err) {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box id="register-form"  sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 6 } }}>
      <Card
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          mt: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header with accent bar, matches other cards */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box
            sx={{
              width: 4,
              height: 24,
              bgcolor: "var(--primary)",
              borderRadius: 1,
              mr: 1.5,
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Student Registration Form
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Complete the form below to register for your desired course. Our team
          will contact you within 24 hours to confirm your enrollment.
        </Typography>

        {status === "success" && (
          <Alert
            icon={<CheckCircleIcon fontSize="inherit" />}
            severity="success"
            sx={{ mb: 3, borderRadius: 2 }}
          >
            <strong>Registration Successful!</strong> Thank you for registering
            with Drill Daily. We will contact you within 24 hours.
          </Alert>
        )}

        {status === "error" && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            <strong>Registration Failed!</strong> Please check all required
            fields and try again.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2.5}>
            {/* Row 1: First Name, Last Name, Email */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                fullWidth
                required
                label="First Name"
                placeholder="Enter your first name"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                fullWidth
                required
                label="Last Name"
                placeholder="Enter your last name"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                fullWidth
                required
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>

            {/* Row 2: Phone, Course Category, Class Type */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                fullWidth
                required
                type="tel"
                label="Phone Number"
                placeholder="10-digit number"
                value={form.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value.replace(/\D/g, ""))
                }
                slotProps={{ htmlInput: { maxLength: 10 } }}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                select
                fullWidth
                required
                label="Course Category"
                value={form.courseCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                error={Boolean(errors.courseCategory)}
                helperText={errors.courseCategory}
              >
                <MenuItem value="">Select a category</MenuItem>
                <MenuItem value="job-exams">Job Exams</MenuItem>
                <MenuItem value="higher-education">
                  Higher Education Entrance Exams
                </MenuItem>
                <MenuItem value="abroad-education">
                  Abroad Education Exams
                </MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                select
                fullWidth
                required
                label="Class Type"
                value={form.classType}
                onChange={(e) => handleChange("classType", e.target.value)}
                error={Boolean(errors.classType)}
                helperText={errors.classType}
              >
                <MenuItem value="">Select class type</MenuItem>
                <MenuItem value="one-to-one">One-to-One Classes</MenuItem>
                <MenuItem value="group-classes">
                  Group Classes (Up to 12 students)
                </MenuItem>
              </TextField>
            </Grid>

            {/* Preferred Classes checkboxes (conditional, full width) */}
            {form.courseCategory && (
              <Grid size={12}>
                <FormLabel
                  required
                  error={Boolean(errors.preferredCourses)}
                  sx={{
                    fontWeight: 600,
                    fontSize: 13,
                    mb: 1,
                    display: "block",
                  }}
                >
                  Preferred Classes (Select all that apply)
                </FormLabel>
                <FormGroup
                  row
                  sx={{
                    bgcolor: "#f8f9fb",
                    borderRadius: 2,
                    p: 1.5,
                    border: errors.preferredCourses
                      ? "1px solid #d32f2f"
                      : "1px solid #eef0f2",
                  }}
                >
                  {courseOptions[form.courseCategory].map((course) => (
                    <FormControlLabel
                      key={course}
                      control={
                        <Checkbox
                          size="small"
                          checked={form.preferredCourses.includes(course)}
                          onChange={() => toggleCourse(course)}
                          sx={{
                            color: "var(--primary)",
                            "&.Mui-checked": { color: "var(--primary)" },
                          }}
                        />
                      }
                      label={<Typography variant="body2">{course}</Typography>}
                      sx={{ minWidth: 130 }}
                    />
                  ))}
                </FormGroup>
                {errors.preferredCourses && (
                  <FormHelperText error sx={{ ml: 1.5 }}>
                    {errors.preferredCourses}
                  </FormHelperText>
                )}
              </Grid>
            )}

            {/* Row 3: Class Mode, Preferred Class Time */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                select
                fullWidth
                required
                label="Class Mode"
                value={form.classMode}
                onChange={(e) => handleChange("classMode", e.target.value)}
                error={Boolean(errors.classMode)}
                helperText={errors.classMode}
              >
                <MenuItem value="">Select mode</MenuItem>
                <MenuItem value="online">Online Classes</MenuItem>
                <MenuItem value="offline">Offline Classes</MenuItem>
                <MenuItem value="hybrid">
                  Hybrid (Both Online & Offline)
                </MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                select
                fullWidth
                required
                label="Preferred Class Time"
                value={form.preferredTime}
                onChange={(e) => handleChange("preferredTime", e.target.value)}
                error={Boolean(errors.preferredTime)}
                helperText={errors.preferredTime}
              >
                <MenuItem value="">Select preferred time</MenuItem>
                <MenuItem value="morning">Morning (9 AM - 12 PM)</MenuItem>
                <MenuItem value="afternoon">Afternoon (12 PM - 4 PM)</MenuItem>
                <MenuItem value="evening">Evening (4 PM - 8 PM)</MenuItem>
                <MenuItem value="night">Night (8 PM - 10 PM)</MenuItem>
                <MenuItem value="weekend">Weekends Only</MenuItem>
                <MenuItem value="flexible">Flexible</MenuItem>
              </TextField>
            </Grid>

            {/* Row 4: Goal & Timeline */}
            <Grid size={{ xs: 12, sm: 12, md: 8 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Your Goal & Timeline"
                placeholder="Tell us about your exam goals and timeline..."
                value={form.goals}
                onChange={(e) => handleChange("goals", e.target.value)}
              />
            </Grid>

            {/* Row 5: Submit */}
            <Grid size={{ xs: 12, sm: 12, md: 8 }}>
              <Button
                type="submit"
                fullWidth
                disabled={submitting}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "var(--primary)",
                  color: "#fff",
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: 15,
                  "&:hover": { bgcolor: "var(--primary)" },
                  "&.Mui-disabled": { bgcolor: "#a7d6b8", color: "#fff" },
                }}
              >
                {submitting ? "Submitting..." : "Submit Registration"}
              </Button>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", textAlign: "center", mt: 2 }}
              >
                By submitting this form, you agree to our Terms & Conditions and
                Privacy Policy.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Decorative image, bottom-right corner */}
        <Box
          sx={{
            position: "absolute",
            bottom: 30,
            right: 30,
            width: 360,
            height: 320,
            display: { xs: "none", md: "block" },
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <Image
            src="/img/home/register.webp"
            alt="Student registration illustration"
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 900px) 0px, 360px"
          />
        </Box>
      </Card>
    </Box>
  );
}
