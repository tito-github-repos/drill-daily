"use client";
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import styles from "./myclasses.module.css";

const APPROACH_ITEMS = [
  {
    icon: VerifiedOutlinedIcon,
    title: "Clear Explanation",
    description: "Concepts explained in a simple and easy way.",
  },
  {
    icon: AssignmentTurnedInOutlinedIcon,
    title: "Concept-First Learning",
    description: "Strong foundation before moving ahead.",
  },
  {
    icon: TrackChangesOutlinedIcon,
    title: "Real Exam Pattern Practice",
    description: "Stay aligned with the latest exam pattern.",
  },
  {
    icon: ForumOutlinedIcon,
    title: "Doubt-Clearing Sessions",
    description: "Get your doubts resolved, every time.",
  },
  {
    icon: CalendarMonthOutlinedIcon,
    title: "Structured Weekly Planning",
    description: "Stay organised with a clear weekly plan.",
  },
];

export default function MyClassesPage() {
  return (
    <>
      {/* Hero Section */}
      <Box component="section" className={styles.hero}>

  {/* Left Content */}

  <Stack className={styles.content} spacing={0}>

    <Typography
      variant="overline"
      className={styles.eyebrow}
    >
      MY CLASSES
    </Typography>

    <Typography
      variant="h2"
      className={styles.heading}
    >
      Track Your Learning.
      <br />

      <span className={styles.highlight}>
        Achieve Your Goals.
      </span>
    </Typography>

    <Typography
      variant="body1"
      className={styles.description}
    >
      Manage your classes, connect with expert tutors,
      monitor your progress, and stay ahead in your
      learning journey with structured guidance.
    </Typography>

  </Stack>

  {/* Right Image */}

  <Box className={styles.imageWrapper}>
    <Image
      src="/images/myclasses/hero-img.webp"
      alt="Student learning online"
      fill
      priority
      className={styles.image}
    />
  </Box>

</Box>

      {/* Learning Approach Section */}
      <Box component="section" className={styles.approachSection}>
        <Box className={styles.approachHeader}>
          <Typography variant="overline" className={styles.approachEyebrow}>
            OUR LEARNING APPROACH
          </Typography>
          <Typography variant="h4" className={styles.approachHeading}>
            Built for Better Learning Outcomes
          </Typography>
          <Box className={styles.approachUnderline} />
        </Box>

        <Box className={styles.approachCard}>
          <Box className={styles.approachGrid}>
            {/* Left timeline list */}
            <Box className={styles.timeline}>
              {APPROACH_ITEMS.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === APPROACH_ITEMS.length - 1;
                return (
                  <Box key={item.title} className={styles.timelineItem}>
                    <Box className={styles.timelineIconCol}>
                      <Box className={styles.iconCircle}>
                        <Icon className={styles.icon} />
                      </Box>
                      {!isLast && <Box className={styles.connector} />}
                    </Box>
                    <Box className={styles.timelineText}>
                      <Typography className={styles.itemTitle}>
                        {item.title}
                      </Typography>
                      <Typography className={styles.itemDescription}>
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Right image + commitment */}
            <Box className={styles.rightCol}>
              <Box className={styles.approachImageWrapper}>
                <Image
                  src="/images/myclasses/class-room-img.webp"
                  alt="Students learning together in a classroom"
                  fill
                  className={styles.image}
                />
              </Box>

              <Box className={styles.commitment}>
                <Box className={styles.commitmentIconCircle}>
                  <HandshakeOutlinedIcon className={styles.commitmentIcon} />
                </Box>
                <Box>
                  <Typography className={styles.commitmentTitle}>
                    Our Commitment
                  </Typography>
                  <Typography className={styles.commitmentText}>
                    Our tutors work with students to build confidence and
                    help them progress steadily.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
