import React from "react";
import { BookOpen, Code2, Hammer, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const pillars = [
    {
      number: "01",
      title: "Learn",
      tagline: "Structured Foundational Paths",
      description:
        "Skip tutorial paralysis. Follow guided curricula created by senior engineers that teach core software engineering, data systems, and system design step-by-step.",
      icon: BookOpen,
      badgeColor: "#059669",
      bgLight: "#ecfdf5",
      highlights: ["No fluff or filler theory", "Production-tested code patterns", "Interactive syntax walkthroughs"],
    },
    {
      number: "02",
      title: "Practice",
      tagline: "Active Problem-Solving",
      description:
        "Knowledge sticks when applied. Solve graded coding problems, interactive algorithmic challenges, system assessments, and technical interview simulations.",
      icon: Code2,
      badgeColor: "#2563eb",
      bgLight: "#eff6ff",
      highlights: ["1,800+ curated DSA challenges", "Immediate test suite execution", "Clear complexity explanations"],
    },
    {
      number: "03",
      title: "Build",
      tagline: "Production-Grade Projects",
      description:
        "Turn theoretical knowledge into tangible proof-of-work. Generate client-ready briefs, write clean modular code, and deploy real applications with databases and auth.",
      icon: Hammer,
      badgeColor: "#d97706",
      bgLight: "#fffbeb",
      highlights: ["Full-stack architectures", "PostgreSQL database models", "Automated case study exports"],
    },
    {
      number: "04",
      title: "Grow",
      tagline: "Continuous Career Readiness",
      description:
        "Track milestone mastery across 30-day roadmaps, measure streak velocity, prepare structured interview talk-tracks, and launch your software career with confidence.",
      icon: TrendingUp,
      badgeColor: "#7c3aed",
      bgLight: "#f5f3ff",
      highlights: ["Cloud-synced checklists", "Resume-ready project writeups", "Targeted career roadmaps"],
    },
  ];

  return (
    <section id="how-it-works" className="section-spacing" style={{ backgroundColor: "var(--bg-canvas)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <TrendingUp size={13} />
            <span>The SkillSprint Model</span>
          </div>
          <h2>The Four Pillars of Skill Mastery</h2>
          <p>
            Most platforms make you watch videos. SkillSprint is built on a four-stage loop designed to help you actually understand, practice, build, and grow.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
          className="pillars-grid"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "14px",
                  backgroundColor: "#ffffff",
                  position: "relative",
                }}
              >
                {/* Number Watermark & Icon */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      backgroundColor: pillar.bgLight,
                      color: pillar.badgeColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={24} />
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.75rem",
                      fontWeight: 800,
                      color: "#cbd5e1",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {pillar.number}
                  </span>
                </div>

                {/* Pillar Header */}
                <div style={{ marginBottom: "14px" }}>
                  <h3
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      marginBottom: "4px",
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: pillar.badgeColor,
                      fontFamily: "var(--font-heading)",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {pillar.tagline}
                  </div>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                  }}
                >
                  {pillar.description}
                </p>

                {/* Highlights List */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "20px",
                    borderTop: "1px solid var(--border-subtle)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "9px",
                  }}
                >
                  {pillar.highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "0.82rem",
                        color: "var(--text-secondary)",
                        fontWeight: 500,
                      }}
                    >
                      <CheckCircle size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
