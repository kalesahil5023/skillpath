import React, { useState } from "react";
import { ShieldCheck, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Footer({ onOpenLegal }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      style={{
        backgroundColor: "#ffffff",
        borderTop: "1px solid var(--border)",
        padding: "80px 0 40px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1.3fr",
            gap: "48px",
            marginBottom: "56px",
          }}
          className="footer-grid"
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  backgroundColor: "var(--primary)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  boxShadow: "0 2px 6px rgba(5, 150, 105, 0.25)",
                }}
              >
                S
              </div>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                }}
              >
                Skill<span style={{ color: "var(--primary)" }}>Sprint</span>
              </span>
            </div>

            <p style={{ maxWidth: "340px", fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
              A serious, modern learning platform combining structured curricula, algorithmic practice, and production portfolio projects to launch sustainable careers.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--primary-text)", fontSize: "0.84rem", fontWeight: 600 }}>
              <ShieldCheck size={16} color="var(--primary)" />
              <span>React 18 + Django 5 + PostgreSQL Cloud Architecture</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "18px", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Platform
            </h4>
            <div style={{ display: "grid", gap: "11px", fontSize: "0.9rem" }}>
              <a href="#popular-courses" style={{ color: "var(--text-muted)", transition: "color 0.15s" }} onMouseEnter={(e) => (e.target.style.color = "var(--primary)")} onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}>
                Courses
              </a>
              <a href="#path-finder" style={{ color: "var(--text-muted)", transition: "color 0.15s" }} onMouseEnter={(e) => (e.target.style.color = "var(--primary)")} onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}>
                Practice &amp; PathFinder
              </a>
              <a href="#skill-roadmaps" style={{ color: "var(--text-muted)", transition: "color 0.15s" }} onMouseEnter={(e) => (e.target.style.color = "var(--primary)")} onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}>
                Milestone Roadmaps
              </a>
              <a href="#my-plan" style={{ color: "var(--text-muted)", transition: "color 0.15s" }} onMouseEnter={(e) => (e.target.style.color = "var(--primary)")} onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}>
                7-Day Starter Plan
              </a>
              <a href="#builders" style={{ color: "var(--text-muted)", transition: "color 0.15s" }} onMouseEnter={(e) => (e.target.style.color = "var(--primary)")} onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}>
                Project &amp; Portfolio Builder
              </a>
            </div>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "18px", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Company &amp; Legal
            </h4>
            <div style={{ display: "grid", gap: "11px", fontSize: "0.9rem" }}>
              <button
                type="button"
                onClick={() => onOpenLegal("about")}
                style={{ background: "none", border: "none", color: "var(--text-muted)", textAlign: "left", cursor: "pointer", fontSize: "inherit", fontFamily: "inherit" }}
              >
                About SkillSprint
              </button>
              <button
                type="button"
                onClick={() => onOpenLegal("privacy")}
                style={{ background: "none", border: "none", color: "var(--text-muted)", textAlign: "left", cursor: "pointer", fontSize: "inherit", fontFamily: "inherit" }}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => onOpenLegal("terms")}
                style={{ background: "none", border: "none", color: "var(--text-muted)", textAlign: "left", cursor: "pointer", fontSize: "inherit", fontFamily: "inherit" }}
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={() => onOpenLegal("affiliate")}
                style={{ background: "none", border: "none", color: "var(--text-muted)", textAlign: "left", cursor: "pointer", fontSize: "inherit", fontFamily: "inherit" }}
              >
                FTC Transparency Standards
              </button>
            </div>
          </div>

          {/* Newsletter: Stay in the Loop */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "18px", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Stay in the loop
            </h4>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "14px" }}>
              Receive weekly curated engineering challenges, case study blueprints, and hiring updates.
            </p>

            {subscribed ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  background: "var(--primary-light)",
                  border: "1px solid var(--primary-border)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--primary-text)",
                  fontSize: "0.86rem",
                  fontWeight: 600,
                }}
              >
                <CheckCircle2 size={16} />
                <span>You're subscribed! Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "8px" }}>
                <input
                  type="email"
                  placeholder="name@workemail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  style={{ padding: "9px 12px", fontSize: "0.88rem" }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: "9px 14px", flexShrink: 0 }}
                  title="Subscribe"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: "28px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.84rem",
            color: "var(--text-muted)",
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} SkillSprint Global Inc. All rights reserved.
          </div>
          <div>
            Domain: <strong style={{ color: "var(--text-primary)" }}>skillsprint.online</strong>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
