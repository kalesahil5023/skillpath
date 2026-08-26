import React from "react";
import { ArrowRight, BookOpen, Sparkles, Code2, Palette, TrendingUp, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <header
      id="home"
      style={{
        paddingTop: "150px",
        paddingBottom: "80px",
        minHeight: "750px",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div className="container">
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            alignItems: "center",
            gap: "56px",
          }}
        >
          {/* Left Column: Copy & Actions */}
          <div>
            <div className="eyebrow">
              <Sparkles size={14} />
              <span>A Credible, Practical Online Career Blueprint</span>
            </div>

            <h1 style={{ marginBottom: "22px" }}>
              Turn Your Skills <br />
              Into <span className="gradient-text">Sustainable Income</span>.
            </h1>

            <p style={{ fontSize: "1.18rem", lineHeight: 1.6, maxWidth: "560px", marginBottom: "34px" }}>
              Discover the right earning direction based on your available time and goals. Follow step-by-step 30-day roadmaps, construct real portfolio work, and access verified, legitimate opportunities.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
              <a href="#path-finder" className="btn btn-primary" style={{ padding: "14px 26px" }}>
                <span>Find My Earning Path</span>
                <ArrowRight size={18} />
              </a>
              <a href="#skill-roadmaps" className="btn btn-secondary" style={{ padding: "14px 24px" }}>
                <BookOpen size={18} />
                <span>Explore Skill Roadmaps</span>
              </a>
            </div>

            {/* Credibility highlights */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "24px",
                paddingTop: "24px",
                borderTop: "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                <ShieldCheck size={18} color="var(--accent)" />
                <span>Zero get-rich-quick claims</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                <ShieldCheck size={18} color="var(--primary)" />
                <span>100% Free & Transparent</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                <ShieldCheck size={18} color="var(--secondary)" />
                <span>PostgreSQL Cloud Sync</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Visual with Orb & Orbitals */}
          <div
            style={{
              position: "relative",
              height: "440px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Background Glow */}
            <div
              style={{
                position: "absolute",
                width: "360px",
                height: "360px",
                background: "radial-gradient(circle, rgba(115,215,255,0.18) 0%, rgba(139,124,255,0.1) 45%, transparent 70%)",
                filter: "blur(40px)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />

            {/* Orbital Rings */}
            <div className="orbital-ring orbital-ring-1" />
            <div className="orbital-ring orbital-ring-2" />

            {/* Central Glowing Orb */}
            <div className="hero-orb" />

            {/* Floating Badge 1: Code */}
            <div
              className="floating-badge"
              style={{
                top: "14%",
                left: "4%",
                animationDelay: "0s",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(115, 215, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary)",
                }}
              >
                <Code2 size={20} />
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "0.95rem" }}>Web Development</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Build & Deploy</span>
              </div>
            </div>

            {/* Floating Badge 2: Design */}
            <div
              className="floating-badge"
              style={{
                top: "22%",
                right: "2%",
                animationDelay: "1.2s",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(139, 124, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--secondary)",
                }}
              >
                <Palette size={20} />
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "0.95rem" }}>Graphic Design</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Create Visuals</span>
              </div>
            </div>

            {/* Floating Badge 3: Growth */}
            <div
              className="floating-badge"
              style={{
                bottom: "12%",
                right: "18%",
                animationDelay: "2.5s",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(77, 225, 178, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                }}
              >
                <TrendingUp size={20} />
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "0.95rem" }}>Earning Paths</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Monetize Skills</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
