import React, { useState } from "react";

const navLinks = [
  { label: "Explore Simulations", href: "#", active: true },
  { label: "Career DNA", href: "#career-dna" },
  { label: "Skill Graph", href: "#skill-graph" },
  { label: "Roadmaps", href: "#roadmaps" },
  { label: "Project Lab", href: "#project-lab" },
  { label: "Skill Passport", href: "#passport" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--outline-variant)",
      }}
    >
      <div
        className="ss-container"
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Logo + Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 4,
                background: "var(--primary)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-headline)",
                fontWeight: 700,
                fontSize: 18,
                boxShadow: "var(--shadow-sm)",
                flexShrink: 0,
              }}
            >
              S
            </div>
            <span
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--on-surface)",
                letterSpacing: "-0.02em",
              }}
            >
              SkillSprint
            </span>
          </a>

          {/* Divider */}
          <div
            className="hide-mobile"
            style={{ width: 1, height: 16, background: "var(--outline-variant)" }}
          />

          {/* Desktop Nav */}
          <nav
            style={{
              display: "none",
              alignItems: "center",
              gap: 24,
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: link.active ? "var(--primary)" : "var(--on-surface-variant)",
                  borderBottom: link.active ? "2px solid var(--primary)" : "2px solid transparent",
                  paddingBottom: 2,
                  transition: "color 0.15s",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Engine Status */}
          <div className="status-online hide-mobile">
            <span
              className="status-dot animate-pulse"
              style={{ background: "var(--tertiary)" }}
            />
            <span>ENGINE: ONLINE</span>
          </div>

          {/* Launch Simulator CTA */}
          <a href="#simulator-preview" className="btn-primary" style={{ fontSize: "0.6875rem" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>terminal</span>
            Launch Simulator
          </a>

          {/* Divider */}
          <div
            className="hide-mobile"
            style={{ width: 1, height: 20, background: "var(--outline-variant)" }}
          />

          {/* Avatar */}
          <button
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--surface-container)",
              border: "1px solid var(--outline-variant)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--on-surface-variant)",
              cursor: "pointer",
              transition: "color 0.15s",
              flexShrink: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              padding: 6,
              color: "var(--on-surface-variant)",
              cursor: "pointer",
            }}
            className="mobile-menu-btn"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--outline-variant)",
            padding: "12px var(--margin)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: link.active ? "var(--primary)" : "var(--on-surface-variant)",
                padding: "10px 0",
                borderBottom: "1px solid var(--outline-variant)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 1280px) {
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 1279px) {
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 640px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
