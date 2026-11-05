"use client";

import { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

const demos = [
  {
    title: "Website demo",
    src: "/videos/for-facts-website.mp4.mp4",
    ring: "#c7d2fe",
    glow: "rgba(79, 70, 229, 0.35)",
    icon: (
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <defs>
          <linearGradient id="ffWebHead" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="ffWebPlay" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fbbf24" />
            <stop offset="1" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
        {/* browser window */}
        <rect
          x="2"
          y="5"
          width="28"
          height="22"
          rx="4"
          fill="#eef2ff"
          stroke="#a5b4fc"
          strokeWidth="1.5"
        />
        <path
          d="M2 9a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v3H2V9Z"
          fill="url(#ffWebHead)"
        />
        {/* window dots */}
        <circle cx="6.5" cy="8.5" r="1.2" fill="#ef4444" />
        <circle cx="10.5" cy="8.5" r="1.2" fill="#facc15" />
        <circle cx="14.5" cy="8.5" r="1.2" fill="#22c55e" />
        {/* play button */}
        <circle cx="16" cy="19.5" r="5.5" fill="url(#ffWebPlay)" />
        <path d="M14.4 16.9 19.2 19.5 14.4 22.1Z" fill="#fff" />
      </svg>
    ),
  },
  {
    title: "Mobile app demo",
    src: "/videos/for-facts-mobile.mp4.mp4",
    ring: "#fbcfe8",
    glow: "rgba(236, 72, 153, 0.35)",
    icon: (
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <defs>
          <linearGradient id="ffAppScreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fb923c" />
            <stop offset="0.55" stopColor="#ec4899" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        {/* phone body */}
        <rect x="7.5" y="1.5" width="17" height="29" rx="4.5" fill="#1e1b4b" />
        {/* screen */}
        <rect
          x="9.8"
          y="5.5"
          width="12.4"
          height="21"
          rx="2.2"
          fill="url(#ffAppScreen)"
        />
        {/* speaker + home bar */}
        <rect x="13.5" y="3" width="5" height="1.2" rx="0.6" fill="#6366f1" />
        <rect x="13" y="28" width="6" height="1" rx="0.5" fill="#a5b4fc" />
        {/* play button */}
        <circle cx="16" cy="16" r="4.6" fill="#fff" />
        <path d="M14.6 13.8 18.4 16 14.6 18.2Z" fill="#ec4899" />
        {/* accents */}
        <circle cx="12.2" cy="8.6" r="0.9" fill="#fde047" />
        <circle cx="15.2" cy="8.6" r="0.9" fill="#86efac" />
        <circle cx="18.2" cy="8.6" r="0.9" fill="#67e8f9" />
      </svg>
    ),
  },
];

type Demo = (typeof demos)[number];

export default function ForFactsDemos() {
  const [activeVideo, setActiveVideo] = useState<Demo | null>(null);
  const [videoError, setVideoError] = useState(false);

  function openVideo(demo: Demo) {
    setVideoError(false);
    setActiveVideo(demo);
  }

  function closeVideo() {
    setActiveVideo(null);
  }

  return (
    <>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 1,
          flexShrink: 0,
        }}
      >
        {demos.map((demo) => (
          <Tooltip key={demo.title} title={demo.title} arrow>
            <IconButton
              aria-label={`Play ${demo.title}`}
              onClick={() => openVideo(demo)}
              sx={{
                width: 44,
                height: 44,
                borderRadius: "13px",
                background: "#fff",
                border: `1.5px solid ${demo.ring}`,
                boxShadow: "0 2px 6px rgba(15, 23, 42, 0.08)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                "&:hover": {
                  background: "#fff",
                  transform: "translateY(-2px) scale(1.07)",
                  boxShadow: `0 8px 16px ${demo.glow}`,
                },
              }}
            >
              {demo.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      <Dialog
        fullScreen
        open={Boolean(activeVideo)}
        onClose={closeVideo}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#080d14",
              color: "#fff",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: { xs: 1.5, sm: 2.5 },
            py: 1.25,
            borderBottom: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#86efac",
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
              }}
            >
              FOR FACTS DEMO
            </Typography>
            <Typography sx={{ mt: 0.25, fontSize: "1rem", fontWeight: 700 }}>
              {activeVideo?.title}
            </Typography>
          </Box>

          <IconButton
            onClick={closeVideo}
            aria-label="Close video"
            sx={{
              width: 40,
              height: 40,
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.25)",
              fontSize: 26,
              "&:hover": {
                background: "rgba(255,255,255,0.1)",
              },
            }}
          >
            ×
          </IconButton>
        </Box>

        <DialogContent
          sx={{
            display: "grid",
            placeItems: "center",
            p: { xs: 1, sm: 2 },
            overflow: "hidden",
          }}
        >
          {videoError ? (
            <Typography sx={{ color: "#fff", textAlign: "center" }}>
              This video couldn’t be loaded. Check that this file exists:
              <br />
              <Box component="code" sx={{ color: "#86efac" }}>
                {activeVideo?.src}
              </Box>
            </Typography>
          ) : (
            activeVideo && (
              <video
                key={activeVideo.src}
                src={activeVideo.src}
                controls
                autoPlay
                playsInline
                onError={() => setVideoError(true)}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  maxHeight: "calc(100dvh - 76px)",
                  objectFit: "contain",
                  background: "#000",
                }}
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}