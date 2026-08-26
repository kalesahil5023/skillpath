import React from "react";
import { ShieldCheck } from "lucide-react";

export default function Footer({ onOpenLegal }) {
  return (
    <footer
      style={{
        background: "rgba(5, 11, 20, 0.95)",
        borderTop: "1px solid var(--border)",
        padding: "60px 0 36px",
        marginTop: "80px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
          className="footer-grid"
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
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
              <span style={{ fontSize: "1.25rem", fontWeight: 800 }}>SkillSprint</span>
            </div>
            <p style={{ maxWidth: "420px", fontSize: "0.95rem", lineHeight: 1.6 }}>
              A modern, transparent roadmap and portfolio platform helping learners turn digital skills into verified, legitimate online earning opportunities without false promises.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px", color: "var(--accent)", fontSize: "0.85rem", fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>Full-Stack Architecture: React + Django + PostgreSQL</span>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 style={{ fontSize: "1.05rem", marginBottom: "18px", color: "var(--text)" }}>Explore</h4>
            <div style={{ display: "grid", gap: "10px", fontSize: "0.9rem" }}>
              <a href="#path-finder" style={{ color: "var(--text-secondary)" }}>Path Finder</a>
              <a href="#skill-roadmaps" style={{ color: "var(--text-secondary)" }}>Skill Roadmaps</a>
              <a href="#my-plan" style={{ color: "var(--text-secondary)" }}>My Plan &amp; Checklist</a>
              <a href="#earning-paths" style={{ color: "var(--text-secondary)" }}>Earning Paths</a>
              <a href="#builders" style={{ color: "var(--text-secondary)" }}>Project &amp; Portfolio Builders</a>
              <a href="#resources" style={{ color: "var(--text-secondary)" }}>Resource Catalog</a>
            </div>
          </div>

          {/* Legal & Standards */}
          <div>
            <h4 style={{ fontSize: "1.05rem", marginBottom: "18px", color: "var(--text)" }}>About &amp; Policies</h4>
            <div style={{ display: "grid", gap: "10px", fontSize: "0.9rem" }}>
              <button
                type="button"
                onClick={() => onOpenLegal("about")}
                style={{ background: "none", border: "none", color: "var(--text-secondary)", textAlign: "left", cursor: "pointer", fontSize: "inherit", fontFamily: "inherit" }}
              >
                About SkillSprint
              </button>
              <button
                type="button"
                onClick={() => onOpenLegal("privacy")}
                style={{ background: "none", border: "none", color: "var(--text-secondary)", textAlign: "left", cursor: "pointer", fontSize: "inherit", fontFamily: "inherit" }}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => onOpenLegal("terms")}
                style={{ background: "none", border: "none", color: "var(--text-secondary)", textAlign: "left", cursor: "pointer", fontSize: "inherit", fontFamily: "inherit" }}
              >
                Terms of Use
              </button>
              <button
                type="button"
                onClick={() => onOpenLegal("affiliate-disclosure")}
                style={{ background: "none", border: "none", color: "var(--text-secondary)", textAlign: "left", cursor: "pointer", fontSize: "inherit", fontFamily: "inherit" }}
              >
                Affiliate Disclosure
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
        >
          <span>© 2026 SkillSprint. Guidance is educational; outcomes and income are never guaranteed.</span>
          <span>Crafted with React, Django REST Framework, and PostgreSQL.</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}
