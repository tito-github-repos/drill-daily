"use client";
import React from "react";
import { Box, Typography, SvgIconProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

type IconComponent = React.ComponentType<SvgIconProps>;

/* =========================================================
   Shared styles (MUI sx)
   ========================================================= */

const sectionSx: SxProps<Theme> = {
  width: "100%",
  px: { xs: 2.5, md: 4 },
  pb: { xs: 4, md: 5 },
};

const outerCardSx: SxProps<Theme> = {
  maxWidth: 1280,
  mx: "auto",
  p: { xs: 2.5, md: 3.5 },
  borderRadius: "20px",
  background: "linear-gradient(180deg, #fafcfb 0%, #f5f8fb 100%)",
  border: "1px solid #edf2f7",
};

const headerSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  mb: 2.75,
};

const headerIconSx: SxProps<Theme> = {
  width: 34,
  height: 34,
  borderRadius: "50%",
  background: "#e8f9ef",
  color: "#16a34a",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const headingSx: SxProps<Theme> = {
  fontSize: { xs: "1.25rem", sm: "1.5rem" },
  fontWeight: 800,
  color: "#0f172a",
};

const subheadingSx: SxProps<Theme> = { color: "#64748b", fontSize: "0.94rem" };

const chipSx: SxProps<Theme> = {
  background: "#ffffff",
  border: "1px solid rgba(22,163,74,0.2)",
  color: "#15803d",
  fontSize: "0.82rem",
  fontWeight: 600,
  px: 1.5,
  py: 0.6,
  borderRadius: "999px",
};

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: IconComponent;
  title: string;
  subtitle: string;
}) {
  return (
    <Box sx={headerSx}>
      <Box sx={headerIconSx}>
        <Icon sx={{ fontSize: 22 }} />
      </Box>
      <Box>
        <Typography sx={headingSx}>{title}</Typography>
        <Typography sx={subheadingSx}>{subtitle}</Typography>
      </Box>
    </Box>
  );
}

/* =========================================================
   1. WEEKLY TIMETABLE  (place after Class Structure)
   ========================================================= */

const TIMETABLE: {
  day: string;
  morning: string;
  evening?: string; // omit when morning and evening are the same (spans both)
  test?: boolean;
}[] = [
  { day: "Mon – Wed", morning: "Maths", evening: "Biology" },
  { day: "Thu – Sat", morning: "Physics", evening: "Chemistry" },
  {
    day: "Three Sundays a month",
    morning: "Weekly Tests · MCQs · Competitive Exams",
    test: true,
  },
  {
    day: "Last Sunday of the month",
    morning: "Monthly Tests · Descriptive · Board Exams",
    test: true,
  },
];

const ttCellSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  minHeight: 64,
  p: { xs: "12px 14px", sm: "14px 20px" },
  borderRadius: "14px",
  background: "#ffffff",
  border: "1px solid #edf2f7",
  fontSize: { xs: "0.88rem", sm: "1rem" },
  fontWeight: 600,
  color: "#0f172a",
};

const ttHeadSx: SxProps<Theme> = {
  ...(ttCellSx as object),
  minHeight: 0,
  gap: 1.25,
  fontWeight: 800,
  fontSize: { xs: "0.8rem", sm: "0.95rem" },
  border: "none",
};

export function CoachingTimetable(): React.JSX.Element {
  return (
    <Box component="section" sx={{ ...(sectionSx as object), pt: { xs: 3, md: 5 } }}>
      <Box sx={outerCardSx}>
        <SectionHeader
          icon={ScheduleOutlinedIcon}
          title="Weekly Timetable"
          subtitle="Two focused sessions every day, Monday to Saturday. Tests on Sundays."
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", md: "230px 1fr 1fr" },
            gap: { xs: 1, sm: 1.5 },
          }}
        >
          <Box
            sx={{
              ...(ttHeadSx as object),
              display: { xs: "none", md: "flex" },
              background: "#0f172a",
              color: "#ffffff",
            }}
          >
            Days
          </Box>
          <Box sx={{ ...(ttHeadSx as object), background: "rgba(217,119,6,0.1)", color: "#d97706" }}>
            <WbSunnyOutlinedIcon sx={{ fontSize: 20 }} />
            <span>Morning · 5:00 AM – 6:30 AM</span>
          </Box>
          <Box sx={{ ...(ttHeadSx as object), background: "rgba(37,99,235,0.08)", color: "#2563eb" }}>
            <DarkModeOutlinedIcon sx={{ fontSize: 20 }} />
            <span>Evening · 6:30 PM – 8:00 PM</span>
          </Box>

          {TIMETABLE.map((row) => {
            const slotSx = row.test
              ? {
                  ...(ttCellSx as object),
                  background: "rgba(30,184,90,0.08)",
                  color: "#15803d",
                  fontSize: { xs: "0.85rem", sm: "0.95rem" },
                }
              : ttCellSx;
            return (
              <React.Fragment key={row.day}>
                <Box
                  sx={{
                    ...(ttCellSx as object),
                    gridColumn: { xs: "1 / -1", md: "auto" },
                    minHeight: { xs: 0, md: 64 },
                    background: "#f8fafc",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      background: "#e8f9ef",
                      color: "#15803d",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      px: 1.5,
                      py: 0.6,
                      borderRadius: "999px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.day}
                  </Box>
                </Box>

                {row.evening ? (
                  <>
                    <Box sx={slotSx}>{row.morning}</Box>
                    <Box sx={slotSx}>{row.evening}</Box>
                  </>
                ) : (
                  <Box
                    sx={{
                      ...(slotSx as object),
                      gridColumn: "span 2",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    {row.morning}
                    <Box
                      component="span"
                      sx={{
                        ml: 1.25,
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        opacity: 0.8,
                        display: { xs: "none", sm: "inline" },
                      }}
                    >
                      (both sessions)
                    </Box>
                  </Box>
                )}
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

/* =========================================================
   2. OUR COACHES  (place after Our Class Experience)
   ========================================================= */

const COACH_TAGS = [
  "Premier Institutions",
  "Doctorates",
  "Teaching Excellence Awardees",
];

export function OurCoaches(): React.JSX.Element {
  return (
    <Box component="section" sx={sectionSx}>
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          p: { xs: 2.5, md: "26px 28px" },
          borderRadius: "20px",
          background: "#e8f9ef",
          border: "1px solid rgba(22,163,74,0.1)",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2.5,
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#ffffff",
            color: "#16a34a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <WorkspacePremiumOutlinedIcon sx={{ fontSize: 30 }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", mb: 1 }}>
            Our Coaches
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {COACH_TAGS.map((t) => (
              <Box key={t} component="span" sx={chipSx}>
                {t}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* =========================================================
   CLASS INSTRUCTIONS  (place after Our Coaches)
   ========================================================= */

interface RuleItem {
  icon: IconComponent;
  text: string;
}

const SCHEDULE_RULES: RuleItem[] = [
  { icon: EventAvailableOutlinedIcon, text: "Portions will be completed by October." },
  { icon: QuizOutlinedIcon, text: "Only tests and discussion from November to January." },
  { icon: EventBusyOutlinedIcon, text: "No sessions in February and March." },
];

const POLICY_RULES: RuleItem[] = [
  { icon: BlockOutlinedIcon, text: "No repetition of classes." },
  { icon: BlockOutlinedIcon, text: "If a teacher cannot take a class, there is no compensation class." },
  { icon: BlockOutlinedIcon, text: "No vacations and no holidays." },
];

function RuleList({ title, items }: { title: string; items: RuleItem[] }) {
  return (
    <Box
      sx={{
        background: "#ffffff",
        border: "1px solid #edf2f7",
        borderRadius: "16px",
        p: "20px 22px",
      }}
    >
      <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", mb: 1.75 }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {items.map((r) => {
          const Icon = r.icon;
          return (
            <Box key={r.text} sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
              <Icon sx={{ fontSize: 20, color: "#16a34a", flexShrink: 0, mt: "1px" }} />
              <Typography sx={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.5 }}>
                {r.text}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export function ClassRules(): React.JSX.Element {
  return (
    <Box component="section" sx={sectionSx}>
      <Box sx={outerCardSx}>
        <SectionHeader
          icon={ScheduleOutlinedIcon}
          title="Class Rules"
          subtitle="Please read these before you join."
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: "18px 22px",
            borderRadius: "16px",
            background: "rgba(30,184,90,0.1)",
            color: "#16a34a",
            mb: 2.5,
          }}
        >
          <VideocamOutlinedIcon sx={{ fontSize: 28 }} />
          <Box>
            <Typography sx={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>
              All classes are recorded
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "#475569" }}>
              Missed a session? Watch the recorded video anytime.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2.5,
          }}
        >
          <RuleList title="Schedule" items={SCHEDULE_RULES} />
          <RuleList title="Policies" items={POLICY_RULES} />
        </Box>
      </Box>
    </Box>
  );
}

/* =========================================================
   4. ADMISSION  (place just above Who Can Join / How to Join)
   ========================================================= */

const ADMISSION_STEPS: {
  icon: IconComponent;
  title: string;
  text: string;
  link?: boolean;
}[] = [
  {
    icon: QuizOutlinedIcon,
    title: "Qualify the DD Test",
    text: "Only qualifiers are eligible to pay the fees and join the classes.",
    link: true,
  },
  {
    icon: PaymentsOutlinedIcon,
    title: "Pay the Fees",
    text: "Single payment, before 31 March 2027.",
  },
  {
    icon: RocketLaunchOutlinedIcon,
    title: "Classes Begin",
    text: "Classes start on 1 April 2027.",
  },
];

const EXAMS = ["NEET", "IIT JEE", "IAT", "NEST", "CBSE Board Exams"];

const SIDE_POINTS = [
  "Only 20 students",
  "First come, first served",
  "Admission closes 31 March 2027",
  "Affordable, scholarship-inclusive fees for all three subjects",
];

export function AdmissionSection(): React.JSX.Element {
  return (
    <Box component="section" id="admission" sx={sectionSx}>
      <Box sx={outerCardSx}>
        <SectionHeader
          icon={GroupsOutlinedIcon}
          title="Admission to Drill Daily Coaching Classes"
          subtitle="Class XI · Covers NEET, IIT JEE, IAT, NEST and CBSE Board Exams."
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.6fr 1fr" },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
            {ADMISSION_STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Box
                  key={s.title}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.75,
                    background: "#ffffff",
                    border: "1px solid #edf2f7",
                    borderRadius: "16px",
                    p: "18px 20px",
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "#16a34a",
                      color: "#ffffff",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </Box>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      background: "#e8f9ef",
                      color: "#16a34a",
                      display: { xs: "none", sm: "flex" },
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: 22 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
                      {s.title}
                    </Typography>
                    <Typography sx={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.5 }}>
                      {s.text}
                    </Typography>
                    {s.link && (
                      <Box
                        component="a"
                        href="https://www.2212.co.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: "inline-block",
                          mt: 0.75,
                          fontSize: "0.88rem",
                          fontWeight: 700,
                          color: "#16a34a",
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        Take the DD Test → www.2212.co.in
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{
              background: "rgba(37,99,235,0.07)",
              border: "1px solid rgba(37,99,235,0.12)",
              borderRadius: "16px",
              p: 2.75,
              display: "flex",
              flexDirection: "column",
              gap: 1.75,
            }}
          >
            <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: "#2563eb" }}>
              Limited Seats
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              {SIDE_POINTS.map((t) => (
                <Box
                  key={t}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "#334155",
                  }}
                >
                  <CheckCircleRoundedIcon
                    sx={{ fontSize: 18, color: "#2563eb", flexShrink: 0, mt: "2px" }}
                  />
                  <span>{t}</span>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {EXAMS.map((e) => (
                <Box
                  key={e}
                  component="span"
                  sx={{ ...(chipSx as object), borderColor: "rgba(37,99,235,0.2)", color: "#2563eb" }}
                >
                  {e}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}