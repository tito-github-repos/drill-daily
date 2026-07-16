"use client";

import { Box, Typography, Grid, Card, Stack } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GroupIcon from "@mui/icons-material/GroupsOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUserOutlined";
import AssignmentIcon from "@mui/icons-material/AssignmentOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUpOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgentOutlined";
import EmojiEventsIcon from "@mui/icons-material/EmojiEventsOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const classTypes = [
  {
    icon: <PersonOutlineOutlinedIcon sx={{ color: "var(--primary)" }} />,
    bg: "var(--primary-light)",
    title: "One-to-One Classes",
    desc: "Personalised attention for faster improvement",
  },
  {
    icon: <GroupIcon sx={{ color: "var(--secondary)" }} />,
    bg: "var(--secondary-light)",
    title: "Group Classes",
    desc: "Up to 12 students for collaborative learning",
  },
];

const whyLove = [
  {
    icon: <VerifiedUserIcon sx={{ color: "var(--primary)", fontSize: 20 }} />,
    text: "Experienced & verified mentors",
  },
  {
    icon: <AssignmentIcon sx={{ color: "var(--primary)", fontSize: 20 }} />,
    text: "Structured study plans",
  },
  {
    icon: <TrendingUpIcon sx={{ color: "var(--primary)", fontSize: 20 }} />,
    text: "Regular performance tracking",
  },
  {
    icon: <SupportAgentIcon sx={{ color: "var(--primary)", fontSize: 20 }} />,
    text: "Doubt solving & follow-ups",
  },
  {
    icon: <EmojiEventsIcon sx={{ color: "var(--primary)", fontSize: 20 }} />,
    text: "Result driven approach",
  },
];

export default function ClassTypesSection() {
  return (
    <Box sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 6 } }}>
      <Grid container spacing={3}>
        {/* Class Types */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, var(--secondary-light) 0%, #fff 100%)",
              border: "1px solid #e5e7eb",
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
              Class Types
            </Typography>

            {/* Horizontal line below the heading */}
            <Box
              sx={{
                width: "15%",
                height: 3,
                bgcolor: "#1a8f4c",
                borderRadius: 1,
                mb: 2.5,
              }}
            />

            <Stack spacing={2}>
              {classTypes.map((c) => (
                <Card
                  key={c.title}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    border: "1px solid #eef0f2",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 45,
                      height: 45,
                      minWidth: 45,
                      borderRadius: "30%",
                      bgcolor: c.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {c.icon}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: {
                          xs: "0.875rem", // body2
                          md: "1rem", // body1
                        },
                        lineHeight: {
                          xs: 1.43,
                          md: 1.5,
                        },
                      }}
                    >
                      {c.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {c.desc}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Card>
        </Grid>

        {/* Why Students Love Drill Daily */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, var(--primary-light) 0%, #fff 100%)",
              border: "1px solid #e5e7eb",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
              Why Students Love Drill Daily
            </Typography>

            {/* Horizontal line below the heading */}
            <Box
              sx={{
                width: "15%",
                height: 3,
                bgcolor: "var(--primary)",
                borderRadius: 1,
                mb: 2.5,
              }}
            />

            <Stack spacing={2}>
              {whyLove.map((item) => (
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "center", zIndex: 1, position: "relative" }}
                  key={item.text}
                >
                  {item.icon}
                  <Typography variant="body2">{item.text}</Typography>
                </Stack>
              ))}
            </Stack>

            {/* Trophy image pinned to bottom right */}
            <Box
              component="img"
              src="/img/home/cup.webp"
              alt="Trophy on books"
              sx={{
                position: "absolute",
                bottom: 10,
                right: -30,
                width: { xs: 130, md: 210 },
                height: { xs: 105, md: 170 },
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
          </Card>
        </Grid>

        {/* Mental Calisthenics Exercises */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              height: "100%",
              background: "#f1f5f9",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Icon only next to the heading */}
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                mb: 1,
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box
                component="img"
                src="/Icons/innovative-brain-icon.svg"
                alt="Brain Icon"
                sx={{
                  width: { xs: 28, md: 20 },
                  height: { xs: 28, md: 20 },
                  flexShrink: 0,
                  filter:
                    "invert(35%) sepia(12%) saturate(778%) hue-rotate(176deg) brightness(92%) contrast(86%)",
                }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "var(--black)" }}
              >
                Mental Calisthenics Exercises
              </Typography>
            </Stack>

            {/* Description now on its own full-width line */}
            <Typography variant="body2" sx={{ color: "#6b7280", mb: 2 }}>
              These exercises enhance the brain&apos;s ability to focus, think
              quickly, and become an efficient problem solver.
            </Typography>

            {/* Tick-list: icon left, text next to it, single line, left aligned */}
            <Stack
              spacing={1.25}
              sx={{ mb: 2, flexGrow: 1, postion: "relative", zIndex: 1 }}
            >
              {[
                "Improve Mental Agility",
                "Sharpen Focus",
                "Practice Smart",
              ].map((item) => (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                  key={item}
                >
                  <CheckCircleIcon sx={{ color: "#475569", fontSize: 16 }} />
                  <Typography variant="body2" sx={{ fontSize: 13 }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            {/* Explore button linking out, with arrow icon */}
            <Box
              component="a"
              href="https://example.com/mental-calisthenics"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                background: "#475569",
                color: "#fff",
                border: "none",
                borderRadius: 2,
                py: 1.3,
                px: 2,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": { background: "#334155" },
              }}
            >
              Explore Mental Calisthenics
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Box>

            {/* Decorative Image */}
            <Box
              component="img"
              src="/img/home/mental.webp" 
              alt="Mental Calisthenics"
              sx={{
                position: "absolute",
                bottom: 55,
                right: -1,
                width: { xs: 130, md: 190 },
                height: { xs: 105, md: 150 },
                opacity: 0.95,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
