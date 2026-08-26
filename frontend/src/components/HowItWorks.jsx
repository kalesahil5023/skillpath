import React from "react";
import { Search, GraduationCap, LayoutGrid, Briefcase } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Discover",
      desc: "Complete the 3-question Path Finder to identify a legitimate path matching your skills, time, and goals.",
      color: "var(--primary)",
    },
    {
      num: "02",
      icon: GraduationCap,
      title: "Learn",
      desc: "Follow structured, milestone-based 30-day skill roadmaps designed for real-world application.",
      color: "var(--secondary)",
    },
    {
      num: "03",
      icon: LayoutGrid,
      title: "Build",
      desc: "Use the Project & Portfolio Builders to craft proof-of-work case studies that clients respect.",
      color: "var(--accent)",
    },
    {
      num: "04",
      icon: Briefcase,
      title: "Earn",
      desc: "Apply to vetted freelance projects, remote job positions, or audience monetization with realistic expectations.",
      color: "var(--warning)",
    },
  ];

  return (
    <section className="section-spacing">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <span>Structured Progression</span>
          </div>
          <h2>Make steady progress, one deliberate step at a time.</h2>
          <p>
            Avoid the overwhelm of disconnected YouTube tutorials and false promises. SkillSprint organizes your learning into a logical four-phase pipeline.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: "32px 28px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "24px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.2rem",
                      color: step.color,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {step.num}
                  </span>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: `rgba(255, 255, 255, 0.04)`,
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: step.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                </div>

                <h3 style={{ marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
