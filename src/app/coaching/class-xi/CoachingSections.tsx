"use client";
import React from "react";
import { Box, Typography, SvgIconProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import type { ClassCoachingData, Tone, RowKind } from "../coachingData";

type IconComponent = React.ComponentType<SvgIconProps>;
type Props = { data: ClassCoachingData };

/* ---------- shared styles ---------- */

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
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.75 }}>
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "#e8f9ef",
          color: "#16a34a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: 22 }} />
      </Box>
      <Box>
        <Typography
          sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" }, fontWeight: 800, color: "#0f172a" }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: "#64748b", fontSize: "0.94rem" }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

/* =========================================================
   1. WEEKLY TIMETABLE
   ========================================================= */

const TONES: Record<Tone, { bg: string; color: string }> = {
  orange: { bg: "rgba(217,119,6,0.1)", color: "#b45309" },
  blue: { bg: "rgba(37,99,235,0.08)", color: "#2563eb" },
  purple: { bg: "rgba(147,51,234,0.08)", color: "#7e22ce" },
};

const COL_ICONS = {
  sun: WbSunnyOutlinedIcon,
  moon: DarkModeOutlinedIcon,
  vacation: BeachAccessOutlinedIcon,
};

const KIND_STYLE: Record<RowKind, object> = {
  class: {},
  test: { background: "rgba(30,184,90,0.08)", color: "#15803d" },
  off: { background: "#f1f5f9", color: "#64748b" },
};

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

export function CoachingTimetable({ data }: Props): React.JSX.Element {
  const n = data.columns.length;
  return (
    <Box component="section" sx={sectionSx}>
      <Box sx={{ textAlign: "center", maxWidth: 760, mx: "auto", mb: 4, pt: 1 }}>
        <Typography
          sx={{ color: "#16a34a", fontWeight: 700, letterSpacing: "2px", fontSize: "0.85rem" }}
        >
          COACHING FOR {data.label.toUpperCase()} · 2027
        </Typography>
        <Typography
          component="h2"
          sx={{ mt: 1.25, fontSize: { xs: "1.7rem", sm: "2.35rem" }, fontWeight: 800, color: "#0f172a" }}
        >
          Drill Daily Coaching · {data.label}
        </Typography>
        <Box sx={{ width: 70, height: 4, mx: "auto", mt: 2.25, background: "#16a34a", borderRadius: "50px" }} />
      </Box>

      <Box sx={outerCardSx}>
        <SectionHeader
          icon={ScheduleOutlinedIcon}
          title="Weekly Timetable"
          subtitle={data.timetableSubtitle}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: `repeat(${n}, 1fr)`, md: `230px repeat(${n}, 1fr)` },
            gap: { xs: 1, sm: 1.5 },
          }}
        >
          <Box
            sx={{
              ...(ttCellSx as object),
              display: { xs: "none", md: "flex" },
              minHeight: 0,
              background: "#0f172a",
              color: "#ffffff",
              border: "none",
              fontWeight: 800,
            }}
          >
            Days
          </Box>
          {data.columns.map((c) => {
            const Icon = COL_ICONS[c.icon];
            return (
              <Box
                key={c.title}
                sx={{
                  ...(ttCellSx as object),
                  minHeight: 0,
                  gap: 1.25,
                  border: "none",
                  fontWeight: 800,
                  fontSize: { xs: "0.8rem", sm: "0.95rem" },
                  background: TONES[c.tone].bg,
                  color: TONES[c.tone].color,
                }}
              >
                <Icon sx={{ fontSize: 20 }} />
                <span>
                  {c.title} · {c.time}
                </span>
              </Box>
            );
          })}

          {data.rows.map((row) => {
            const slotSx = {
              ...(ttCellSx as object),
              ...KIND_STYLE[row.kind ?? "class"],
            };
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

                {row.span ? (
                  <Box sx={{ ...slotSx, gridColumn: `span ${n}`, justifyContent: "center", textAlign: "center" }}>
                    {row.span}
                  </Box>
                ) : (
                  row.cells?.map((cell, i) => (
                    <Box key={i} sx={slotSx}>
                      {cell}
                    </Box>
                  ))
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
   2. OUR COACHES
   ========================================================= */

const COACH_TAGS = ["Premier Institutions", "Doctorates", "Teaching Excellence Awardees"];

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
   3. CLASS RULES
   ========================================================= */

function RuleList({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  icon: IconComponent;
}) {
  return (
    <Box sx={{ background: "#ffffff", border: "1px solid #edf2f7", borderRadius: "16px", p: "20px 22px" }}>
      <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", mb: 1.75 }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {items.map((text) => (
          <Box key={text} sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
            <Icon sx={{ fontSize: 20, color: "#16a34a", flexShrink: 0, mt: "1px" }} />
            <Typography sx={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.5 }}>
              {text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function ClassRules({ data }: Props): React.JSX.Element {
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

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2.5 }}>
          <RuleList title="Schedule" items={data.scheduleRules} icon={EventAvailableOutlinedIcon} />
          <RuleList title="Policies" items={data.policyRules} icon={BlockOutlinedIcon} />
        </Box>
      </Box>
    </Box>
  );
}

/* =========================================================
   4. ADMISSION
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
  { icon: PaymentsOutlinedIcon, title: "Pay the Fees", text: "Single payment, before 31 March 2027." },
  { icon: RocketLaunchOutlinedIcon, title: "Classes Begin", text: "Classes start on 1 April 2027." },
];

const SIDE_POINTS = [
  "Only 20 students",
  "First come, first served",
  "Admission closes 31 March 2027",
  "Affordable, scholarship-inclusive fees for all three subjects",
];

export function AdmissionSection({ data }: Props): React.JSX.Element {
  return (
    <Box component="section" id="admission" sx={sectionSx}>
      <Box sx={outerCardSx}>
        <SectionHeader
          icon={GroupsOutlinedIcon}
          title="Admission to Drill Daily Coaching Classes"
          subtitle={data.admissionSubtitle}
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
                        href="https://www.2212.co.in/#banner-worksheet-paid"
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
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1, fontSize: "0.9rem", fontWeight: 500, color: "#334155" }}
                >
                  <CheckCircleRoundedIcon sx={{ fontSize: 18, color: "#2563eb", flexShrink: 0, mt: "2px" }} />
                  <span>{t}</span>
                </Box>
              ))}
            </Box>
            {data.examChips.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.examChips.map((e) => (
                  <Box
                    key={e}
                    component="span"
                    sx={{ ...(chipSx as object), borderColor: "rgba(37,99,235,0.2)", color: "#2563eb" }}
                  >
                    {e}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}