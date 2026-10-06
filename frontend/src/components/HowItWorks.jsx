import React from "react";

const steps = [
  {
    num: "01",
    phase: "TRIAL",
    title: "Try a Career (Day 0)",
    desc: "Realistic 1-day workplace simulation. Review actual PRs, triage simulated pager incidents, and audit production schemas before committing.",
    footer: "4-Hour Rapid Sandbox",
    footerColor: "var(--tertiary)",
    icon: "explore",
  },
  {
    num: "02",
    phase: "DIAGNOSIS",
    title: "Diagnostic Assessment",
    desc: "Continuous calibration benchmarked against live hiring bars at scale-ups and FAANG clusters. No memorization trivia.",
    footer: "15-Min Micro Test Suites",
    footerColor: "var(--on-surface)",
    footerIconColor: "var(--primary)",
    icon: "analytics",
  },
  {
    num: "03",
    phase: "PINPOINT",
    title: "Skill Gap Analysis",
    desc: "Pinpoints exact capability deficits: query execution plans, thread locks, race conditions, or asynchronous exception boundaries.",
    footer: "Automated Delta Profiling",
    footerColor: "var(--error)",
    icon: "troubleshoot",
  },
  {
    num: "04",
    phase: "SYNTHESIS",
    title: "Personalized Roadmap",
    desc: "Dynamic dependency graph recomputes after each execution pass. Skips content you already master, compressing study time by 60%.",
    footer: "Adaptive DAG Dispatcher",
    footerColor: "var(--primary)",
    icon: "route",
  },
  {
    num: "05",
    phase: "REPETITION",
    title: "Interactive Sprints",
    desc: "20 to 30-minute high-focus coding missions. Integrated Monaco IDE, hot reload testing, and instantaneous stack trace telemetry.",
    footer: "Daily Focused Sprints",
    footerColor: "var(--tertiary)",
    icon: "code_blocks",
  },
  {
    num: "06",
    phase: "FABRICATION",
    title: "Project Lab",
    desc: "Build production architectures. Real PR reviews, GitHub action workflows, load-testing harness passes, and memory leak analysis.",
    footer: "100% Code Coverage Bars",
    footerColor: "var(--on-surface)",
    footerIconColor: "var(--primary)",
    icon: "terminal",
  },
  {
    num: "07",
    phase: "PRESSURE",
    title: "Live Simulation Arena",
    desc: "Survive simulated P1 production outages, database connection locks under load, and emergency architecture mitigation runbooks.",
    footer: "Live P1 Chaos Engineering",
    footerColor: "var(--error)",
    icon: "crisis_alert",
  },
  {
    num: "08",
    phase: "CERTIFICATION",
    title: "Public Skill Passport",
    desc: "Cryptographic verification profile showcasing real commit hashes, test suite passing assertions, and architecture trade-off essays.",
    footer: "SHA-256 Public Proof Link",
    footerColor: "var(--tertiary)",
    icon: "badge",
  },
];

export default function Pipeline() {
  return (
    <section
      id="roadmaps"
      style={{
        width: "100%",
        background: "var(--surface)",
        padding: "64px 0",
        borderBottom: "1px solid var(--outline-variant)",
      }}
    >
      <div
        className="ss-container"
        style={{ display: "flex", flexDirection: "column", gap: 32 }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
            borderBottom: "1px solid var(--outline-variant)",
            paddingBottom: 24,
          }}
        >
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: 4 }}>
              Algorithmic Formulation
            </span>
            <h2
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                fontWeight: 700,
                color: "var(--on-surface)",
              }}
            >
              The 8-Stage Verification Pipeline
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--on-surface-variant)",
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            A continuous execution methodology engineered to transition engineers from
            diagnostic discovery to cryptographically proven technical authority.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {steps.map((step) => (
            <div key={step.num} className="pipeline-card">
              {/* Card Top */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--primary)",
                      fontWeight: 700,
                    }}
                  >
                    {step.num} // {step.phase}
                  </span>
                  <span
                    className={`material-symbols-outlined pipeline-icon`}
                    style={{ fontSize: 18 }}
                  >
                    {step.icon}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--on-surface)",
                    marginTop: 4,
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6875rem",
                    color: "var(--on-surface-variant)",
                    lineHeight: 1.65,
                  }}
                >
                  {step.desc}
                </p>
              </div>

              {/* Card Footer */}
              <div
                style={{
                  paddingTop: 12,
                  marginTop: 12,
                  borderTop: "1px solid rgba(226,232,240,0.6)",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  color: step.footerColor,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                  {step.num === "02" || step.num === "06" ? "speed" : "check_circle"}
                </span>
                {step.footer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
