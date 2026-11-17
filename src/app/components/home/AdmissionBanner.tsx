"use client";
import React from "react";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";

const FACTS = [
  "Class X · Maths & Science",
  "Class XI · NEET · IIT JEE · IAT · NEST · CBSE Board",
  "Only 20 seats · First come, first served",
  "Admission closes 31 March 2027",
  "Classes start 1 April 2027",
];

export default function AdmissionBanner(): React.JSX.Element {
  return (
    <Box
      component="section"
      sx={{ width: "100%", px: { xs: 2.5, md: 4 }, pb: { xs: 4, md: 5 } }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          p: { xs: 2.75, md: "28px 32px" },
          borderRadius: "20px",
          background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
          color: "#ffffff",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "2px",
              opacity: 0.85,
              mb: 0.75,
            }}
          >
            ADMISSIONS OPEN · CLASS XI
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1.3rem", md: "1.6rem" },
              fontWeight: 800,
              mb: 1.75,
            }}
          >
            Coaching for Class X &amp; XI · 2027
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {FACTS.map((f) => (
              <Box
                key={f}
                component="span"
                sx={{
                  background: "rgba(255,255,255,0.16)",
                  px: 1.5,
                  py: 0.6,
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {f}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.25,
            flexShrink: 0,
            width: { xs: "100%", md: "auto" },
          }}
        >
          <Button
            href="https://www.2212.co.in"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              background: "#ffffff",
              color: "#15803d",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "10px",
              px: 2.75,
              py: 1.3,
              "&:hover": { background: "#f0fdf4" },
            }}
          >
            Take the DD Test
          </Button>
          <Button
            component={Link}
            href="/coaching"
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "10px",
              px: 2.75,
              py: 1.3,
              border: "1.5px solid rgba(255,255,255,0.7)",
              "&:hover": { background: "rgba(255,255,255,0.12)" },
            }}
          >
            View class details
          </Button>
        </Box>
      </Box>
    </Box>
  );
}