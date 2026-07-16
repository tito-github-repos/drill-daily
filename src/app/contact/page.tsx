"use client";

import { Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  MessageCircle,
  Users,
  Heart,
  Headphones,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Send,
  CheckCircle2,
  Navigation,
} from "lucide-react";

export default function ContactPage() {
  return (
    <Box sx={{ background: "var(--background)" }}>
      <HeroSection />
      <ContactInfoSection />
      <MapSection />
      <TrustStrip />
    </Box>
  );
}

/* ========================================================
   HERO SECTION
======================================================== */
function HeroSection() {
  const features = [
    { icon: MessageCircle, label: "Quick Response", bg: "var(--primary-light)", color: "var(--primary)" },
    { icon: Users, label: "Expert Guidance", bg: "var(--secondary-light)", color: "var(--secondary)" },
    { icon: Heart, label: "We Care About You", bg: "var(--primary-light)", color: "var(--primary)" },
  ];

  return (
    <Box sx={{ position: "relative", py: { xs: 5, md: 8 }, overflow: "hidden" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 5, md: 6 },
            alignItems: "center",
          }}
        >
          {/* Left column */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              sx={{
                display: "inline-block",
                background: "var(--primary-light)",
                color: "var(--primary)",
                fontSize: "12.5px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                px: 2,
                py: 0.9,
                borderRadius: "999px",
                mb: 2.5,
              }}
            >
              WE'RE HERE FOR YOU
            </Box>

            <Typography
              component={motion.h1}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                fontSize: { xs: "32px", md: "42px" },
                fontWeight: 800,
                lineHeight: 1.15,
                color: "var(--black)",
                mb: 2.2,
                letterSpacing: "-0.5px",
              }}
            >
              We're Here to <br />
              Help You{" "}
              <Box component="span" sx={{ color: "var(--primary)" }}>
                Succeed
              </Box>
            </Typography>

            <Typography
              component={motion.p}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              sx={{
                fontSize: "16px",
                color: "var(--black)",
                opacity: 0.65,
                lineHeight: 1.7,
                mb: 4,
                maxWidth: "480px",
              }}
            >
              Have questions about our courses or need guidance? Our team is
              ready to support you on your learning journey.
            </Typography>

            <Box
              component={motion.div}
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
              }}
              sx={{ display: "flex", gap: 2.5, flexWrap: "wrap" }}
            >
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <Box
                    key={f.label}
                    component={motion.div}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -6, scale: 1.04 }}
                    transition={{ duration: 0.3 }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      width: "112px",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: f.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1.2,
                      }}
                    >
                      <Icon size={22} color={f.color} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "13.5px",
                        fontWeight: 700,
                        color: "var(--black)",
                        lineHeight: 1.3,
                      }}
                    >
                      {f.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Right column */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: { xs: "320px", md: "420px" },
            }}
          >
            <Box
              component={motion.div}
              animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 70% 20%, var(--primary-light) 0%, transparent 55%), radial-gradient(circle at 30% 80%, var(--secondary-light) 0%, transparent 55%)",
                borderRadius: "48px",
                zIndex: 0,
              }}
            />

            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              sx={{
                position: "relative",
                zIndex: 1,
                borderRadius: "50%",
                overflow: "hidden",
                border: "6px solid var(--white)",
                boxShadow: "0 24px 48px -16px rgba(0,0,0,0.18)",
                width: { xs: 260, md: 380 },
                height: { xs: 260, md: 380 },
              }}
            >
              <Image
                src="/img/contact_page.webp"
                alt="Learning advisor"
                width={380}
                height={380}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                priority
              />
            </Box>

            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 30, y: -10 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.6 },
                x: { duration: 0.5, delay: 0.6 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
              }}
              whileHover={{ scale: 1.03 }}
              sx={{
                position: "absolute",
                top: { xs: "-4%", md: "8%" },
                right: { xs: "0%", md: "-4%" },
                zIndex: 2,
                background: "var(--white)",
                borderRadius: "20px",
                p: 2.75,
                width: 230,
                boxShadow: "0 16px 40px -12px rgba(0,0,0,0.15)",
                display: { xs: "none", sm: "block" },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.75,
                }}
              >
                <Headphones size={20} color="var(--white)" />
              </Box>
              <Typography
                sx={{
                  fontSize: "14.5px",
                  fontWeight: 700,
                  color: "var(--black)",
                  lineHeight: 1.4,
                  mb: 1,
                }}
              >
                Talk to Our{" "}
                <Box component="span" sx={{ color: "var(--primary)" }}>
                  Learning Advisors
                </Box>
              </Typography>
              <Typography sx={{ fontSize: "12.5px", color: "var(--black)", opacity: 0.6, lineHeight: 1.5 }}>
                We'll help you choose the right course or program that fits
                your goals.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ========================================================
   CONTACT INFO + MESSAGE SECTION
======================================================== */
function ContactInfoSection() {
  const contactRows = [
    {
      icon: Phone,
      title: "Contact & Payment (GPay)",
      detail: "+91 9999532356",
      iconBg: "var(--primary-light)",
      iconColor: "var(--primary)",
    },
    {
      icon: Mail,
      title: "Email",
      detail: "drilldailyusers@gmail.com",
      iconBg: "var(--secondary-light)",
      iconColor: "var(--secondary)",
    },
    {
      icon: MapPin,
      title: "Chennai Office",
      detail: "B4, Lumiers Enclave, #5/1092, Giri Nagar Main Road, Ramapuram, Chennai 600089",
      iconBg: "var(--primary-light)",
      iconColor: "var(--primary)",
    },
    {
      icon: Clock,
      title: "Timing",
      detail: "Mon – Fri | 9 AM – 6 PM",
      iconBg: "var(--secondary-light)",
      iconColor: "var(--secondary)",
    },
  ];

  const cardSx = {
    background: "var(--white)",
    borderRadius: "24px",
    p: { xs: 3, md: 4.5 },
    boxShadow: "0 4px 20px -8px rgba(0,0,0,0.06)",
    height: "100%",
  };

  return (
    <Box sx={{ pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3.5,
          }}
        >
          {/* Get in Touch */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            sx={cardSx}
          >
            <Typography sx={{ fontSize: "26px", fontWeight: 800, color: "var(--black)", mb: 1.25 }}>
              Get in Touch
            </Typography>
            <Box sx={{ width: 36, height: 3, background: "var(--primary)", borderRadius: "999px", mb: 2 }} />
            <Typography sx={{ fontSize: "14.5px", color: "var(--black)", opacity: 0.6, lineHeight: 1.6, mb: 3.25 }}>
              Reach out to us through any of the following channels.
            </Typography>

            <Box
              component={motion.div}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
              }}
            >
              {contactRows.map((row) => {
                const Icon = row.icon;
                return (
                  <Box
                    key={row.title}
                    component={motion.div}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                    whileHover={{ x: 6 }}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.75,
                      p: 2,
                      borderRadius: "14px",
                      border: "1px solid rgba(0,0,0,0.08)",
                      mb: 1.5,
                      cursor: "pointer",
                      transition: "background 0.2s ease, border-color 0.2s ease",
                      "&:hover": {
                        background: "var(--primary-light)",
                        borderColor: "var(--primary)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        background: row.iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} color={row.iconColor} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "14.5px", fontWeight: 700, color: "var(--black)", mb: 0.3 }}>
                        {row.title}
                      </Typography>
                      <Typography sx={{ fontSize: "13px", color: "var(--black)", opacity: 0.6, lineHeight: 1.5 }}>
                        {row.detail}
                      </Typography>
                    </Box>
                    <ChevronRight
                      size={18}
                      color="var(--black)"
                      style={{ marginLeft: "auto", flexShrink: 0, marginTop: "8px", opacity: 0.35 }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* We're Just a Message Away */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            sx={cardSx}
          >
            <Typography sx={{ fontSize: "26px", fontWeight: 800, color: "var(--black)", mb: 1.25 }}>
              We're Just a{" "}
              <Box component="span" sx={{ color: "var(--primary)" }}>
                Message
              </Box>{" "}
              Away!
            </Typography>
            <Box sx={{ width: 36, height: 3, background: "var(--primary)", borderRadius: "999px", mb: 2 }} />
            <Typography sx={{ fontSize: "14.5px", color: "var(--black)", opacity: 0.6, lineHeight: 1.7, mb: 3.5, maxWidth: "380px" }}>
              Whether you have a question about a course, need help with
              enrollment, or just want to say hello — we'd love to hear
              from you.
            </Typography>

            <Box sx={{ position: "relative", height: 70, mb: 2.5 }}>
              <Box
                component={motion.div}
                animate={{ x: [0, 14, 0], y: [0, -10, 0], rotate: [20, 28, 20] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                sx={{ position: "absolute", right: "10%", top: 0 }}
              >
                <Send size={40} color="var(--primary)" />
              </Box>
            </Box>

            <Box
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25 }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                background: "var(--primary-light)",
                borderRadius: "16px",
                p: 2.5,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Mail size={20} color="var(--white)" />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "14.5px", fontWeight: 700, color: "var(--black)", mb: 0.3 }}>
                  Email Us
                </Typography>
                <Typography sx={{ fontSize: "13.5px", fontWeight: 600, color: "var(--black)", mb: 0.3 }}>
                  drilldailyusers@gmail.com
                </Typography>
                <Typography sx={{ fontSize: "12.5px", color: "var(--black)", opacity: 0.6 }}>
                  We'll get back to you as soon as possible.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ========================================================
   MAP SECTION
======================================================== */
function MapSection() {
  const points = ["Easy to reach", "Near public transport", "Ample parking available"];

  return (
    <Box sx={{ pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr" },
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 4px 20px -8px rgba(0,0,0,0.06)",
          }}
        >
          <Box sx={{ position: "relative", minHeight: 340, background: "rgba(0,0,0,0.05)" }}>
            <Box
              component="iframe"
              src="https://www.google.com/maps?q=B4,+Lumiers+Enclave,+Giri+Nagar+Main+Road,+Ramapuram,+Chennai+600089&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Drill Daily Location"
              sx={{ border: 0, width: "100%", height: "100%", minHeight: 340, display: "block" }}
            />
          </Box>

          <Box
            sx={{
              background: "var(--primary-light)",
              p: { xs: 3, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.5px", mb: 1 }}>
              OUR LOCATION
            </Typography>
            <Typography sx={{ fontSize: "24px", fontWeight: 800, color: "var(--black)", mb: 1.5 }}>
              Find Us Here
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "var(--black)", opacity: 0.65, mb: 2.25 }}>
              Conveniently located in the heart of Chennai.
            </Typography>

            {points.map((p) => (
              <Box key={p} sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.25 }}>
                <CheckCircle2 size={18} color="var(--primary)" />
                <Typography sx={{ fontSize: "14px", color: "var(--black)", fontWeight: 600 }}>
                  {p}
                </Typography>
              </Box>
            ))}

            <Box
              component={motion.a}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="https://www.google.com/maps/dir/?api=1&destination=B4,+Lumiers+Enclave,+Giri+Nagar+Main+Road,+Ramapuram,+Chennai+600089"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                mt: 2.5,
                background: "transparent",
                border: "1.5px solid var(--primary)",
                color: "var(--primary)",
                fontWeight: 700,
                fontSize: "13.5px",
                px: 2.75,
                py: 1.35,
                borderRadius: "999px",
                width: "fit-content",
                textDecoration: "none",
                transition: "background 0.25s ease, color 0.25s ease",
                "&:hover": {
                  background: "var(--primary)",
                  color: "var(--white)",
                },
              }}
            >
              GET DIRECTIONS
              <Navigation size={15} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ========================================================
   TRUST STRIP
======================================================== */
function TrustStrip() {
  const items = [
    {
      icon: Users,
      title: "Personalized Guidance",
      desc: "Get advice tailored to your learning goals.",
      bg: "var(--primary-light)",
      color: "var(--primary)",
    },
    {
      icon: CheckCircle2,
      title: "Expert Support",
      desc: "Our team of experts is here to help.",
      bg: "var(--secondary-light)",
      color: "var(--secondary)",
    },
    {
      icon: Heart,
      title: "We Care",
      desc: "Your success is our priority.",
      bg: "var(--primary-light)",
      color: "var(--primary)",
    },
    {
      icon: Users,
      title: "Trusted by Learners",
      desc: "Join thousands who trust Drill Daily.",
      bg: "var(--secondary-light)",
      color: "var(--secondary)",
    },
  ];

  return (
    <Box sx={{ pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            background: "var(--white)",
            borderRadius: "24px",
            p: { xs: 3, md: 4 },
            boxShadow: "0 4px 20px -8px rgba(0,0,0,0.06)",
          }}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Box
                key={item.title}
                component={motion.div}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -4 }}
                sx={{ display: "flex", gap: 1.75, alignItems: "flex-start" }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background: item.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color={item.color} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "var(--black)", mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: "12.5px", color: "var(--black)", opacity: 0.6, lineHeight: 1.5 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}