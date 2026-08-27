import React from "react";
import { Users, BookOpen, Code2, Award } from "lucide-react";

export default function StatsStrip() {
  const stats = [
    {
      icon: Users,
      value: "42,000+",
      label: "Active Learners",
      description: "Building skills daily across 80+ countries",
    },
    {
      icon: BookOpen,
      value: "65+",
      label: "Structured Courses",
      description: "Curated paths with real project briefs",
    },
    {
      icon: Code2,
      value: "1,800+",
      label: "Practice Problems",
      description: "From syntax drills to system design",
    },
    {
      icon: Award,
      value: "94%",
      label: "Course Completion",
      description: "Industry-leading student retention rate",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "var(--bg-subtle)",
        borderBottom: "1px solid var(--border)",
        padding: "36px 0",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                    border: "1px solid var(--border)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "var(--shadow-xs)",
                  }}
                >
                  <Icon size={22} />
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.75rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      marginBottom: "4px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.92rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "2px",
                    }}
                  >
                    {stat.label}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
