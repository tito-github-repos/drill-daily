"use client";

import { Box, Typography, Grid, Stack, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ScheduleIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <SchoolIcon sx={{ fontSize: 20 }} />,
    line1: "Expert",
    line2: "Trainers",
  },
  {
    icon: <PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} />,
    line1: "Personalised",
    line2: "Guidance",
  },
  {
    icon: <ScheduleIcon sx={{ fontSize: 20 }} />,
    line1: "Flexible",
    line2: "Learning",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 20 }} />,
    line1: "Proven",
    line2: "Results",
  },
];

export default function Hero() {
  return (
    <div>
      <Box
        sx={{
          py: { xs: 3, md: 3 },
          px: { xs: 2, md: 6 },
          background: "#f7f6fb",
        }}
      >
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          {/* Left: content */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  bgcolor: "var(--primary-light)",
                  color: "var(--primary)",
                  fontWeight: 700,
                  fontSize: 13,
                  borderRadius: 5,
                  px: 1.5,
                  py: 0.5,
                  width: "fit-content",
                }}
              >
                #1 Exam Prep Platform
              </Box>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.2,
                  fontSize: { xs: 32, md: 44 },
                }}
              >
                Where The Focus Goes,{" "}
                <Box component="span" sx={{ color: "var(--primary)" }}>
                  Energy{" "}
                </Box>
                Flows.
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 480 }}
              >
                Structured guidance, expert support, and consistent practice for
                academic excellence.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  component={Link}
                  href="/my-classes"
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: "var(--primary)",
                    borderRadius: 2,
                    px: 3,
                    py: 1.3,
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": { bgcolor: "var(--primary)" },
                  }}
                >
                  Explore Now
                </Button>
              </Stack>

              <Grid
                container
                spacing={2}
                sx={{ p: 2, border: "1px solid #e5e7eb", borderRadius: 4 }}
              >
                {features.map((f) => (
                  <Grid size={{ xs: 6, md: 3 }} key={f.line1}>
                    <Stack
                      direction="row"
                      spacing={1.2}
                      sx={{ alignItems: "center" }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          minWidth: 40,
                          borderRadius: "30%",
                          bgcolor: "var(--primary-light)",
                          color: "var(--primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {f.icon}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, fontSize: 13, lineHeight: 1.3 }}
                      >
                        {f.line1}
                        <br />
                        {f.line2}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Grid>

          {/* Right: image */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  aspectRatio: "4/4",
                  width: "100%",
                }}
              >
                <Image
                  src="/img/home/hero.webp"
                  alt="Student studying"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
