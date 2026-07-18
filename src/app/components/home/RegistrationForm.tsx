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
import {
  courseOptions,
  registrationSchema,
  initialState,
  type FormState,
  type FormErrors,
} from "@/lib/validations/registration";

export default function RegistrationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [apiError, setApiError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validateField = async (
    field: keyof FormState,
    updatedForm: FormState,
  ) => {
    try {
      await registrationSchema.validateAt(field, updatedForm);
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
      await registrationSchema.validate(form, { abortEarly: false });
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
    setApiError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          goals: form.goals.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setStatus("success");
      setMessage(data.message ?? "Registration successful!");
      setForm(initialState);
      setErrors({});
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box id="register-form" sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 6 } }}>
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

        {(status === "success" || (status === "error" && apiError)) && (
          <Box
            sx={{
              position: "fixed",
              top: { xs: 16, md: 24 },
              left: { xs: "50%", md: "auto" },
              right: { xs: "auto", md: 24 },
              transform: { xs: "translateX(-50%)", md: "none" },
              width: { xs: "calc(100% - 32px)", sm: 380, md: 400 },
              zIndex: (theme) => theme.zIndex.snackbar,
            }}
          >
            {status === "success" && (
              <Alert
                variant="filled"
                icon={<CheckCircleIcon fontSize="inherit" />}
                severity="success"
                onClose={() => setStatus("idle")}
                sx={{ borderRadius: 2, boxShadow: 3 }}
              >
                <strong>Registration Successful!</strong> {message}
              </Alert>
            )}

            {status === "error" && apiError && (
              <Alert
                variant="filled"
                severity="error"
                onClose={() => setStatus("idle")}
                sx={{ borderRadius: 2, boxShadow: 3 }}
              >
                {apiError}
              </Alert>
            )}
          </Box>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Grid container spacing={2.5}>
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
                onChange={(e) =>
                  handleChange("email", e.target.value.toLowerCase())
                }
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>

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
            style={{ objectFit: "contain", pointerEvents: "none" }}
            sizes="(max-width: 900px) 0px, 360px"
          />
        </Box>
      </Card>
    </Box>
  );
}
