"use client";
import React from "react";
import { Box, Typography, Stack, SvgIconProps } from "@mui/material";
import Image from "next/image";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import styles from "./myclasses.module.css";

/* =========================================================
   Types
   ========================================================= */

type IconComponent = React.ComponentType<SvgIconProps>;

interface ApproachItem {
  icon: IconComponent;
  title: string;
  description: string;
}

type ExperienceColor = "green" | "blue" | "orange" | "purple";

interface ExperienceItem {
  icon: IconComponent;
  title: string;
  description: string;
  color: ExperienceColor;
}

interface WhoCanJoinItem {
  icon: IconComponent;
  title: string;
  description: string;
}

interface HowToJoinStep {
  number: string;
  title: string;
  description: string;
}

interface DashboardFeature {
  icon: IconComponent;
  title: string;
  description: string;
  color: ExperienceColor;
}

/* =========================================================
   Data
   ========================================================= */

const APPROACH_ITEMS: ApproachItem[] = [
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

const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    icon: GroupsOutlinedIcon,
    title: "Expert Tutors",
    description: "Learn from experienced and verified mentors.",
    color: "green",
  },
  {
    icon: ShowChartOutlinedIcon,
    title: "Progress Tracking",
    description: "Track your performance and improvement.",
    color: "blue",
  },
  {
    icon: AssignmentTurnedInOutlinedIcon,
    title: "Practice Tests",
    description: "Regular tests to evaluate and improve.",
    color: "orange",
  },
  {
    icon: GroupsOutlinedIcon,
    title: "Small Batch Size",
    description: "Individual attention in every class.",
    color: "purple",
  },
];

const WHO_CAN_JOIN_ITEMS: WhoCanJoinItem[] = [
  {
    icon: SchoolOutlinedIcon,
    title: "School & College Students",
    description: "Preparing for entrance exams with expert guidance.",
  },
  {
    icon: WorkOutlineOutlinedIcon,
    title: "Government Job Aspirants",
    description: "Aiming for stable careers in public sector.",
  },
  {
    icon: FlightTakeoffOutlinedIcon,
    title: "Study Abroad Candidates",
    description: "Planning overseas education with proper preparation.",
  },
  {
    icon: GroupsOutlinedIcon,
    title: "Group Learning Enthusiasts",
    description: "Those who prefer personalised or group tuition.",
  },
  {
    icon: StarOutlineRoundedIcon,
    title: "Results-Focused Learners",
    description: "Seeking structured, result-oriented coaching.",
  },
];

const HOW_TO_JOIN_STEPS: HowToJoinStep[] = [
  {
    number: "01",
    title: "Choose Your Class Type",
    description: "Select one-to-one or group classes.",
  },
  {
    number: "02",
    title: "Fill Registration Form",
    description: "Provide your details and learning goals.",
  },
  {
    number: "03",
    title: "Connect with Our Team",
    description: "Our team will guide you further.",
  },
  {
    number: "04",
    title: "Start Your Learning Journey",
    description: "Attend classes and track your progress.",
  },
];

const DASHBOARD_FEATURES: DashboardFeature[] = [
  {
    icon: CalendarMonthOutlinedIcon,
    title: "View Upcoming Classes",
    description: "Check your schedule anytime.",
    color: "green",
  },
  {
    icon: ShowChartOutlinedIcon,
    title: "Track Progress",
    description: "Monitor your performance and growth.",
    color: "blue",
  },
  {
    icon: AssignmentTurnedInOutlinedIcon,
    title: "Manage Attendance",
    description: "Keep track of your attendance easily.",
    color: "orange",
  },
  {
    icon: ForumOutlinedIcon,
    title: "Communicate with Tutors",
    description: "Stay connected and clarify doubts.",
    color: "purple",
  },
];

/* =========================================================
   Component
   ========================================================= */

export default function MyClassesPage(): React.JSX.Element {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <Box component="section" className={styles.hero}>
        <Stack className={styles.content} spacing={0}>
          <Typography variant="overline" className={styles.eyebrow}>
            MY CLASSES
          </Typography>

          <Typography variant="h2" className={styles.heading}>
            Track Your Learning.
            <br />
            <span className={styles.highlight}>Achieve Your Goals.</span>
          </Typography>

          <Typography variant="body1" className={styles.description}>
            Manage your classes, connect with expert tutors, monitor your
            progress, and stay ahead in your learning journey with structured
            guidance.
          </Typography>
        </Stack>

        <Box className={styles.imageWrapper}>
          <Image
            src="/img/myclasses/hero-img.webp"
            alt="Student learning online"
            fill
            priority
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 480px, (max-width: 1024px) 500px, 640px"
            className={styles.image}
          />
        </Box>
      </Box>

      {/* ================= LEARNING APPROACH ================= */}
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

            <Box className={styles.rightCol}>
              <Box className={styles.approachImageWrapper}>
                <Image
                  src="/img/myclasses/class-room-img.webp"
                  alt="Students learning together in a classroom"
                  fill
                  sizes="(max-width: 900px) 100vw, 55vw"
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
                    Our tutors work with students to build confidence and help
                    them progress steadily.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ================= CLASS STRUCTURE ================= */}
      <Box component="section" className={styles.structureSection}>
        <Box className={styles.structureOuterCard}>
          <Box className={styles.structureHeader}>
            <Box className={styles.structureHeaderRow}>
              <Box className={styles.structureHeaderIcon}>
                <PersonOutlineOutlinedIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography className={styles.structureHeading}>
                Class Structure
              </Typography>
            </Box>

            <Typography className={styles.structureDescription}>
              Choose the learning environment that suits you best.
            </Typography>
          </Box>

          <Box className={styles.structureGrid}>
            {/* ONE TO ONE CARD */}
            <Box className={`${styles.classCard} ${styles.oneToOneCard}`}>
              <Box className={styles.cardTop}>
                <Box className={styles.cardContent}>
                  <Box className={styles.cardTitleRow}>
                    <Box className={styles.cardIcon}>
                      <PersonOutlineOutlinedIcon sx={{ fontSize: 26 }} />
                    </Box>
                    <Typography className={styles.cardTitle}>
                      One-to-One Classes
                    </Typography>
                  </Box>

                  <Box className={styles.featureList}>
                    <Box className={styles.featureItem}>
                      <CheckCircleRoundedIcon className={styles.featureIcon} />
                      <Typography className={styles.featureText}>
                        Personalised attention
                      </Typography>
                    </Box>
                    <Box className={styles.featureItem}>
                      <CheckCircleRoundedIcon className={styles.featureIcon} />
                      <Typography className={styles.featureText}>
                        Customised study plan
                      </Typography>
                    </Box>
                    <Box className={styles.featureItem}>
                      <CheckCircleRoundedIcon className={styles.featureIcon} />
                      <Typography className={styles.featureText}>
                        Flexible scheduling
                      </Typography>
                    </Box>
                    <Box className={styles.featureItem}>
                      <CheckCircleRoundedIcon className={styles.featureIcon} />
                      <Typography className={styles.featureText}>
                        Regular progress updates
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className={styles.cardImage}>
                  <Image
                    src="/img/myclasses/one-to-one.webp"
                    alt="One to One Class"
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    className={styles.cardImg}
                  />
                </Box>
              </Box>
            </Box>

            {/* GROUP CARD */}
            <Box className={`${styles.classCard} ${styles.groupCard}`}>
              <Box className={styles.cardTop}>
                <Box className={styles.cardContent}>
                  <Box className={styles.cardTitleRow}>
                    <Box className={styles.cardIcon}>
                      <GroupsOutlinedIcon sx={{ fontSize: 26 }} />
                    </Box>
                    <Box className={styles.cardTitleTextCol}>
                      <Typography className={styles.cardTitle}>
                        Group Classes
                      </Typography>
                      <Typography className={styles.cardSubtitle}>
                        (Up to 12 Students)
                      </Typography>
                    </Box>
                  </Box>

                  <Box className={styles.featureList}>
                    <Box className={styles.featureItem}>
                      <CheckCircleRoundedIcon className={styles.featureIcon} />
                      <Typography className={styles.featureText}>
                        Peer learning environment
                      </Typography>
                    </Box>
                    <Box className={styles.featureItem}>
                      <CheckCircleRoundedIcon className={styles.featureIcon} />
                      <Typography className={styles.featureText}>
                        Interactive & engaging sessions
                      </Typography>
                    </Box>
                    <Box className={styles.featureItem}>
                      <CheckCircleRoundedIcon className={styles.featureIcon} />
                      <Typography className={styles.featureText}>
                        Affordable learning
                      </Typography>
                    </Box>
                    <Box className={styles.featureItem}>
                      <CheckCircleRoundedIcon className={styles.featureIcon} />
                      <Typography className={styles.featureText}>
                        Doubt clearing in class
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className={styles.cardImage}>
                  <Image
                    src="/img/myclasses/group.webp"
                    alt="Group Class"
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    className={styles.cardImg}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ================= OUR CLASS EXPERIENCE ================= */}
      <Box component="section" className={styles.experienceSection}>
        <Box className={styles.experienceOuterCard}>
          <Box className={styles.structureHeader}>
            <Box className={styles.structureHeaderRow}>
              <Box className={styles.structureHeaderIcon}>
                <SchoolOutlinedIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography className={styles.structureHeading}>
                Our Class Experience
              </Typography>
            </Box>
            <Typography className={styles.structureDescription}>
              We focus on practical, result-oriented learning.
            </Typography>
          </Box>

          <Box className={styles.experienceGrid}>
            {EXPERIENCE_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Box
                  key={item.title}
                  className={`${styles.experienceCard} ${styles[item.color]}`}
                >
                  <Box className={styles.experienceIcon}>
                    <Icon sx={{ fontSize: 26 }} />
                  </Box>
                  <Typography className={styles.experienceTitle}>
                    {item.title}
                  </Typography>
                  <Typography className={styles.experienceText}>
                    {item.description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* ================= WHO CAN JOIN / HOW TO JOIN ================= */}
      <Box component="section" className={styles.joinSection}>
        <Box className={styles.joinOuterCard}>
          <Box className={styles.joinGrid}>
            {/* Left: Who Can Join + Image */}
            <Box className={styles.joinLeftCol}>
              <Box className={styles.joinColInner}>
                <Typography className={styles.joinHeading}>
                  Who Can Join Drill Daily?
                </Typography>
                <Box className={styles.joinUnderline} />

                <Box className={styles.joinList}>
                  {WHO_CAN_JOIN_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Box key={item.title} className={styles.joinListItem}>
                        <Box className={styles.joinListIcon}>
                          <Icon sx={{ fontSize: 18 }} />
                        </Box>
                        <Box>
                          <Typography className={styles.joinListTitle}>
                            {item.title}
                          </Typography>
                          <Typography className={styles.joinListText}>
                            {item.description}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              <Box className={styles.joinImageWrapper}>
                <Image
                  src="/img/myclasses/pic3.webp"
                  alt="Student planning study schedule"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 30vw"
                  className={styles.image}
                />
              </Box>
            </Box>

            {/* Right: How to Join */}
            <Box className={styles.joinRightCol}>
              <Typography className={styles.joinHeading}>
                How to Join a Class
              </Typography>
              <Box className={styles.joinUnderline} />

              <Box className={styles.stepsList}>
                {HOW_TO_JOIN_STEPS.map((step) => (
                  <Box key={step.number} className={styles.stepItem}>
                    <Box className={styles.stepNumber}>{step.number}</Box>
                    <Box>
                      <Typography className={styles.joinListTitle}>
                        {step.title}
                      </Typography>
                      <Typography className={styles.joinListText}>
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Box className={styles.stepItem}>
                  <Box className={styles.stepIconCircle}>
                    <HeadsetMicOutlinedIcon sx={{ fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography className={styles.joinListTitle}>
                      Need Help?
                    </Typography>
                    <Typography className={styles.joinListText}>
                      Our team is here to help you!
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ================= STUDENT DASHBOARD FEATURES ================= */}
      <Box component="section" className={styles.dashboardSection}>
        <Box className={styles.dashboardOuterCard}>
          <Box className={styles.dashboardHeader}>
            <Typography className={styles.dashboardHeading}>
              Student Dashboard Features
            </Typography>
            <Typography className={styles.dashboardDescription}>
              Everything you need to stay on track and succeed.
            </Typography>
          </Box>

          <Box className={styles.dashboardGrid}>
            {DASHBOARD_FEATURES.map((item) => {
              const Icon = item.icon;
              return (
                <Box
                  key={item.title}
                  className={`${styles.dashboardCard} ${styles[item.color]}`}
                >
                  <Box className={styles.dashboardIcon}>
                    <Icon sx={{ fontSize: 24 }} />
                  </Box>
                  <Typography className={styles.dashboardCardTitle}>
                    {item.title}
                  </Typography>
                  <Typography className={styles.dashboardCardText}>
                    {item.description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}
