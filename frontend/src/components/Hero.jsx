import React, { useState } from "react";

const roles = [
  {
    id: "dist",
    track: "Tier-1 Track",
    title: "Distributed Systems",
    score: 74,
  },
  {
    id: "full",
    track: "Enterprise Track",
    title: "Full-Stack Architect",
    score: 81,
  },
  {
    id: "sre",
    track: "Reliability Track",
    title: "Platform & SRE",
    score: 68,
  },
];

const capabilities = [
  {
    label: "Systems Architecture & APIs",
    pct: 88,
    color: "var(--primary)",
    textColor: "var(--primary)",
    suffix: "",
  },
  {
    label: "Concurrency & Multi-Threading",
    pct: 62,
    color: "var(--error)",
    textColor: "var(--error)",
    suffix: " (Gap Alert)",
  },
  {
    label: "Data Integrity & Transaction Isolation",
    pct: 79,
    color: "var(--tertiary)",
    textColor: "var(--tertiary)",
    suffix: "",
  },
  {
    label: "Automated Testing & CI Execution",
    pct: 84,
    color: "var(--primary)",
    textColor: "var(--primary)",
    suffix: "",
  },
];

export default function Hero() {
  const [activeRole, setActiveRole] = useState("dist");
  const currentRole = roles.find((r) => r.id === activeRole);
  const score = currentRole.score;
  const circumference = 2 * Math.PI * 15.9155;
  const dashArray = `${score}, 100`;

  return (
    <section
      style={{
        width: "100%",
        padding: "48px 0 64px",
        borderBottom: "1px solid var(--outline-variant)",
        background: "linear-gradient(180deg, #ffffff 0%, var(--surface-subtle) 100%)",
      }}
    >
      <div
        className="ss-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 40,
          alignItems: "start",
        }}
      >
        {/* ── Left Column ─────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            animation: "fade-in-up 0.6s ease forwards",
          }}
        >
          {/* Eyebrow Badge */}
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              alignItems: "center",
              gap: 8,
              padding: "4px 12px",
              background: "var(--surface)",
              border: "1px solid var(--outline-variant)",
              borderRadius: 9999,
              fontFamily: "var(--font-label)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--on-surface-variant)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--primary)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            Production Verification Engine • Zero Multiple Choice
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h1
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "var(--on-surface)",
                letterSpacing: "-0.02em",
                lineHeight: 1.18,
              }}
            >
              Build the skills for the career you{" "}
              <span
                style={{
                  color: "var(--primary)",
                  fontStyle: "italic",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(51,102,204,0.4)",
                  textDecorationThickness: 2,
                  textUnderlineOffset: 8,
                }}
              >
                actually want
              </span>
              .
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--on-surface-variant)",
                maxWidth: 560,
                lineHeight: 1.75,
                paddingTop: 4,
              }}
            >
              The Digital Career Simulator: Try real engineering workflows, detect exact
              skill gaps with micro-benchmarks, execute hands-on sprints, and generate
              cryptographically verified proof of competence.
            </p>
          </div>

          {/* Role Selector Panel */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--outline-variant)",
              borderRadius: 8,
              padding: 20,
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Panel Header */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 4,
                borderBottom: "1px solid var(--outline-variant)",
                paddingBottom: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--outline)",
                }}
              >
                Select Target Career Benchmark
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--primary)",
                  fontWeight: 500,
                }}
              >
                3,420 Senior Roles Indexed
              </span>
            </div>

            {/* Role Buttons */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 10,
              }}
            >
              {roles.map((role) => {
                const isActive = activeRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveRole(role.id)}
                    style={{
                      textAlign: "left",
                      padding: 12,
                      borderRadius: 4,
                      border: isActive
                        ? "1px solid var(--primary)"
                        : "1px solid var(--outline-variant)",
                      background: isActive
                        ? "rgba(231, 235, 255, 0.4)"
                        : "var(--surface)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-label)",
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: isActive ? "var(--primary)" : "var(--outline)",
                        display: "block",
                      }}
                    >
                      {role.track}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--on-surface)",
                        display: "block",
                        marginTop: 2,
                      }}
                    >
                      {role.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 12,
                paddingTop: 4,
              }}
            >
              <a href="#assessment-arena" className="btn-primary">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  terminal
                </span>
                Run 15-Min Career Assessment
              </a>
              <a href="#skill-graph" className="btn-outline">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16, color: "var(--primary)" }}
                >
                  hub
                </span>
                Inspect Live Skill Graph
              </a>
            </div>
          </div>

          {/* Trust Signifiers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              paddingTop: 4,
              borderTop: "1px solid rgba(226,232,240,0.6)",
            }}
          >
            {[
              {
                stat: "100% Deterministic",
                sub: "Judge0 test harness",
                color: "var(--primary)",
              },
              {
                stat: "Zero Trivia",
                sub: "Production diffs only",
                color: "var(--tertiary)",
              },
              {
                stat: "SHA-256 Proof",
                sub: "On-chain skill passports",
                color: "var(--on-surface)",
              },
            ].map(({ stat, sub, color }) => (
              <div key={stat} style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color,
                  }}
                >
                  {stat}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6875rem",
                    color: "var(--outline)",
                    marginTop: 2,
                  }}
                >
                  {sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Column: Career Twin Widget ───────────── */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--outline-variant)",
            borderRadius: 8,
            padding: 24,
            boxShadow: "var(--shadow-md)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            animation: "slide-in-right 0.6s 0.1s ease both",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--outline-variant)",
              paddingBottom: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--primary)",
                  display: "inline-block",
                  animation: "ping 1.2s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--on-surface)",
                }}
              >
                Career Twin Telemetry
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--outline)",
              }}
            >
              NODE #7890-US-E
            </span>
          </div>

          {/* Score Card */}
          <div
            style={{
              background: "var(--surface-subtle)",
              border: "1px solid var(--outline-variant)",
              borderRadius: 6,
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--outline)",
                }}
              >
                Benchmark Readiness
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 6,
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                    letterSpacing: "-0.03em",
                    transition: "all 0.3s ease",
                  }}
                >
                  {score}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--outline)",
                    fontWeight: 600,
                  }}
                >
                  / 100 PTS
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6875rem",
                  color: "var(--tertiary)",
                  fontWeight: 600,
                  marginTop: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                  trending_up
                </span>
                Top 14% of Indexed Candidates
              </span>
            </div>

            {/* Circular Progress */}
            <div
              style={{
                width: 80,
                height: 80,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 36 36"
                style={{ transform: "rotate(-90deg)" }}
              >
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--surface-container-high)"
                  strokeWidth="3.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3.5"
                  strokeDasharray={dashArray}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dasharray 0.5s ease" }}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "var(--on-surface)",
                  }}
                >
                  L5
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.5rem",
                    color: "var(--outline)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Ready
                </span>
              </div>
            </div>
          </div>

          {/* Capability Bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {capabilities.map(({ label, pct, color, textColor, suffix }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                  }}
                >
                  <span style={{ fontWeight: 500, color: "var(--on-surface)" }}>{label}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: textColor }}>
                    {pct}%{suffix}
                  </span>
                </div>
                <div className="progress-track" style={{ height: 6 }}>
                  <div
                    className="progress-fill"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Next Sprint Card */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--outline-variant)",
              borderRadius: 6,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.6875rem",
                  color: "var(--tertiary)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 15 }}>bolt</span>
                Next Prescribed Sprint
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--outline)",
                }}
              >
                EST. 25 MIN
              </span>
            </div>
            <h4
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--on-surface)",
                lineHeight: 1.4,
              }}
            >
              Sprint 04: Refactor In-Memory Cache to Redis with Cache-Aside Pattern
            </h4>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                color: "var(--on-surface-variant)",
                lineHeight: 1.6,
              }}
            >
              Resolves concurrency contention in microservice authentication gateway.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 8,
                borderTop: "1px solid rgba(226,232,240,0.6)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--outline)",
                  fontWeight: 500,
                }}
              >
                Impact: +6 Concurrency Pts
              </span>
              <a
                href="#simulator-preview"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  color: "var(--primary)",
                  fontFamily: "var(--font-label)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
              >
                Execute Sprint
                <span className="material-symbols-outlined" style={{ fontSize: 15 }}>
                  chevron_right
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .ss-container > div { grid-template-columns: 7fr 5fr !important; }
        }
      `}</style>
    </section>
  );
}
