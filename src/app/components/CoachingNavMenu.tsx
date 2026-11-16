"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Paper } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

/**
 * "Coaching" nav item with a dropdown.
 * Opens on hover (desktop) and on click/tap (mobile), shows "Class XI".
 * Add more classes to CLASSES later (e.g. Class XII).
 */
const CLASSES = [{ label: "Class XI", href: "/coaching/class-xi" }];

export default function CoachingNavMenu(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = pathname.startsWith("/coaching");

  return (
    <Box
      sx={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Box
        component="button"
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.25,
          background: "none",
          border: "none",
          cursor: "pointer",
          font: "inherit",
          fontWeight: 600,
          fontSize: "inherit",
          p: 0,
          color: active ? "#16a34a" : "inherit",
        }}
      >
        Coaching
        <KeyboardArrowDownRoundedIcon
          sx={{
            fontSize: 18,
            transition: "transform .2s",
            transform: open ? "rotate(180deg)" : "none",
          }}
        />
      </Box>

      {open && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            pt: 0.5,
            minWidth: 150,
            borderRadius: "12px",
            overflow: "hidden",
            zIndex: 1300,
          }}
        >
          {CLASSES.map((c) => (
            <Box
              key={c.href}
              component={Link}
              href={c.href}
              onClick={() => setOpen(false)}
              sx={{
                display: "block",
                px: 2.25,
                py: 1.25,
                fontSize: "0.92rem",
                fontWeight: 600,
                color: "#0f172a",
                textDecoration: "none",
                "&:hover": { background: "#e8f9ef", color: "#15803d" },
              }}
            >
              {c.label}
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
}