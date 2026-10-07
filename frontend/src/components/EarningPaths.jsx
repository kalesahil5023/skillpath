import React from "react";

const features = [
  {
    icon: "verified_user",
    title: "Judge0 Execution Hashes",
    desc: "Every solution run produces a SHA-256 execution certificate certifying you wrote the code.",
  },
  {
    icon: "sync_alt",
    title: "Automatic Public GitHub Synchronization",
    desc: "Completed sprint projects automatically open production-grade PRs on your personal GitHub.",
  },
  {
    icon: "travel_explore",
    title: "Instant Hiring Recruiter Inspection",
    desc: "Recruiters can run your code live inside an ephemeral sandbox straight from your resume link.",
  },
];

const recentArtifacts = [
  { name: "dist-raft-consensus-impl", result: "18/18 Tests (0.84s)" },
  { name: "redis-stream-event-broker", result: "22/22 Tests (1.12s)" },
  { name: "postgres-btree-optimizer", result: "14/14 Tests (0.42s)" },
];

export default function EarningPaths() {
  return (
    <section
      id="passport"
      style={{
        width: "100%",
        padding: "64px 0",
        borderBottom: "1px solid var(--outline-variant)",
        background: "var(--surface-subtle)",
      }}
    >
      <div
        className="ss-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        {/* Left: Evidence Description */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <span className="eyebrow">
            Verifiable Proof vs Fake Diplomas
          </span>
          <h2
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
              fontWeight: 700,
              color: "var(--on-surface)",
              lineHeight: 1.3,
            }}
          >
            The Skill Passport: Cryptographic Proof of Engineering Competence
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--on-surface-variant)",
              lineHeight: 1.7,
            }}
          >
            Stop showing PDFs that prove nothing. SkillSprint records every code diff,
            every passing unit test suite, and every system benchmark into an immutable
            public ledger.
          </p>

          {/* Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 8 }}>
            {features.map(({ icon, title, desc }) => (
              <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span
                  className="material-symbols-outlined"
                  style={{ color: "var(--primary)", fontSize: 20, marginTop: 2, flexShrink: 0 }}
                >
                  {icon}
                </span>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-headline)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--on-surface)",
                      marginBottom: 4,
                    }}
                  >
                    {title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6875rem",
                      color: "var(--on-surface-variant)",
                      lineHeight: 1.6,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ paddingTop: 8 }}>
            <a
              href="#"
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
              View Sample Verifiable Passport (Alex Chen)
              <span className="material-symbols-outlined" style={{ fontSize: 15 }}>
                open_in_new
              </span>
            </a>
          </div>
        </div>

        {/* Right: Passport Card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--outline-variant)",
            borderRadius: 8,
            padding: 24,
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Passport Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--outline-variant)",
                paddingBottom: 16,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 4,
                    background: "var(--primary)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    flexShrink: 0,
                  }}
                >
                  AC
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-headline)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--on-surface)",
                    }}
                  >
                    Alex Chen
                  </h4>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--outline)",
                    }}
                  >
                    @alex_chen.sprint • L5 Backend Ready
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "2px 8px",
                    background: "var(--tertiary-container)",
                    color: "var(--tertiary)",
                    borderRadius: 4,
                  }}
                >
                  VERIFIED TALENT
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--outline)",
                    marginTop: 4,
                    fontWeight: 500,
                  }}
                >
                  ID: #0x8F9A42
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                {
                  label: "Shipped Sprints",
                  value: "14 Modules",
                  sub: "100% Tests Passing",
                  subColor: "var(--tertiary)",
                },
                {
                  label: "Peer Architecture Score",
                  value: "Top 5%",
                  sub: "Evaluated by 28 Staff Engs",
                  valueColor: "var(--primary)",
                  subColor: "var(--outline)",
                },
              ].map(({ label, value, sub, valueColor, subColor }) => (
                <div
                  key={label}
                  style={{
                    background: "var(--surface-subtle)",
                    border: "1px solid var(--outline-variant)",
                    borderRadius: 4,
                    padding: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-label)",
                      fontSize: "0.625rem",
                      color: "var(--outline)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-headline)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: valueColor || "var(--on-surface)",
                    }}
                  >
                    {value}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 500,
                      color: subColor || "var(--outline)",
                    }}
                  >
                    {sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Cryptographic Seal */}
            <div
              style={{
                padding: 12,
                background: "var(--surface-subtle)",
                border: "1px solid var(--outline-variant)",
                borderRadius: 4,
                fontFamily: "var(--font-mono)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 4,
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: "var(--outline)",
                }}
              >
                <span>PROOF SIGNATURE</span>
                <span>SHA-256 ENCRYPTED</span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  color: "var(--on-surface)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
              </div>
            </div>

            {/* Recent Artifacts */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                paddingTop: 4,
                borderTop: "1px solid rgba(226,232,240,0.6)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.625rem",
                  color: "var(--outline)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Recently Verified Code Invocations
              </span>
              {recentArtifacts.map(({ name, result }, i) => (
                <div
                  key={name}
                  className="passport-row"
                  style={{
                    borderBottom:
                      i < recentArtifacts.length - 1
                        ? "1px solid rgba(226,232,240,0.5)"
                        : "none",
                  }}
                >
                  <span style={{ color: "var(--on-surface)" }}>{name}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      color: "var(--tertiary)",
                    }}
                  >
                    {result}
                  </span>
                </div>
              ))}
            </div>

            {/* Issued By */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 8,
                borderTop: "1px solid var(--outline-variant)",
                fontFamily: "var(--font-label)",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--outline)",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              <span>ISSUED BY SKILLSPRINT ENGINE VERIFICATION CLUSTER</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                LIVE PUBLIC PASS
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          #passport > .ss-container {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
