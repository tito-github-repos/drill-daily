"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "My Classes", href: "/my-classes" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [ctaHover, setCtaHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const handleResize = () => setIsMobile(mq.matches);
    handleResize();
    mq.addEventListener("change", handleResize);
    return () => mq.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen && isMobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, isMobile]);

  const styles: Record<string, CSSProperties> = {
    header: {
      position: "sticky",
      top: 0,
      zIndex: 999,
      width: "100%",
      background: "rgba(255, 255, 255, 0.92)",
      backdropFilter: "blur(14px) saturate(180%)",
      WebkitBackdropFilter: "blur(14px) saturate(180%)",
      borderBottom: scrolled
        ? "1px solid rgba(22,163,74,0.10)"
        : "1px solid rgba(15,23,42,0.05)",
      boxShadow: scrolled
        ? "0 8px 24px -12px rgba(22,163,74,0.18)"
        : "none",
      transition: "all .35s ease",
    },

    container: {
      maxWidth: "1320px",
      margin: "0 auto",
      padding: "12px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },

    logoImg: {
      borderRadius: "10px",
      objectFit: "contain",
    },

    logoText: {
      fontSize: "18px",
      fontWeight: 800,
      letterSpacing: "-0.3px",
      color: "#111827",
      lineHeight: 1,
    },

    logoAccent: {
      color: "var(--primary)",
    },

    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(15,23,42,.4)",
      backdropFilter: "blur(2px)",
      opacity: menuOpen && isMobile ? 1 : 0,
      pointerEvents: menuOpen && isMobile ? "auto" : "none",
      transition: ".3s ease",
      zIndex: 998,
    },

    nav: isMobile
      ? {
          position: "fixed",
          top: 0,
          right: 0,
          width: "300px",
          maxWidth: "88vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "26px",
          gap: "4px",
          background: "#fff",
          boxShadow: "-16px 0 40px rgba(0,0,0,.10)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform .4s cubic-bezier(.16,1,.3,1)",
          zIndex: 999,
        }
      : {
          display: "flex",
          alignItems: "center",
          gap: "2px",
        },

    closeBtn: {
      display: isMobile ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-end",
      width: "34px",
      height: "34px",
      border: "none",
      borderRadius: "50%",
      background: "var(--primary-light)",
      color: "var(--primary)",
      cursor: "pointer",
      marginBottom: "18px",
    },

    ctaWrap: {
      marginLeft: isMobile ? 0 : "14px",
      paddingLeft: isMobile ? 0 : "14px",
      borderLeft: isMobile ? "none" : "1px solid rgba(15,23,42,0.08)",
    },

    cta: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "7px",
      background: "var(--primary)",
      color: "#fff",
      padding: "9px 18px",
      borderRadius: "999px",
      fontSize: "13px",
      fontWeight: 700,
      letterSpacing: ".2px",
      boxShadow: ctaHover
        ? "0 8px 18px -4px rgba(22,163,74,.35)"
        : "0 3px 10px -3px rgba(22,163,74,.25)",
      transform: ctaHover ? "translateY(-1px)" : "translateY(0)",
      transition: "all .28s cubic-bezier(.34,1.56,.64,1)",
      width: isMobile ? "100%" : "auto",
      marginTop: isMobile ? "18px" : 0,
    },

    ctaArrow: {
      transition: "transform .25s ease",
      transform: ctaHover ? "translateX(2px)" : "translateX(0)",
    },

    menuToggle: {
      display: isMobile ? "flex" : "none",
      width: "36px",
      height: "36px",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "9px",
      border: "none",
      background: "var(--primary-light)",
      color: "var(--primary)",
      cursor: "pointer",
      transition: ".25s",
    },
  };

  const NavLinkItem = ({ link }: { link: NavLink }) => {
    const isActive = pathname === link.href;
    const isHovered = hoveredLink === link.href;

    const linkStyle: CSSProperties = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      padding: isMobile ? "12px 14px" : "8px 13px",
      borderRadius: "8px",
      fontSize: isMobile ? "15.5px" : "13.5px",
      fontWeight: isActive ? 700 : 600,
      color: isActive ? "var(--primary)" : "#374151",
      background:
        isHovered && !isActive
          ? "var(--primary-light)"
          : isMobile && isActive
          ? "var(--primary-light)"
          : "transparent",
      transition: "all .25s cubic-bezier(.4,0,.2,1)",
      alignSelf: isMobile ? "stretch" : "center",
    };

    const underlineStyle: CSSProperties = {
      position: "absolute",
      bottom: "1px",
      left: "50%",
      transform: "translateX(-50%)",
      width: isActive ? "14px" : "0",
      height: "2px",
      borderRadius: "999px",
      background: "var(--primary)",
      transition: "all .3s ease",
      opacity: isMobile ? 0 : 1,
    };

    return (
      <Link
        href={link.href}
        style={linkStyle}
        onMouseEnter={() => setHoveredLink(link.href)}
        onMouseLeave={() => setHoveredLink(null)}
        onClick={() => setMenuOpen(false)}
      >
        {link.label}
        {!isMobile && <span style={underlineStyle} />}
      </Link>
    );
  };

  return (
    <>
      <div style={styles.overlay} onClick={() => setMenuOpen(false)} />

      <header style={styles.header}>
        <div style={styles.container}>
          <Link href="/" style={styles.logo}>
            <Image
              src="/img/dd-logo.png"
              alt="Drill Daily"
              width={36}
              height={36}
              style={styles.logoImg}
              priority
            />
            <span style={styles.logoText}>
              DRILL <span style={styles.logoAccent}>DAILY</span>
            </span>
          </Link>

          <nav style={styles.nav}>
            <button
              style={styles.closeBtn}
              onClick={() => setMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={16} />
            </button>

            {NAV_LINKS.map((link) => (
              <NavLinkItem key={link.href} link={link} />
            ))}

            <div style={styles.ctaWrap}>
              <Link
                href="/#register-form"
                style={styles.cta}
                onMouseEnter={() => setCtaHover(true)}
                onMouseLeave={() => setCtaHover(false)}
                onClick={(e) => {
                    setMenuOpen(false);
                    if (pathname === "/") {
                        e.preventDefault();
                        document.getElementById("register-form")?.scrollIntoView({ behavior: "smooth" });
                    }
                }}
              >
                Register
                <ArrowRight size={15} strokeWidth={2.2} style={styles.ctaArrow} />
              </Link>
            </div>
          </nav>

          <button
            style={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>
    </>
  );
}
