import React, { useState } from "react";

const nodeData = {
  consensus: {
    tag: "CRITICAL PREREQUISITE • GAP 38%",
    tagColor: "var(--error)",
    title: "Distributed Consensus & Raft",
    desc: "Your profile indicates strong relational querying, but lacks practical execution in distributed leader elections and log replication under partition splits.",
    deps: ["TCP Sockets", "RPC Layer", "Raft Engine"],
    depColors: ["var(--tertiary)", "var(--primary)", "var(--error)"],
    delta: "-44% vs Target",
    deltaColor: "var(--error)",
    time: "3 Sprints (2.5h)",
  },
  postgres: {
    tag: "MASTERED NODE • 82%",
    tagColor: "var(--primary)",
    title: "PostgreSQL Query Planning & Index Architecture",
    desc: "Mastery verified in indexing strategies, composite B-Trees, and analyzing EXPLAIN ANALYZE query buffers under heavy write loads.",
    deps: ["Schema Design", "B-Tree Index", "EXPLAIN Plans"],
    depColors: ["var(--tertiary)", "var(--tertiary)", "var(--primary)"],
    delta: "+12% vs Target",
    deltaColor: "var(--tertiary)",
    time: "Mastered",
  },
  kafka: {
    tag: "IN PROGRESS • 54%",
    tagColor: "var(--outline)",
    title: "Kafka Event Streaming & Consumer Groups",
    desc: "Partition balancing, dead-letter queues, and exactly-once processing semantics are currently under evaluation in Sprint 06.",
    deps: ["TCP Sockets", "Kafka Topics", "Consumer Groups"],
    depColors: ["var(--outline)", "var(--outline)", "var(--primary)"],
    delta: "-18% vs Target",
    deltaColor: "var(--on-surface-variant)",
    time: "2 Sprints (1.8h)",
  },
  rest: {
    tag: "MASTERED NODE • 98%",
    tagColor: "var(--tertiary)",
    title: "REST & GraphQL API Architecture",
    desc: "Full mastery in schema design, n+1 resolver batching with DataLoader, and RFC-compliant HTTP caching headers.",
    deps: ["HTTP/2", "Schema Design", "DataLoader"],
    depColors: ["var(--tertiary)", "var(--tertiary)", "var(--tertiary)"],
    delta: "+28% vs Target",
    deltaColor: "var(--tertiary)",
    time: "Mastered",
  },
  docker: {
    tag: "MASTERED NODE • 91%",
    tagColor: "var(--tertiary)",
    title: "Docker OCI & Multi-Stage Containers",
    desc: "Proven minimal image compilation, layer caching optimization, and non-root execution hardening.",
    deps: ["Linux Namespaces", "OCI Runtime", "Compose"],
    depColors: ["var(--tertiary)", "var(--tertiary)", "var(--tertiary)"],
    delta: "+21% vs Target",
    deltaColor: "var(--tertiary)",
    time: "Mastered",
  },
};

export default function SkillGraph() {
  const [selectedNode, setSelectedNode] = useState("consensus");
  const detail = nodeData[selectedNode];

  return (
    <section
      id="skill-graph"
      style={{
        width: "100%",
        padding: "64px 0",
        borderBottom: "1px solid var(--outline-variant)",
        background: "var(--surface-subtle)",
      }}
    >
      <div
        className="ss-container"
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: 4 }}>
              Knowledge Topology
            </span>
            <h2
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                fontWeight: 700,
                color: "var(--on-surface)",
              }}
            >
              Interactive Skill Graph & DAG Navigator
            </h2>
          </div>
          {/* Legend */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 12,
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--on-surface)",
            }}
          >
            {[
              { label: "Mastered", color: "var(--tertiary)" },
              { label: "Proficient", color: "var(--primary)" },
              { label: "In Progress", color: "var(--outline)" },
              { label: "Critical Gap", color: "var(--error)" },
            ].map(({ label, color }) => (
              <span
                key={label}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: color,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Graph Container */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--outline-variant)",
            borderRadius: 8,
            padding: 24,
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Graph Visual */}
            <div
              style={{
                background: "#fff",
                border: "1px solid rgba(226,232,240,0.8)",
                borderRadius: 6,
                padding: 24,
                position: "relative",
                minHeight: 340,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {/* SVG Connection Lines */}
              <svg
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  stroke: "var(--outline-variant)",
                  strokeWidth: 1.5,
                }}
              >
                <line strokeDasharray="4" x1="20%" x2="50%" y1="30%" y2="25%" />
                <line x1="20%" x2="50%" y1="70%" y2="25%" />
                <line x1="50%" x2="80%" y1="25%" y2="35%" />
                <line x1="50%" x2="50%" y1="25%" y2="75%" />
                <line strokeDasharray="3" x1="50%" x2="80%" y1="75%" y2="75%" />
              </svg>

              {/* Nodes */}
              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "8px 0",
                }}
              >
                {/* Top Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    paddingLeft: 8,
                    paddingRight: 8,
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div
                    className="graph-node"
                    onClick={() => setSelectedNode("rest")}
                    style={{
                      width: 176,
                      border:
                        selectedNode === "rest"
                          ? "2px solid var(--primary)"
                          : undefined,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          color: "var(--on-surface)",
                        }}
                      >
                        REST & GraphQL
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          fontWeight: 700,
                          padding: "2px 6px",
                          background: "var(--tertiary-container)",
                          color: "var(--tertiary)",
                          borderRadius: 4,
                        }}
                      >
                        98%
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        color: "var(--tertiary)",
                        fontWeight: 500,
                      }}
                    >
                      Status: Mastered
                    </span>
                  </div>

                  <div
                    className="graph-node"
                    onClick={() => setSelectedNode("kafka")}
                    style={{
                      width: 176,
                      border:
                        selectedNode === "kafka"
                          ? "2px solid var(--primary)"
                          : undefined,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          color: "var(--on-surface)",
                        }}
                      >
                        Kafka Streams
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          fontWeight: 700,
                          padding: "2px 6px",
                          background: "var(--surface-container)",
                          color: "var(--outline)",
                          borderRadius: 4,
                        }}
                      >
                        54%
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        color: "var(--outline)",
                        fontWeight: 500,
                      }}
                    >
                      Status: In-Progress
                    </span>
                  </div>
                </div>

                {/* Central Hub */}
                <div
                  style={{ display: "flex", justifyContent: "center", width: "100%", margin: "24px 0" }}
                >
                  <div
                    className="graph-node-central"
                    onClick={() => setSelectedNode("postgres")}
                    style={{
                      width: 260,
                      border:
                        selectedNode === "postgres"
                          ? "2px solid var(--primary-dark)"
                          : undefined,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-headline)",
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          color: "var(--primary-dark)",
                        }}
                      >
                        PostgreSQL Query Plans
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          padding: "2px 6px",
                          background: "var(--primary)",
                          color: "#fff",
                          borderRadius: 4,
                        }}
                      >
                        82%
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6875rem",
                        color: "var(--on-surface-variant)",
                        lineHeight: 1.5,
                      }}
                    >
                      Index scans, B-Trees & EXPLAIN ANALYZE
                    </p>
                    <div
                      style={{
                        marginTop: 8,
                        width: "100%",
                        background: "var(--outline-variant)",
                        height: 4,
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: "82%",
                          height: "100%",
                          background: "var(--primary)",
                          borderRadius: 4,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    paddingLeft: 8,
                    paddingRight: 8,
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div
                    className="graph-node"
                    onClick={() => setSelectedNode("docker")}
                    style={{
                      width: 176,
                      border:
                        selectedNode === "docker"
                          ? "2px solid var(--primary)"
                          : undefined,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          color: "var(--on-surface)",
                        }}
                      >
                        Docker & OCI
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          fontWeight: 700,
                          padding: "2px 6px",
                          background: "var(--tertiary-container)",
                          color: "var(--tertiary)",
                          borderRadius: 4,
                        }}
                      >
                        91%
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        color: "var(--tertiary)",
                        fontWeight: 500,
                      }}
                    >
                      Status: Mastered
                    </span>
                  </div>

                  {/* Critical Gap Node */}
                  <div
                    className="graph-node-error"
                    onClick={() => setSelectedNode("consensus")}
                    style={{
                      width: 192,
                      outline:
                        selectedNode === "consensus"
                          ? "2px solid #dc2626"
                          : undefined,
                      outlineOffset: 2,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          color: "var(--error)",
                        }}
                      >
                        Raft Consensus
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          fontWeight: 700,
                          padding: "2px 6px",
                          background: "#fff",
                          color: "var(--error)",
                          borderRadius: 4,
                          border: "1px solid rgba(220,38,38,0.3)",
                        }}
                      >
                        Gap: 38%
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-label)",
                        fontSize: "0.625rem",
                        color: "var(--error)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Critical Hiring Blocker
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Panel */}
            <div
              style={{
                background: "var(--surface-subtle)",
                border: "1px solid var(--outline-variant)",
                borderRadius: 6,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid var(--outline-variant)",
                  paddingBottom: 8,
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--outline)",
                  }}
                >
                  Node Telemetry Inspector
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    color: detail.tagColor,
                    transition: "color 0.2s",
                  }}
                >
                  {detail.tag}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "var(--on-surface)",
                  transition: "all 0.2s",
                }}
              >
                {detail.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6875rem",
                  color: "var(--on-surface-variant)",
                  lineHeight: 1.65,
                }}
              >
                {detail.desc}
              </p>

              {/* Dependencies */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--outline-variant)",
                  borderRadius: 4,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.625rem",
                    color: "var(--outline)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Dependency Hierarchy
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flexWrap: "wrap",
                  }}
                >
                  {detail.deps.map((dep, i) => (
                    <React.Fragment key={dep}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          color: detail.depColors[i],
                        }}
                      >
                        {dep}
                      </span>
                      {i < detail.deps.length - 1 && (
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: 14, color: "var(--outline)" }}
                        >
                          arrow_right_alt
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  {
                    label: "Benchmark Delta",
                    value: detail.delta,
                    color: detail.deltaColor,
                  },
                  {
                    label: "Est. Time to Mastery",
                    value: detail.time,
                    color: "var(--on-surface)",
                  },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    style={{
                      padding: 12,
                      background: "var(--surface)",
                      border: "1px solid var(--outline-variant)",
                      borderRadius: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-label)",
                        fontSize: "0.625rem",
                        color: "var(--outline)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        display: "block",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color,
                        display: "block",
                        marginTop: 2,
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Launch CTA */}
              <div style={{ paddingTop: 12, borderTop: "1px solid var(--outline-variant)" }}>
                <a
                  href="#simulator-preview"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                    play_arrow
                  </span>
                  Launch Targeted Remediation Sprint
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
