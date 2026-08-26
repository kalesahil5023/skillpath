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

        {/* Path Selector Cards */}
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
              <div
                key={pathKey}
                onClick={() => setSelectedPath(pathKey)}
                className="glass-card"
                style={{
                  padding: "32px 26px",
                  cursor: "pointer",
                  border: isSelected ? "1px solid var(--primary)" : "1px solid var(--border)",
                  background: isSelected
                    ? "linear-gradient(145deg, rgba(115,215,255,0.12), rgba(16,29,49,0.9))"
                    : "var(--surface-glass)",
                  boxShadow: isSelected ? "0 0 25px rgba(115,215,255,0.15)" : "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: isSelected ? "var(--primary)" : "rgba(255, 255, 255, 0.05)",
                      color: isSelected ? "#08111f" : "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                      transition: "all 0.2s",
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: "1.45rem", marginBottom: "8px" }}>{pathKey}</h3>
                  <p style={{ fontSize: "0.95rem" }}>{EARNING_PATH_CONTENT[pathKey].intro}</p>
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
                  }}
                >
                  <span>Explore Guidance</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Breakdown for Active Path */}
        <div className="glass-card" style={{ padding: "40px 32px" }}>
          <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid var(--border)" }}>
            <span className="badge badge-primary" style={{ marginBottom: "8px" }}>
              In-Depth Exploration
            </span>
            <h3 style={{ fontSize: "2rem", marginBottom: "8px" }}>{currentContent.title}</h3>
            <p style={{ fontSize: "1.1rem" }}>{currentContent.intro}</p>
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
                      background: "rgba(255, 107, 139, 0.08)",
                      border: "1px solid rgba(255, 107, 139, 0.35)",
                      gridColumn: "1 / -1",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--danger)", marginBottom: "8px" }}>
                      <ShieldAlert size={22} />
                      <h4 style={{ fontSize: "1.2rem", color: "var(--danger)" }}>{section.title}</h4>
                    </div>
                    <p style={{ color: "var(--text)", fontSize: "0.95rem", lineHeight: 1.6 }}>{section.content}</p>
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  style={{
                    padding: "24px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255, 255, 255, 0.025)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h4 style={{ fontSize: "1.15rem", marginBottom: "10px", color: "var(--text)" }}>
                    {section.title}
                  </h4>
                  <p style={{ fontSize: "0.92rem", lineHeight: 1.6 }}>{section.content}</p>
                </div>
              );
            })}
          </div>

          {/* Associated Roadmaps CTAs */}
          <div
            style={{
              padding: "24px",
              borderRadius: "var(--radius-md)",
              background: "rgba(115, 215, 255, 0.05)",
              border: "1px solid rgba(115, 215, 255, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h4 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>
                High-Value Skills Suited for {selectedPath}
              </h4>
              <p style={{ fontSize: "0.9rem" }}>
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
