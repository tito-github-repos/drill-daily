"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Chip,
  Stack,
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  CircularProgress,
  Autocomplete,
  Alert,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";
import PublicIcon from "@mui/icons-material/PublicOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { formatSlotDate, SLOT_LABEL, subjectsFor } from "@/lib/consulting";

const courses = [
  {
    key: "job",
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
    tags: ["UPSC", "SSC", "RBI", "NDA", "AFCAT", "CDSE", "CAPF", "IBPS", "PO", "RRB"],
    fee: "₹ 1,999 / course",
  },
  {
    key: "higher",
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
    tags: ["NEET", "IIT-JEE", "NID", "NIFT", "UCEED", "NATA", "CLAT", "IPMAT", "CUET"],
    fee: "₹ 1,999 / course",
  },
  {
    key: "abroad",
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
    tags: ["GMAT", "LSE Mathematics", "GRE", "SAT", "IELTS", "TOEFL", "LSAT"],
    fee: "₹ 1,999 / course",
  },
];

type Course = (typeof courses)[number];

type Step =
  | "email" | "checking" | "details" | "paying" | "confirming"
  | "notRegistered" | "success" | "error";

type Prefill = {
  student: {
    firstName: string;
    lastName: string;
    phone: string;
    subjects: string[];
  };
  bookableDates: string[];
  bookedDates: string[];
    myHold: { date: string; orderId: string; expiresAt: string | null } | null;
};

declare global {
  interface Window {
    Razorpay?: any;
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

async function post(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data) {
    throw Object.assign(new Error(data?.error || "Something went wrong"), {
      status: res.status,
    });
  }
  return data;
}

const isEmailStr = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

/* ---------- Calendar ---------- */

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const pad = (n: number) => String(n).padStart(2, "0");
const keyOf = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const parseKey = (k: string) => {
  const [y, m, d] = k.split("-").map(Number);
  return { y, m: m - 1, d };
};

function ConsultCalendar({
  bookable,
  booked,
  value,
  onChange,
  disabled,
  accent,
  tint,
  border,
}: {
  bookable: string[];
  booked: string[];
  value: string;
  onChange: (d: string) => void;
  disabled?: boolean;
  accent: string;
  tint: string;
  border: string;
}) {
  const sorted = useMemo(() => [...bookable].sort(), [bookable]);
  const bookableSet = useMemo(() => new Set(sorted), [sorted]);
  const bookedSet = useMemo(() => new Set(booked), [booked]);

  const first = sorted.length ? parseKey(sorted[0]) : { y: 2026, m: 0, d: 1 };
  const last = sorted.length ? parseKey(sorted[sorted.length - 1]) : first;
  const start = value ? parseKey(value) : first;

  const [view, setView] = useState({ y: start.y, m: start.m });

  const minIdx = first.y * 12 + first.m;
  const maxIdx = last.y * 12 + last.m;
  const viewIdx = view.y * 12 + view.m;

  const go = (delta: number) => {
    const idx = viewIdx + delta;
    if (idx < minIdx || idx > maxIdx) return;
    setView({ y: Math.floor(idx / 12), m: idx % 12 });
  };

  if (!sorted.length) {
    return (
      <Typography variant="body2" sx={{ opacity: 0.65 }}>
        No dates are open for booking right now. Please check back soon.
      </Typography>
    );
  }

  const offset = (new Date(Date.UTC(view.y, view.m, 1)).getUTCDay() + 6) % 7; // Monday first
  const daysInMonth = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const navSx = {
    width: 30,
    height: 30,
    border: "1px solid #e5e7eb",
    borderRadius: 1.5,
    "&:hover": { bgcolor: tint, borderColor: accent },
    "&.Mui-disabled": { opacity: 0.35 },
  };

  return (
    <Box>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.75 }}>
        <IconButton size="small" sx={navSx} disabled={viewIdx <= minIdx} onClick={() => go(-1)} aria-label="Previous month">
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ fontWeight: 800, fontSize: 15 }}>
          {MONTHS[view.m]} {view.y}
        </Typography>
        <IconButton size="small" sx={navSx} disabled={viewIdx >= maxIdx} onClick={() => go(1)} aria-label="Next month">
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
        {WEEKDAYS.map((w) => (
          <Typography
            key={w}
            variant="caption"
            sx={{ textAlign: "center", fontWeight: 700, color: "text.secondary", py: 0.25 }}
          >
            {w}
          </Typography>
        ))}

        {cells.map((d, i) => {
          if (d === null) return <Box key={`e${i}`} />;
          const k = keyOf(view.y, view.m, d);
          const isBooked = bookedSet.has(k);
          const isAvail = bookableSet.has(k) && !isBooked;
          const isSel = value === k;

          return (
            <ButtonBase
              key={k}
              disabled={!isAvail || disabled}
              onClick={() => onChange(k)}
              aria-label={k}
              aria-pressed={isSel}
              sx={{
                height: 34,
                width: "100%",
                borderRadius: 1.5,
                fontSize: 13,
                fontWeight: isSel ? 800 : 600,
                border: "1px solid transparent",
                transition: "background .15s, border-color .15s",
                ...(isSel && {
                  bgcolor: accent,
                  color: "#fff",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.18)",
                }),
                ...(!isSel && isAvail && {
                  bgcolor: tint,
                  color: "text.primary",
                  borderColor: border,
                  "&:hover": { borderColor: accent },
                }),
                ...(isBooked && {
                  bgcolor: "#f3f4f6",
                  color: "#9ca3af",
                  textDecoration: "line-through",
                }),
                ...(!isSel && !isAvail && !isBooked && { color: "#d1d5db" }),
                "&.Mui-disabled": { pointerEvents: "none" },
              }}
            >
              {d}
            </ButtonBase>
          );
        })}
      </Box>

      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 2, mt: 1.25 }}>
        {[
          { label: "Selected", bg: accent, bd: accent },
          { label: "Available", bg: tint, bd: border },
          { label: "Booked", bg: "#e5e7eb", bd: "#e5e7eb" },
        ].map((l) => (
          <Stack key={l.label} direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
            <Box sx={{ width: 11, height: 11, borderRadius: "3px", bgcolor: l.bg, border: `1px solid ${l.bd}` }} />
            <Typography variant="caption" color="text.secondary">
              {l.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

/* ---------- Main component ---------- */

export default function CoursesOffered() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [active, setActive] = useState<Course | null>(null);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [message, setMessage] = useState("");

  // scheduling form
  const [prefill, setPrefill] = useState<Prefill | null>(null);
  const [date, setDate] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [formError, setFormError] = useState("");

  const openDialog = (c: Course) => {
    setActive(c);
    setEmail("");
    setStep("email");
    setMessage("");
    setPrefill(null);
    setDate("");
    setSubjects([]);
    setContactEmail("");
    setContactPhone("");
    setFormError("");
  };
  const closeDialog = () => {
    if (step === "checking" || step === "paying" || step === "confirming") return;
    setActive(null);
  };

  const goToRegister = () => {
    setActive(null);
    setTimeout(() => {
      const el = document.getElementById("register-form");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.href = "/#register-form";
    }, 300);
  };

  const emailValid = isEmailStr(email);
  const contactEmailValid = isEmailStr(contactEmail);
  const contactPhoneValid = contactPhone === "" || /^[6-9]\d{9}$/.test(contactPhone);
  const canPay = !!date && subjects.length > 0 && contactEmailValid && contactPhoneValid;

  // Registered? -> load prefill + which dates are taken
  const loadDetails = async (c: Course) => {
    const data = await post("/api/payments/check", { email, courseKey: c.key });
    if (!data.registered) return setStep("notRegistered");
    setPrefill(data);
    setContactEmail(email.trim().toLowerCase());
    setContactPhone(String(data.student.phone ?? "").replace(/\D/g, "").slice(-10));
    setSubjects(data.student.subjects);
    setDate(data.myHold?.date ?? ""); // resume the student's own unpaid hold
    setStep("details");
  };

  // Refresh only availability, so the student's typed details are kept
  const refreshAvailability = async (c: Course) => {
    const data = await post("/api/payments/check", { email, courseKey: c.key });
    if (!data.registered) return;
    setPrefill((p) =>
      p
        ? {
            ...p,
            bookableDates: data.bookableDates,
            bookedDates: data.bookedDates,
            myHold: data.myHold,
          }
        : p,
    );
    setDate((d) => (data.bookedDates.includes(d) ? "" : d));
  };

  // Keep the calendar fresh while the form is open (other students may book)
  useEffect(() => {
    if (!active || step !== "details") return;
    const t = setInterval(() => {
      refreshAvailability(active).catch(() => {});
    }, 30000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, step]);

  const handleContinue = async () => {
    if (!active || !emailValid) return;
    setStep("checking");
    setMessage("");
    try {
      await loadDetails(active);
    } catch (e: any) {
      setMessage(e.message);
      setStep("error");
    }
  };

  // Network dropped after paying: wait for the webhook / verify to confirm it
  const confirmPayment = async (orderId: string) => {
    setStep("confirming");
    for (let i = 0; i < 20; i++) {
      await new Promise((r) => setTimeout(r, 3000));
      try {
        const s = await post("/api/payments/status", { email, orderId });
        if (s.status === "PAID") return setStep("success");
        if (s.status === "REFUNDED" || s.status === "CONFLICT") {
          setMessage(
            "Sorry, this date was taken before your payment completed. Your payment will be refunded to the original payment method.",
          );
          return setStep("error");
        }
      } catch {
        // keep polling
      }
    }
    setMessage(
      "We couldn't confirm your payment yet. If money was deducted, you'll get a confirmation email shortly, or an automatic refund. Please contact us if you don't hear back within a day.",
    );
    setStep("error");
  };

  const handleCancelHold = async () => {
    if (!active || !prefill?.myHold) return;
    try {
      await post("/api/payments/release", { email, orderId: prefill.myHold.orderId });
      setDate("");
      await refreshAvailability(active);
    } catch {}
  };

  const handlePay = async () => {
    if (!active || !canPay) return;
    setFormError("");
    setStep("paying");
    try {
      const ok = await loadRazorpay();
      if (!ok) throw new Error("Could not load the payment window. Check your connection.");

      const order = await post("/api/payments/create-order", {
        email,
        courseKey: active.key,
        consultDate: date,
        subjects,
        contactEmail: contactEmail.trim(),
        contactPhone,
      });
      if (order.notRegistered) return setStep("notRegistered");

      let settled = false; // true once Razorpay reports a payment

      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "Drill Daily",
        description: `${order.courseName} consultation`,
        prefill: {
          email: contactEmail.trim(),
          contact: contactPhone || undefined,
        },
        theme: { color: "#16a34a" },
        handler: async (r: any) => {
          settled = true;
          try {
            await post("/api/payments/verify", r);
            setStep("success");
          } catch (e: any) {
            if (e.status && e.status < 500) {
              // the server decided (e.g. date taken, refund issued)
              setMessage(e.message);
              setStep("error");
            } else {
              // network / server failure: money may have been taken
              await confirmPayment(order.orderId);
            }
          }
        },
        modal: {
          // closed without paying: free the date straight away
                    ondismiss: () => {
            if (settled) return;
            // keep the hold: the student can resume the same order for 24 hours
            refreshAvailability(active).catch(() => {});
            setStep("details");
          },
        },
      });
      // A failed card attempt does not drop the hold: Razorpay lets the student retry.
      rzp.open();
    } catch (e: any) {
      if (e.status === 409) {
        // someone grabbed the date a moment ago: refresh the greyed-out dates
        setFormError(e.message);
        try { await refreshAvailability(active); } catch {}
        setStep("details");
        return;
      }
      setMessage(e.message);
      setStep("error");
    }
  };

  const wide = (step === "details" || step === "paying") && !!prefill;
  const feeText = active ? active.fee.replace(" / course", "") : "";

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
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
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
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: `${c.titleColor}` }}>
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
                    <Chip key={tag} label={tag} size="small" sx={{ bgcolor: "var(--white)", fontWeight: 700 }} />
                  ))}
                </Stack>
              </Box>

              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontWeight: 700 }}>
                  Consulting Fee
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: c.feeColor }}>
                  {c.fee}
                </Typography>
              </Box>

              <Button
                fullWidth
                disableElevation
                variant="contained"
                onClick={() => openDialog(c)}
                sx={{
                  bgcolor: c.feeColor,
                  color: "#fff",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "15px",
                  borderRadius: 2,
                  py: 1.1,
                  "&:hover": { bgcolor: c.cardHoverColor, filter: "brightness(0.92)" },
                }}
              >
                Buy now
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={!!active}
        scroll="paper"
        onClose={(_, reason) => {
          if (reason === "backdropClick") return; // clicking outside does nothing
          closeDialog();
        }}
        fullWidth
        maxWidth={wide ? "md" : "xs"}
        fullScreen={fullScreen}
        slotProps={{
          paper: {
            sx: {
              borderRadius: fullScreen ? 0 : 3,
              overflow: "hidden",
              m: fullScreen ? 0 : 2,
              display: "flex",
              flexDirection: "column",
              maxHeight: fullScreen ? "100dvh" : "calc(100dvh - 32px)",
            },
          },
        }}
      >
        {active && (
          <DialogContent
            sx={{
              position: "relative",
              p: 0,
              flex: "1 1 auto",
              minHeight: 0,                 // lets the content shrink and scroll
              overflowY: "auto",
              overscrollBehavior: "contain", // scroll never leaks to the page behind
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": { width: 6 },
              "&::-webkit-scrollbar-thumb": { backgroundColor: "#c7ccd1", borderRadius: 3 },
            }}
          >
            <IconButton
              aria-label="Close"
              onClick={closeDialog}
              sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}
            >
              <CloseIcon />
            </IconButton>

            {/* 1. Email */}
            {(step === "email" || step === "checking") && (
              <Box sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: active.titleColor, pr: 4 }}>
                  {active.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.65, mt: 0.5, mb: 3 }}>
                  Enter the email you registered with to book your consultation
                  ({feeText}). Not registered yet? We&apos;ll guide you.
                </Typography>
                <TextField
                  fullWidth
                  autoFocus
                  type="email"
                  label="Email address"
                  value={email}
                  disabled={step === "checking"}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                  sx={{ mb: 2.5 }}
                />
                <Button
                  fullWidth
                  disableElevation
                  variant="contained"
                  disabled={!emailValid || step === "checking"}
                  onClick={handleContinue}
                  sx={{
                    bgcolor: active.feeColor,
                    fontWeight: 700,
                    textTransform: "none",
                    py: 1.2,
                    borderRadius: 2,
                    "&:hover": { bgcolor: active.cardHoverColor },
                  }}
                >
                  {step === "checking" ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Continue"}
                </Button>
              </Box>
            )}

            {/* 2. Scheduling form (registered students only) */}
            {(step === "details" || step === "paying") && prefill && (
              <>
                {/* Header */}
                <Box
                  sx={{
                    bgcolor: active.cardBg,
                    borderBottom: `1px solid ${active.cardBorder}`,
                    px: { xs: 2.5, md: 3 },
                    py: { xs: 1.75, md: 2 },
                    pr: 7,
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 800, color: active.titleColor, fontSize: { xs: 19, md: 22 } }}>
                    Book your consultation
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.25 }}>
                    {active.title}
                  </Typography>
                </Box>

                {formError && (
                  <Box sx={{ px: { xs: 2.5, md: 3 }, pt: 1.5 }}>
                    <Alert severity="error" sx={{ py: 0 }}>{formError}</Alert>
                  </Box>
                )}

                {!formError && prefill.myHold && date === prefill.myHold.date && (
                  <Box sx={{ px: { xs: 2.5, md: 3 }, pt: 1.5 }}>
                    <Alert
                      severity="info"
                      sx={{ py: 0 }}
                      action={
                        <Button color="inherit" size="small" onClick={handleCancelHold}>
                          Cancel booking
                        </Button>
                      }
                    >
                      You have an unpaid booking for {formatSlotDate(prefill.myHold.date)}.
                      It&apos;s held for you for a few minutes. Pay to confirm it.
                    </Alert>
                  </Box>
                )}

                {/* Two columns on desktop, stacked on mobile */}
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
                  {/* Left: calendar */}
                  <Box
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      borderRight: { md: "1px solid #eceff3" },
                      borderBottom: { xs: "1px solid #eceff3", md: "none" },
                    }}
                  >
                    <Typography variant="overline" sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: 1, lineHeight: 1.6, display: "block" }}>
                      Step 1 · Choose a date
                    </Typography>
                    <Typography variant="caption" sx={{ display: "block", opacity: 0.65, mb: 1 }}>
                      Monday to Saturday · {SLOT_LABEL}
                    </Typography>

                    <ConsultCalendar
                      bookable={prefill.bookableDates}
                      booked={prefill.bookedDates}
                      value={date}
                      onChange={setDate}
                      disabled={step === "paying"}
                      accent={active.feeColor}
                      tint={active.cardBg}
                      border={active.cardBorder}
                    />
                  </Box>

                  {/* Right: details + summary */}
                  <Box sx={{ p: { xs: 2.5, md: 3 }, display: "flex", flexDirection: "column" }}>
                    <Typography variant="overline" sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: 1, lineHeight: 1.6, display: "block", mb: 1 }}>
                      Step 2 · Your details
                    </Typography>

                    <Stack spacing={1.5}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Student name"
                        value={`${prefill.student.firstName} ${prefill.student.lastName}`}
                        slotProps={{ input: { readOnly: true } }}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="Course Category"
                        value={active.title}
                        slotProps={{ input: { readOnly: true } }}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        type="email"
                        label="Contact email"
                        value={contactEmail}
                        disabled={step === "paying"}
                        onChange={(e) => setContactEmail(e.target.value)}
                        error={!contactEmailValid}
                        helperText={!contactEmailValid ? "Enter a valid email" : undefined}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        type="tel"
                        label="Contact phone"
                        value={contactPhone}
                        disabled={step === "paying"}
                        onChange={(e) => setContactPhone(e.target.value.replace(/\D/g, ""))}
                        slotProps={{
                          htmlInput: { maxLength: 10 },
                          inputLabel: { shrink: true },
                        }}
                        error={!contactPhoneValid}
                        helperText={!contactPhoneValid ? "Enter a valid 10-digit number" : undefined}
                      />
                      <Autocomplete
                        multiple
                        size="small"
                        limitTags={2}
                        disableCloseOnSelect
                        disabled={step === "paying"}
                        options={subjectsFor(active.key)}
                        value={subjects}
                        onChange={(_, v) => setSubjects(v)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Preferred Classes"
                            placeholder={subjects.length ? "" : "Select classes"}
                            error={subjects.length === 0}
                            helperText={subjects.length === 0 ? "Select at least one class" : undefined}
                          />
                        )}
                      />
                    </Stack>

                    {/* Summary */}
                    <Box
                      sx={{
                        mt: 1.5,
                        px: 1.75,
                        py: 1.1,
                        borderRadius: 2,
                        bgcolor: active.cardBg,
                        border: `1px solid ${active.cardBorder}`,
                      }}
                    >
                      <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>Course Category</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, textAlign: "right" }}>
                          {active.title}
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2, mt: 0.25 }}>
                        <Typography variant="body2" sx={{ opacity: 0.7, flexShrink: 0 }}>Preferred Classes</Typography>
                        <Typography
                          variant="body2"
                          title={subjects.join(", ")}
                          sx={{
                            fontWeight: 700,
                            textAlign: "right",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {subjects.length ? subjects.join(", ") : "Select classes"}
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2, mt: 0.25 }}>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>Date</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, textAlign: "right" }}>
                          {date ? shortDate(date) : "Select a date"}
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2, mt: 0.25 }}>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>Time</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{SLOT_LABEL}</Typography>
                      </Stack>
                      <Divider sx={{ my: 0.75 }} />
                      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>Consulting fee</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 800, color: active.feeColor }}>
                          {feeText}
                        </Typography>
                      </Stack>
                    </Box>

                    <Button
                      fullWidth
                      disableElevation
                      variant="contained"
                      disabled={!canPay || step === "paying"}
                      onClick={handlePay}
                      sx={{
                        mt: 1.5,
                        bgcolor: active.feeColor,
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: 15,
                        py: 1.1,
                        borderRadius: 2,
                        "&:hover": { bgcolor: active.cardHoverColor },
                      }}
                    >
                      {step === "paying" ? (
                        <CircularProgress size={22} sx={{ color: "#fff" }} />
                      ) : (
                        `Pay ${feeText} & book`
                      )}
                    </Button>

                    <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", justifyContent: "center", mt: 1, opacity: 0.6 }}>
                      <LockOutlinedIcon sx={{ fontSize: 13 }} />
                      <Typography variant="caption">Secure payment via Razorpay</Typography>
                    </Stack>
                  </Box>
                </Box>
              </>
            )}

            {/* 3. Confirming payment (network dropped after paying) */}
            {step === "confirming" && (
              <Box sx={{ textAlign: "center", p: { xs: 3, sm: 4 } }}>
                <CircularProgress sx={{ color: active.feeColor }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mt: 2 }}>
                  Confirming your payment…
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.65, mt: 0.5 }}>
                  Please keep this window open. This can take up to a minute.
                </Typography>
              </Box>
            )}

            {/* 4. Not registered */}
            {step === "notRegistered" && (
              <Box sx={{ textAlign: "center", p: { xs: 3, sm: 4 } }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Register first
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.65, mt: 0.5, mb: 3 }}>
                  We couldn&apos;t find a registration for {email.trim()}. Complete the
                  registration form, then come back to book your consultation.
                </Typography>
                <Button
                  fullWidth
                  disableElevation
                  variant="contained"
                  onClick={goToRegister}
                  sx={{ bgcolor: active.feeColor, fontWeight: 700, textTransform: "none", py: 1.2, borderRadius: 2, mb: 1 }}
                >
                  Go to registration
                </Button>
                <Button
                  fullWidth
                  onClick={() => setStep("email")}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Use a different email
                </Button>
              </Box>
            )}

            {/* 5. Success */}
            {step === "success" && (
              <Box sx={{ textAlign: "center", p: { xs: 3, sm: 4 } }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 56, color: active.feeColor }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mt: 1 }}>
                  Consultation booked
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.65, mt: 0.5, mb: 3 }}>
                  {formatSlotDate(date)}, {SLOT_LABEL}. A confirmation has been
                  sent to {contactEmail.trim()}.
                </Typography>
                <Button
                  fullWidth
                  disableElevation
                  variant="contained"
                  onClick={() => setActive(null)}
                  sx={{ bgcolor: active.feeColor, fontWeight: 700, textTransform: "none", py: 1.2, borderRadius: 2 }}
                >
                  Done
                </Button>
              </Box>
            )}

            {/* 6. Error */}
            {step === "error" && (
              <Box sx={{ textAlign: "center", p: { xs: 3, sm: 4 } }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Something went wrong
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.65, mt: 0.5, mb: 3 }}>
                  {message || "Please try again."}
                </Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    if (!prefill) return setStep("email");
                    setStep("details");
                    if (active) refreshAvailability(active).catch(() => {});
                  }}
                  sx={{ textTransform: "none", fontWeight: 700, py: 1.2, borderRadius: 2 }}
                >
                  Try again
                </Button>
              </Box>
            )}
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}