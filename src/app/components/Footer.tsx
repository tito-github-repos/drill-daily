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
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const styles: Record<string, CSSProperties> = {
    footer: {
      width: "100%",
      background: "var(--black)",
      padding: "28px 24px",
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

  const getLinkStyle = (label: string): CSSProperties => ({
    fontSize: "13px",
    color:
      hoveredLink === label ? "var(--primary)" : "rgba(255, 255, 255, 0.6)",
    textDecoration: "none",
    transition: "color 0.2s ease",
    whiteSpace: "nowrap",
  });

  return (
    <footer style={styles.footer}>
      <div className="footer-container">
        <p className="footer-copyright">
          © {year} Drill Daily. All rights reserved.
        </p>

        <div className="footer-social">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={getIconStyle(label)}
              onMouseEnter={() => setHoveredIcon(label)}
              onMouseLeave={() => setHoveredIcon(null)}
              aria-label={label}
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>

        <div className="footer-legal">
          {LEGAL_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={getLinkStyle(label)}
              onMouseEnter={() => setHoveredLink(label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          row-gap: 16px;
        }
        .footer-copyright {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          grid-column: 1;
          justify-self: start;
          margin: 0;
        }
        .footer-social {
          display: flex;
          gap: 14px;
          justify-content: center;
          grid-column: 2;
        }
        .footer-legal {
          display: flex;
          gap: 20px;
          grid-column: 3;
          justify-self: end;
        }

        @media (max-width: 640px) {
          .footer-container {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
            row-gap: 14px;
          }
          .footer-copyright {
            grid-column: 1;
            justify-self: center;
            order: 3;
          }
          .footer-social {
            grid-column: 1;
            order: 1;
          }
          .footer-legal {
            grid-column: 1;
            justify-self: center;
            order: 2;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}