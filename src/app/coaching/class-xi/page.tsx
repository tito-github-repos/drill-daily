"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import {
  CoachingTimetable,
  OurCoaches,
  ClassRules,
  AdmissionSection,
} from "./CoachingSections";

export default function CoachingPage(): React.JSX.Element {
  return (
    <>
      {/* ================= HERO ================= */}
      <Box
        component="section"
        sx={{
          px: { xs: 2.5, md: 12 },
          py: { xs: 6, md: 8 },
          background: "linear-gradient(135deg, #f4fbf6 0%, #eef6ff 100%)",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Box sx={{ maxWidth: 1280, mx: "auto" }}>
          <Typography
            sx={{
              color: "#16a34a",
              fontWeight: 700,
              letterSpacing: "2px",
              fontSize: "0.9rem",
              mb: 2,
            }}
          >
            COACHING · CLASS XI · 2027
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.15,
              letterSpacing: "-1px",
              fontSize: { xs: "2.2rem", md: "3.4rem" },
              mb: 2.5,
            }}
          >
            Drill Daily Coaching Classes
            <Box component="span" sx={{ display: "block", color: "#16a34a" }}>
              for Class XI
            </Box>
          </Typography>
          <Typography
            sx={{
              color: "#475569",
              fontSize: { xs: "1rem", md: "1.15rem" },
              lineHeight: 1.8,
              maxWidth: 640,
              mx: { xs: "auto", md: 0 },
            }}
          >
            Focused coaching for NEET, IIT JEE, IAT, NEST and CBSE Board Exams,
            taught by premier-institution coaches. Only 20 students per batch.
          </Typography>
        </Box>
      </Box>

      {/* ================= CONTENT ================= */}
      <CoachingTimetable />
      <OurCoaches />
      <ClassRules />
      <AdmissionSection />
    </>
  );
}