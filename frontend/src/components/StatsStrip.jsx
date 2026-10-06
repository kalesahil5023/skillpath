import React from "react";

const layers = [
  {
    icon: "terminal",
    color: "var(--primary)",
    layer: "LAYER 01",
    title: "Monaco Client Engine",
    desc: "Next.js and WebAssembly-backed browser IDE with syntax tree introspection, linting, and local mock testing.",
  },
  {
    icon: "memory",
    color: "var(--tertiary)",
    layer: "LAYER 02",
    title: "Judge0 Sandbox Cluster",
    desc: "Isolated Docker containers execute code against multi-threaded race condition tests, memory limits, and timeouts.",
  },
  {
    icon: "database",
    color: "var(--on-surface)",
    layer: "LAYER 03",
    title: "Real Postgres Schemas",
    desc: "Every learner interacts with live, isolated database instances populated with millions of synthetic production records.",
  },
  {
    icon: "lock",
    color: "var(--primary-dark)",
    layer: "LAYER 04",
    title: "Proof Verification Vault",
    desc: "Outputs are checked for regression vulnerabilities and sealed with SHA-256 hashes for verifiable recruiter review.",
  },
];

const compareRows = [
  {
    dimension: "Learning Medium",
    traditional: "80+ hours of passive video watching",
    skillsprint: "100% active code execution & system debugging",
  },
  {
    dimension: "Assessment Method",
    traditional: "Multiple-choice questions & toy quizzes",
    skillsprint: "Deterministic test suites, memory benchmarks & chaos drills",
  },
  {
    dimension: "Proof of Capability",
    traditional: "Unverifiable PDF certificates anyone can screenshot",
    skillsprint: "Public Skill Passport backed by git commits & SHA hashes",
  },
  {
    dimension: "Career Calibration",
    traditional: "Generic unstructured curriculum",
    skillsprint: "Personalized DAG roadmap targeting verified hiring bars",
  },
];

export default function StatsStrip() {
  return (
    <section
      id="project-lab"
      style={{
        width: "100%",
        background: "var(--surface)",
        padding: "64px 0",
        borderBottom: "1px solid var(--outline-variant)",
      }}
    >
      <div
        className="ss-container"
        style={{ display: "flex", flexDirection: "column", gap: 40 }}
      >
        {/* Section Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 600,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span className="eyebrow" style={{ textAlign: "center" }}>Technical Authenticity</span>
          <h2
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
              fontWeight: 700,
              color: "var(--on-surface)",
            }}
          >
            Architected for Extreme Engineering Rigor
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--on-surface-variant)",
              lineHeight: 1.65,
            }}
          >
            SkillSprint is not a video platform with quiz cards. It is an end-to-end cloud
            workstation configured for deterministic capability verification.
          </p>
        </div>

        {/* Architecture Layers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {layers.map((layer) => (
            <div
              key={layer.layer}
              style={{
                background: "var(--surface-subtle)",
                border: "1px solid var(--outline-variant)",
                borderRadius: 8,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 10,
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
                  className="material-symbols-outlined"
                  style={{ fontSize: 22, color: layer.color }}
                >
                  {layer.icon}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    color: "var(--outline)",
                  }}
                >
                  {layer.layer}
                </span>
              </div>
              <h4
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "var(--on-surface)",
                }}
              >
                {layer.title}
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6875rem",
                  color: "var(--on-surface-variant)",
                  lineHeight: 1.65,
                }}
              >
                {layer.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--outline-variant)",
            borderRadius: 8,
            padding: 24,
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "var(--on-surface)",
            }}
          >
            Operational Comparison: Video Tutorials vs Digital Simulation
          </h3>

          <div style={{ overflowX: "auto" }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Evaluation Dimension</th>
                  <th>Traditional Tutorial Platforms</th>
                  <th style={{ color: "var(--primary)", fontWeight: 700 }}>
                    SkillSprint Simulator
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map(({ dimension, traditional, skillsprint }) => (
                  <tr key={dimension}>
                    <td
                      style={{
                        fontWeight: 600,
                        color: "var(--on-surface)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.75rem",
                      }}
                    >
                      {dimension}
                    </td>
                    <td
                      style={{
                        color: "var(--on-surface-variant)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.75rem",
                      }}
                    >
                      {traditional}
                    </td>
                    <td
                      style={{
                        color: "var(--tertiary)",
                        fontWeight: 600,
                        fontFamily: "var(--font-body)",
                        fontSize: "0.75rem",
                      }}
                    >
                      {skillsprint}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
