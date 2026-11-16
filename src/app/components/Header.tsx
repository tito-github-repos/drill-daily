"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

// Add more classes here later (e.g. Class XII)
const COACHING_CLASSES: (NavLink & { sub: string })[] = [
  {
    label: "Class XI",
    href: "/coaching/class-xi",
    sub: "NEET · IIT JEE · IAT · NEST · CBSE",
  },
];

const NAV_LINKS_BEFORE: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "My Classes", href: "/my-classes" },
];

const NAV_LINKS_AFTER: NavLink[] = [{ label: "Contact", href: "/contact" }];

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [ctaHover, setCtaHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [coachingOpen, setCoachingOpen] = useState(false);

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
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      width: "100%",
      background: "rgba(255, 255, 255, 0.92)",
      backdropFilter: "blur(14px) saturate(180%)",
      WebkitBackdropFilter: "blur(14px) saturate(180%)",
      borderBottom: scrolled
        ? "1px solid rgba(22,163,74,0.10)"
        : "1px solid rgba(15,23,42,0.05)",
      boxShadow: scrolled ? "0 8px 24px -12px rgba(22,163,74,0.18)" : "none",
      transition: "all .35s ease",
    },

    container: {
      maxWidth: "1320px",
      margin: "0 auto",
      padding: isMobile ? "10px 16px" : "12px 32px",
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
      fontSize: isMobile ? "16px" : "18px",
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
          width: "280px",
          maxWidth: "85vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          padding: "24px 20px",
          gap: "2px",
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
      width: "34px",
      height: "34px",
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

  /* ---------- shared link look (used by normal links + Coaching button) ---------- */

  const getLinkStyle = (isActive: boolean, isHovered: boolean): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    alignItems: isMobile ? "flex-start" : "center",
    justifyContent: "center",
    position: "relative",
    padding: isMobile ? "12px 14px" : "8px 13px",
    borderRadius: "8px",
    fontSize: isMobile ? "15px" : "13.5px",
    fontWeight: isActive ? 700 : 600,
    color: isActive ? "var(--primary)" : "#374151",
    textAlign: isMobile ? "left" : "center",
    background:
      isHovered && !isActive
        ? "var(--primary-light)"
        : isMobile && isActive
          ? "var(--primary-light)"
          : "transparent",
    transition: "all .25s cubic-bezier(.4,0,.2,1)",
    alignSelf: "stretch",
    width: isMobile ? "100%" : "auto",
  });

  const getUnderlineStyle = (isActive: boolean): CSSProperties => ({
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
  });

  const closeAll = () => {
    setMenuOpen(false);
    setCoachingOpen(false);
  };

  const NavLinkItem = ({ link }: { link: NavLink }) => {
    const isActive = pathname === link.href;
    const isHovered = hoveredLink === link.href;

    return (
      <Link
        href={link.href}
        style={getLinkStyle(isActive, isHovered)}
        onMouseEnter={() => setHoveredLink(link.href)}
        onMouseLeave={() => setHoveredLink(null)}
        onClick={closeAll}
      >
        {link.label}
        {!isMobile && <span style={getUnderlineStyle(isActive)} />}
      </Link>
    );
  };

  /* ---------- Coaching dropdown ---------- */

  const coachingActive = pathname.startsWith("/coaching");

  const CoachingMenu = () => (
    <div
      style={{
        position: "relative",
        alignSelf: isMobile ? "stretch" : "auto",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={() => !isMobile && setCoachingOpen(true)}
      onMouseLeave={() => !isMobile && setCoachingOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={coachingOpen}
        onClick={() => setCoachingOpen((o) => !o)}
        style={{
          ...getLinkStyle(coachingActive, coachingOpen),
          flexDirection: "row",
          gap: "4px",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          justifyContent: isMobile ? "space-between" : "center",
          alignItems: "center",
          background:
            coachingOpen && !coachingActive
              ? "var(--primary-light)"
              : isMobile && coachingActive
                ? "var(--primary-light)"
                : "transparent",
        }}
      >
        Coaching
        <ChevronDown
          size={14}
          strokeWidth={2.4}
          style={{
            transition: "transform .25s ease",
            transform: coachingOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
        {!isMobile && <span style={getUnderlineStyle(coachingActive)} />}
      </button>

      {coachingOpen && (
        <div
          style={
            isMobile
              ? { padding: "2px 0 6px 12px" }
              : {
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  paddingTop: "6px", // hover bridge so the menu doesn't close
                  zIndex: 1000,
                }
          }
        >
          <div
            style={
              isMobile
                ? {}
                : {
                    background: "#fff",
                    borderRadius: "12px",
                    border: "1px solid rgba(15,23,42,0.06)",
                    boxShadow: "0 16px 36px -12px rgba(15,23,42,0.18)",
                    minWidth: "210px",
                    padding: "6px",
                  }
            }
          >
            {COACHING_CLASSES.map((c) => {
              const isActive = pathname === c.href;
              const isHovered = hoveredLink === c.href;
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  onMouseEnter={() => setHoveredLink(c.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={closeAll}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background:
                      isHovered || isActive ? "var(--primary-light)" : "transparent",
                    color: isActive || isHovered ? "var(--primary)" : "#374151",
                    fontSize: isMobile ? "14.5px" : "13.5px",
                    fontWeight: 700,
                    transition: "all .2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.label}
                  <span
                    style={{ fontSize: "11px", fontWeight: 500, color: "#6b7280" }}
                  >
                    {c.sub}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div style={styles.overlay} onClick={closeAll} />

      <header style={styles.header}>
        <div style={styles.container}>
          <Link href="/" style={styles.logo}>
            <Image
              src="/img/dd-logo.png"
              alt="Drill Daily"
              width={isMobile ? 32 : 36}
              height={isMobile ? 32 : 36}
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
              onClick={closeAll}
              aria-label="Close Menu"
            >
              <X size={16} />
            </button>

            {NAV_LINKS_BEFORE.map((link) => (
              <NavLinkItem key={link.href} link={link} />
            ))}

            <CoachingMenu />

            {NAV_LINKS_AFTER.map((link) => (
              <NavLinkItem key={link.href} link={link} />
            ))}

            <div style={styles.ctaWrap}>
              <Link
                href="/#register-form"
                style={styles.cta}
                onMouseEnter={() => setCtaHover(true)}
                onMouseLeave={() => setCtaHover(false)}
                onClick={(e) => {
                  closeAll();
                  if (pathname === "/") {
                    e.preventDefault();
                    document
                      .getElementById("register-form")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Register
                <ArrowRight
                  size={15}
                  strokeWidth={2.2}
                  style={styles.ctaArrow}
                />
              </Link>
            </div>
          </nav>

          <button
            style={styles.menuToggle}
            onClick={() => (menuOpen ? closeAll() : setMenuOpen(true))}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>
    </>
  );
}