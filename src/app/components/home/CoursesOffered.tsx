"use client";

import { Box, Typography, Grid, Card, Chip, Stack } from "@mui/material";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";
import PublicIcon from "@mui/icons-material/PublicOutlined";

const courses = [
  {
    icon: <WorkOutlinedIcon sx={{ color: "var(--primary)" }} />,
    iconBg: "var(--white)",
    iconBorder: "rgb(187, 247, 208)",
    iconBoxShadow: "rgba(22, 163, 74, 0.094) 0px 2px 10px",
    titleColor: "var(--primary)",
    cardBg: "var(--primary-light)",
    cardShadow: "rgba(22, 163, 74, 0.133) 0px 20px 48px",
    cardHoverColor: "rgb(22, 163, 74)",
    cardBorder: "#bfe3cd",
    tagsBg: "var(--white)",
    feeColor: "var(--primary)",
    title: "Job Exams",
    tags: [
      "UPSC",
      "SSC",
      "RBI",
      "NDA",
      "AFCAT",
      "CDSE",
      "CAPF",
      "IBPS",
      "PO",
      "RRB",
    ],
    fee: "₹ 2,999 / course",
  },
  {
    icon: <SchoolIcon sx={{ color: "#2563eb" }} />,
    iconBg: "var(--white)",
    iconBorder: "rgb(191, 219, 254)",
    iconBoxShadow: "rgb(191, 219, 254)",
    titleColor: "#2563eb",
    cardBg: "rgb(239, 246, 255)",
    cardShadow: " rgba(37, 99, 235, 0.133) 0px 20px 48px",
    cardHoverColor: "rgb(37, 99, 235)",
    cardBorder: "#bfd3fb",
    tagsBg: "#f2f6fe",
    feeColor: "#2563eb",
    title: "Higher Education Entrance Exams",
    tags: [
      "NEET",
      "NID",
      "NIFT",
      "UCEED",
      "CLAT",
      "IPM",
      "IIT-JEE",
      "CUET",
      "NATA",
    ],
    fee: "₹ 2,499 / course",
  },
  {
    icon: <PublicIcon sx={{ color: "#7c3aed" }} />,
    iconBg: "var(--white)",
    iconBorder: "rgb(221, 214, 254)",
    iconBoxShadow: "rgba(124, 58, 237, 0.094) 0px 2px 10px",
    titleColor: "var(--secondary)",
    cardBg: "var(--secondary-light)",
    cardShadow: "rgba(124, 58, 237, 0.133) 0px 20px 48px",
    cardHoverColor: "rgb(124, 58, 237)",
    cardBorder: "#dcc7fa",
    tagsBg: "#f9f5fe",
    feeColor: "#7c3aed",
    title: "Abroad Education Exams",
    tags: [
      "GMAT",
      "LSE Mathematics",
      "GRE",
      "SAT",
      "IELTS",
      "TOEFL",
      "LSAT",
    ],
    fee: "₹ 2,999 / course",
  },
];

export default function CoursesOffered() {
  return (
    <Box sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 6 } }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box
          component="img"
          src="/Icons/target-icon.svg"
          alt="Brain Icon"
          sx={{
            mr: 1,
            width: 30,
            height: 30,
            flexShrink: 0,
            filter:
              "brightness(0) saturate(100%) invert(42%) sepia(84%) saturate(575%) hue-rotate(93deg) brightness(94%) contrast(95%)",
          }}
        />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Courses Offered
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {courses.map((c) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={c.title}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: `2px solid ${c.cardBorder}`,
                background: `${c.cardBg}`,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "0.22s",
                "&:hover": {
                  border: `2px solid ${c.cardHoverColor}`,
                  transform: "translateY(-5px)",
                  boxShadow: c.cardShadow,
                },
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center", mb: 2 }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "30%",
                    border: `1px solid ${c.iconBorder}`,
                    bgcolor: c.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `${c.iconBoxShadow}`,
                  }}
                >
                  {c.icon}
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: `${c.titleColor}` }}
                >
                  {c.title}
                </Typography>
              </Stack>

              <Box
                sx={{
                  bgcolor: "var(--white)",
                  border: `1px solid ${c.cardBorder}`,
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                  flexGrow: 1,
                }}
              >
                <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                  {c.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: "var(--white)",
                        fontWeight: 700,
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", fontWeight: 700 }}
                >
                  Consulting Fee
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: c.feeColor }}
                >
                  {c.fee}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
