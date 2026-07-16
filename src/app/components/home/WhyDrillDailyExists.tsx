"use client";

import { Box, Typography, Stack, Grid, Card, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";

const points = [
  "One-to-one personalised tutoring",
  "Group classes (up to 12 students)",
  "Exam-specific structured learning",
  "Expert teacher allocation based on subject needs",
  "Flexible mode options (Online / Offline)",
];

const structure = [
  {
    step: "01",
    title: "Consulting Session (1 Hour)",
    desc: (
      <>
        <strong style={{ color: "#6b7280" }}>
          With Kani Selvam Paraman, Lead Consultant & Chief Trainer:
        </strong>
        <br />
        This is a focused consulting segment exclusively handled by Kani Selvam
        Paraman, addressing core strategies, planning inputs, and personalised
        guidance.
      </>
    ),
  },
  {
    step: "02",
    title: "Training Sessions with Subject Matter Expert",
    desc: "Following the consulting segment, the structured training modules will be conducted by our specialised trainers, each being a subject matter expert in their respective domains.",
  },
];

export default function WhyDrillDailyExists() {
  return (
    <Box sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 6 } }}>
      <Grid container spacing={4}>
        {/* Left: Why Drill Daily Exists */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              bgcolor: "#eef6f0",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
                Why Drill Daily Exists ?
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Students often struggle with finding the right guidance, proper
              study flow, and consistent follow-up.
            </Typography>

            <Grid container spacing={4} sx={{ alignItems: "center" }}>
              <Grid size={{ xs: 12, sm: 7 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, fontWeight: 700 }}
                >
                  Drill Daily solves this by offering:
                </Typography>
                <Stack spacing={2}>
                  {points.map((point) => (
                    <Stack
                      direction="row"
                      sx={{ spacing: 2, alignItems: "flex-start" }}
                      key={point}
                    >
                      <CheckCircleIcon
                        sx={{
                          color: "var(--primary)",
                          fontSize: 20,
                          mt: 0.2,
                          mr: 1,
                        }}
                      />
                      <Typography variant="body2">{point}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, sm: 5 }}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                    aspectRatio: "4/3",
                  }}
                >
                  <Image
                    src="/img/home/one2one.webp"
                    alt="Tutor guiding a student"
                    sizes="(max-width: 600px) 100vw, 400px"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Typography variant="body2" color="#6b7280" sx={{ mb: 3, mt: 2 }}>
              Whether you want individual attention or prefer group learning, we
              provide a strong academic support system tailored to your goals.
            </Typography>
          </Card>
        </Grid>

        {/* Right: Programme Structure */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              height: "100%",
              border: "1px solid #e5e7eb",
            }}
          >
            <Box
              sx={{
                bgcolor: "var(--black)",
                color: "var(--white)",
                px: 3,
                py: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "30%",
                  bgcolor: "rgba(22, 163, 74, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <SchoolIcon
                  sx={{
                    fontSize: 24,
                    color: "var(--primary)",
                  }}
                />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "var(--white)",
                }}
              >
                Programme Structure
              </Typography>
            </Box>

            <Box sx={{ p: 3 }}>
              <Stack spacing={3}>
                {structure.map((s) => (
                  <Stack direction="row" spacing={2} key={s.step}>
                    <Box
                      sx={{
                        minWidth: 32,
                        height: 32,
                        borderRadius: "50%",
                        bgcolor: "var(--primary)",
                        color: "var(--white)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 13,
                        boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
                      }}
                    >
                      {s.step}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {s.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {s.desc}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
