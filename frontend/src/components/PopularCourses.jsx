import React from "react";

const scenarios = [
  {
    badge: "P1 Outage Simulation",
    badgeColor: "var(--error)",
    badgeBg: "var(--error-container)",
    time: "45 MINS",
    title: "Connection Pool Exhaustion at 10,000 RPS",
    desc: "The primary checkout API is returning 503s under burst flash sale traffic. Trace connection leaks in pg-pool, adjust max active pools, and implement exponential backoff retry buffers.",
    tags: ["Node.js", "PostgreSQL", "k6 Load Gen"],
    levelIcon: "warning",
    levelLabel: "L5 Systems Architect",
    levelColor: "var(--error)",
  },
  {
    badge: "Financial Systems",
    badgeColor: "var(--on-primary-container)",
    badgeBg: "var(--primary-container)",
    time: "30 MINS",
    title: "Idempotent Stripe Webhook Ingestion Engine",
    desc: "Incoming events are duplicated during network retries, causing double-billing transactions. Build an atomic Redis mutex with deterministic idempotency keys and SQL transactions.",
    tags: ["TypeScript", "Redis Mutex", "ACID Checks"],
    levelIcon: "check_circle",
    levelLabel: "Intermediate Full-Stack",
    levelColor: "var(--primary)",
  },
  {
    badge: "Platform Engineering",
    badgeColor: "var(--tertiary)",
    badgeBg: "var(--tertiary-container)",
    time: "35 MINS",
    title: "Zero-Downtime Blue/Green Deployment Rollback",
    desc: "A bad schema migration in canary release cluster v2.4.1 triggers a spike in 500 error rates. Inspect NGINX upstream route configs, isolate the faulty pods, and execute instant hot-switch rollback.",
    tags: ["Docker OCI", "NGINX Upstream", "Prometheus"],
    levelIcon: "verified",
    levelLabel: "DevOps & Platform",
    levelColor: "var(--tertiary)",
  },
];

const terminalLines = [
  {
    text: "$ pytest tests/test_concurrency_race.py -v --benchmark-enable",
    color: "#94a3b8",
  },
  {
    text: "============================= test session starts ==============================",
    color: "#475569",
  },
  {
    text: "tests/test_concurrency_race.py::test_idempotency_parallel_threads",
    suffix: "PASSED [ 28%]",
    suffixColor: "#34d399",
  },
  {
    text: "tests/test_concurrency_race.py::test_connection_pool_under_limit",
    suffix: "PASSED [ 57%]",
    suffixColor: "#34d399",
  },
  {
    text: "tests/test_concurrency_race.py::test_failover_recovery_latency",
    suffix: "PASSED [ 85%]",
    suffixColor: "#38bdf8",
  },
  {
    text: "tests/test_concurrency_race.py::test_deadlock_prevention_timeout",
    suffix: "PASSED [100%]",
    suffixColor: "#34d399",
  },
  {
    text: "====== 4 passed, 0 failed in 1.48s | Memory Peak: 42.1 MB | SHA-256 Validated ======",
    color: "#34d399",
    bold: true,
  },
];

export default function PopularCourses() {
  return (
    <section
      id="simulator-preview"
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
        {/* Header */}
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
              Realistic Hands-On Testbeds
            </span>
            <h2
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                fontWeight: 700,
                color: "var(--on-surface)",
              }}
            >
              Career Simulation Arena
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
            Not generic algorithm leetcode. Solve real engineering challenges straight
            from high-scale engineering sprint backlogs.
          </p>
        </div>

        {/* Scenario Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {scenarios.map((s) => (
            <div
              key={s.title}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--outline-variant)",
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
                transition: "box-shadow 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
                e.currentTarget.style.borderColor = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.borderColor = "var(--outline-variant)";
              }}
            >
              {/* Card Body */}
              <div
                style={{
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  flex: 1,
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
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      padding: "2px 8px",
                      background: s.badgeBg,
                      color: s.badgeColor,
                      borderRadius: 4,
                    }}
                  >
                    {s.badge}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--outline)",
                      fontWeight: 500,
                    }}
                  >
                    {s.time}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "0.9375rem",
                    fontWeight: 700,
                    color: "var(--on-surface)",
                    lineHeight: 1.35,
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6875rem",
                    color: "var(--on-surface-variant)",
                    lineHeight: 1.65,
                  }}
                >
                  {s.desc}
                </p>

                {/* Tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    paddingTop: 4,
                  }}
                >
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "2px 8px",
                        background: "var(--surface-subtle)",
                        border: "1px solid var(--outline-variant)",
                        borderRadius: 4,
                        color: "var(--on-surface-variant)",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div
                style={{
                  padding: "12px 20px",
                  background: "var(--surface-subtle)",
                  borderTop: "1px solid var(--outline-variant)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: s.levelColor,
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}>
                    {s.levelIcon}
                  </span>
                  {s.levelLabel}
                </div>
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    background: "var(--surface)",
                    border: "1px solid var(--outline-variant)",
                    color: "var(--on-surface)",
                    padding: "4px 12px",
                    borderRadius: 4,
                    fontFamily: "var(--font-label)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "border-color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--outline-variant)")
                  }
                >
                  Start Run
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Execution Preview */}
        <div className="terminal-window">
          <div className="terminal-topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div className="terminal-dots">
                <span
                  className="terminal-dot"
                  style={{ background: "#f87171" }}
                />
                <span
                  className="terminal-dot"
                  style={{ background: "#fbbf24" }}
                />
                <span
                  className="terminal-dot"
                  style={{ background: "#34d399" }}
                />
              </div>
              <span
                style={{
                  marginLeft: 8,
                  fontFamily: "var(--font-label)",
                  fontSize: "0.6875rem",
                  color: "#cbd5e1",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                }}
              >
                Sandbox Runner Terminal (Judge0 Core #339)
              </span>
            </div>
            <span
              style={{
                color: "#34d399",
                fontWeight: 700,
                fontSize: "0.6875rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Active Test Harness
            </span>
          </div>

          <div className="terminal-body">
            {terminalLines.map((line, i) => (
              <div
                key={i}
                style={{
                  color: line.color || "#e2e8f0",
                  fontWeight: line.bold ? 600 : 400,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <span>{line.text}</span>
                {line.suffix && (
                  <span style={{ color: line.suffixColor, fontWeight: 700 }}>
                    {line.suffix}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
