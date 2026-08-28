import React, { useState } from "react";
import { EARNING_PATH_CONTENT } from "../data/skillsData";
import { Laptop, TrendingUp, Briefcase, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";

export default function EarningPaths({ onSelectRoadmap }) {
  const [selectedPath, setSelectedPath] = useState("Freelancing");

  const pathIcons = {
    "Freelancing": Laptop,
    "Affiliate Marketing": TrendingUp,
    "Online Jobs": Briefcase,
  };

  const currentContent = EARNING_PATH_CONTENT[selectedPath];

  return (
    <section id="earning-paths" className="section-spacing">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} />
            <span>Monetization Trajectories</span>
          </div>
          <h2>Explore Your Earning Direction</h2>
          <p>
            Understand the fundamental differences between client services, audience marketing, and remote employment. Review scam warnings and realistic milestones before you invest time.
          </p>
        </div>

        {/* U4 FIX: Path Selector Cards — use <button> for keyboard accessibility */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {Object.keys(EARNING_PATH_CONTENT).map((pathKey) => {
            const Icon = pathIcons[pathKey];
            const isSelected = selectedPath === pathKey;
            return (
              <button
                key={pathKey}
                type="button"
                onClick={() => setSelectedPath(pathKey)}
                aria-pressed={isSelected}
                style={{
                  textAlign: "left",
                  padding: "32px 26px",
                  cursor: "pointer",
                  borderRadius: "var(--radius-lg)",
                  border: isSelected ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                  background: isSelected ? "var(--primary-light)" : "var(--bg-surface)",
                  boxShadow: isSelected ? "var(--shadow-card-hover)" : "var(--shadow-card)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  fontFamily: "inherit",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "var(--border-medium)";
                    e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "var(--shadow-card)";
                  }
                }}
              >
                <div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: isSelected ? "var(--primary)" : "var(--bg-subtle)",
                      color: isSelected ? "#ffffff" : "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: "1.45rem", marginBottom: "8px", color: isSelected ? "var(--primary-text)" : "var(--text-primary)" }}>{pathKey}</h3>
                  <p style={{ fontSize: "0.95rem", color: isSelected ? "var(--text-secondary)" : "var(--text-muted)" }}>{EARNING_PATH_CONTENT[pathKey].intro}</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "20px",
                    color: isSelected ? "var(--primary)" : "var(--text-muted)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  <span>Explore Guidance</span>
                  <ArrowRight size={15} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Breakdown for Active Path */}
        <div className="card" style={{ padding: "40px 32px", backgroundColor: "var(--bg-surface)" }}>
          <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid var(--border)" }}>
            <span className="badge badge-green" style={{ marginBottom: "8px" }}>
              In-Depth Exploration
            </span>
            <h3 style={{ fontSize: "2rem", marginBottom: "8px", color: "var(--text-primary)" }}>{currentContent.title}</h3>
            <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)" }}>{currentContent.intro}</p>
          </div>

          {/* Sections Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
              marginBottom: "36px",
            }}
          >
            {currentContent.sections.map((section, idx) => {
              if (section.isScamCard) {
                return (
                  <div
                    key={idx}
                    style={{
                      padding: "24px",
                      borderRadius: "var(--radius-md)",
                      background: "#fff1f2",
                      border: "1px solid #fecdd3",
                      gridColumn: "1 / -1",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#be123c", marginBottom: "8px" }}>
                      <ShieldAlert size={22} />
                      <h4 style={{ fontSize: "1.2rem", color: "#be123c" }}>{section.title}</h4>
                    </div>
                    <p style={{ color: "#4c0519", fontSize: "0.95rem", lineHeight: 1.6 }}>{section.content}</p>
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  style={{
                    padding: "24px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h4 style={{ fontSize: "1.15rem", marginBottom: "10px", color: "var(--text-primary)" }}>
                    {section.title}
                  </h4>
                  <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>{section.content}</p>
                </div>
              );
            })}
          </div>

          {/* Associated Roadmaps CTAs */}
          <div
            style={{
              padding: "24px",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-subtle)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h4 style={{ fontSize: "1.1rem", marginBottom: "4px", color: "var(--text-primary)" }}>
                High-Value Skills Suited for {selectedPath}
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Choose a roadmap to start building hands-on project deliverables:
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {currentContent.roadmaps.map((roadmapName) => (
                <button
                  key={roadmapName}
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => onSelectRoadmap(roadmapName)}
                >
                  <span>{roadmapName} Roadmap</span>
                  <ArrowRight size={13} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
