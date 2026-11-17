"use client";
import React from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { ALL_CLASSES } from "./coachingData";

/* /coaching: lets the student pick their class */
export default function CoachingIndex(): React.JSX.Element {
  return (
    <Box component="section" sx={{ px: { xs: 2.5, md: 12 }, py: { xs: 8, md: 12 }, textAlign: "center" }}>
      <Typography sx={{ color: "#16a34a", fontWeight: 700, letterSpacing: "2px", fontSize: "0.9rem", mb: 1.5 }}>
        DRILL DAILY COACHING · 2027
      </Typography>
      <Typography component="h1" sx={{ fontWeight: 800, color: "#0f172a", fontSize: { xs: "2rem", md: "2.8rem" }, mb: 4 }}>
        Choose your class
      </Typography>
      <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
        {ALL_CLASSES.map((c) => (
          <Box
            key={c.slug}
            component={Link}
            href={`/coaching/${c.slug}`}
            sx={{
              width: 280,
              p: 3.5,
              borderRadius: "20px",
              border: "1px solid #edf2f7",
              background: "#f4fbf6",
              textDecoration: "none",
              color: "#0f172a",
              textAlign: "left",
              "&:hover": { boxShadow: "0 12px 30px rgba(22,163,74,0.15)", borderColor: "#16a34a" },
            }}
          >
            <Typography sx={{ fontSize: "1.6rem", fontWeight: 800, mb: 1 }}>{c.label}</Typography>
            <Typography sx={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
              {c.admissionSubtitle.replace(/^Class X?I? · /, "")}
            </Typography>
            <Typography sx={{ color: "#16a34a", fontWeight: 700, mt: 2 }}>View details →</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}