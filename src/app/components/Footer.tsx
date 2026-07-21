"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import type { IconType } from "react-icons";

interface SocialLink {
  icon: IconType;
  href: string;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { icon: FaLinkedin, href: "https://www.linkedin.com/company/90765852/admin/dashboard/", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://www.instagram.com/drilldailyusers/", label: "Instagram" },
  { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61585823977100", label: "Facebook" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const styles: Record<string, CSSProperties> = {
    footer: {
      width: "100%",
      background: "var(--black)",
      padding: "28px 24px",
    },
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
    },
    social: {
      display: "flex",
      gap: "14px",
      justifyContent: "center",
      gridColumn: 2,
    },
    copyright: {
      fontSize: "13px",
      color: "rgba(255, 255, 255, 0.6)",
      gridColumn: 1,
      justifySelf: "start",
    },
  };

  const getIconStyle = (label: string): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background:
      hoveredIcon === label ? "var(--primary)" : "rgba(255, 255, 255, 0.08)",
    color: "var(--white)",
    transition: "background 0.2s ease, color 0.2s ease",
  });

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.social}>
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              suppressHydrationWarning
              style={getIconStyle(label)}
              onMouseEnter={() => setHoveredIcon(label)}
              onMouseLeave={() => setHoveredIcon(null)}
              aria-label={label}
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>

        <p style={styles.copyright}>
          © {year} Drill Daily. All rights reserved.
        </p>
      </div>
    </footer>
  );
}