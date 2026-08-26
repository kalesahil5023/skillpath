import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User, LogIn, LogOut, Menu, X, Compass, CheckCircle2 } from "lucide-react";

export default function Navbar({ onOpenLegal }) {
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 32px)",
        maxWidth: "1200px",
        zIndex: 100,
        background: "rgba(8, 16, 29, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(115, 215, 255, 0.16)",
        borderRadius: "16px",
        padding: "12px 24px",
      }}
      aria-label="Primary navigation"
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Brand */}
        <a
          href="#home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "1.2rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          <span
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, var(--primary), var(--secondary))",
              color: "#08111f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "1.1rem",
            }}
          >
            S
          </span>
          <span>SkillSprint</span>
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            fontSize: "0.95rem",
          }}
          className="desktop-nav"
        >
          <a href="#path-finder" style={{ color: "var(--text-secondary)" }}>Path Finder</a>
          <a href="#skill-roadmaps" style={{ color: "var(--text-secondary)" }}>Skill Roadmaps</a>
          <a href="#my-plan" style={{ color: "var(--text-secondary)" }}>My Plan</a>
          <a href="#earning-paths" style={{ color: "var(--text-secondary)" }}>Earning Paths</a>
          <a href="#builders" style={{ color: "var(--text-secondary)" }}>Builders</a>
          <a href="#resources" style={{ color: "var(--text-secondary)" }}>Resources</a>
          <button
            type="button"
            onClick={() => onOpenLegal("about")}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "inherit",
              fontFamily: "inherit",
            }}
          >
            About
          </button>
        </div>

        {/* User / Auth Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {isLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  background: "rgba(115, 215, 255, 0.08)",
                  border: "1px solid rgba(115, 215, 255, 0.2)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.85rem",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    boxShadow: "0 0 8px var(--accent)",
                  }}
                />
                <User size={14} color="var(--primary)" />
                <span style={{ fontWeight: 600, color: "var(--text)", maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user?.displayName || user?.username}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={logout}
                title="Log out"
                style={{ padding: "8px 12px" }}
              >
                <LogOut size={15} />
                <span className="hide-mobile">Log out</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => openAuthModal("login")}
            >
              <LogIn size={15} />
              <span>Log in / Sign up</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text)",
              padding: "6px",
              display: "none",
              cursor: "pointer",
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <a href="#path-finder" onClick={() => setMobileMenuOpen(false)}>Path Finder</a>
          <a href="#skill-roadmaps" onClick={() => setMobileMenuOpen(false)}>Skill Roadmaps</a>
          <a href="#my-plan" onClick={() => setMobileMenuOpen(false)}>My Plan</a>
          <a href="#earning-paths" onClick={() => setMobileMenuOpen(false)}>Earning Paths</a>
          <a href="#builders" onClick={() => setMobileMenuOpen(false)}>Builders</a>
          <a href="#resources" onClick={() => setMobileMenuOpen(false)}>Resources</a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLegal("about");
            }}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              textAlign: "left",
              padding: 0,
              fontSize: "1rem",
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            About
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .hide-mobile { display: none; }
        }
      `}</style>
    </nav>
  );
}
