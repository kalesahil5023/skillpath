import React from "react";
import { ArrowRight, Flame, Trophy, CheckCircle2, Code, BookOpen, Sparkles, Play, Clock } from "lucide-react";

export default function Hero({ onExploreCourses, onTryPractice }) {
  return (
    <section
      style={{
        padding: "72px 0 88px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: "56px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Column: Value Proposition & CTAs */}
          <div>
            {/* Small Brand Statement */}
            <div className="eyebrow">
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary)",
                }}
              />
              <span>LEARN. PRACTICE. BUILD. GROW.</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: "3.25rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                marginBottom: "20px",
              }}
              className="hero-headline"
            >
              Master skills. Build projects.{" "}
              <span className="highlight-green">Launch your career.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p
              style={{
                fontSize: "1.12rem",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                marginBottom: "32px",
                maxWidth: "540px",
              }}
            >
              SkillSprint combines structured computer science courses, interactive DSA practice, and production-tested projects. Learn the fundamentals, ship verified work to your portfolio, and track your path to career readiness.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
                marginBottom: "36px",
              }}
            >
              <a
                href="#popular-courses"
                className="btn btn-primary"
                style={{ padding: "13px 26px", fontSize: "1rem" }}
              >
                <span>Explore Courses</span>
                <ArrowRight size={18} />
              </a>

              <a
                href="#path-finder"
                className="btn btn-secondary"
                style={{ padding: "13px 24px", fontSize: "1rem" }}
              >
                <span>Try Practice Now</span>
              </a>
            </div>

            {/* Social Trust Snippet */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"].map((color, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      color: "#ffffff",
                      border: "2px solid #ffffff",
                      marginLeft: idx > 0 ? "-8px" : "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    {["A", "R", "S", "K"][idx]}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                <strong style={{ color: "var(--text-primary)" }}>42,000+</strong> students learning actively today
              </div>
            </div>
          </div>

          {/* Right Column: Realistic SkillSprint Product Dashboard */}
          <div>
            <div
              className="card"
              style={{
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 10px 30px -4px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04)",
                backgroundColor: "#ffffff",
                border: "1px solid var(--border)",
              }}
            >
              {/* Dashboard Top Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "16px",
                  borderBottom: "1px solid var(--border-subtle)",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary-light)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    SK
                  </div>
                  <div>
                    <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      Alex Morgan
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      Full-Stack Track • Level 5
                    </div>
                  </div>
                </div>

                {/* Streak Badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    background: "#fff7ed",
                    border: "1px solid #fed7aa",
                    borderRadius: "var(--radius-full)",
                    color: "#ea580c",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                  }}
                >
                  <Flame size={15} fill="#ea580c" />
                  <span>14-Day Streak</span>
                </div>
              </div>

              {/* Active Course Card */}
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "var(--bg-subtle)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span className="badge badge-green">In Progress</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--primary-text)" }}>
                    68% Complete
                  </span>
                </div>

                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "6px" }}>
                  Full-Stack Web Development &amp; Systems
                </h4>
                <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", marginBottom: "12px" }}>
                  Next Lesson: Module 4 • Building Authenticated REST APIs
                </p>

                {/* Progress Bar */}
                <div
                  style={{
                    width: "100%",
                    height: "7px",
                    backgroundColor: "#e2e8f0",
                    borderRadius: "4px",
                    overflow: "hidden",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "68%",
                      height: "100%",
                      backgroundColor: "var(--primary)",
                      borderRadius: "4px",
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "var(--primary)",
                    }}
                  >
                    <Play size={13} fill="currentColor" />
                    <span>Resume Lesson</span>
                  </button>
                </div>
              </div>

              {/* Weekly Practice Heatmap Activity */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    Weekly Practice Activity
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    12.4 hrs logged
                  </span>
                </div>

                {/* Activity Bar Chart */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "8px",
                    alignItems: "flex-end",
                    height: "64px",
                    padding: "8px 10px",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {[
                    { day: "Mon", hrs: 1.5, pct: "60%" },
                    { day: "Tue", hrs: 2.0, pct: "80%" },
                    { day: "Wed", hrs: 1.2, pct: "50%" },
                    { day: "Thu", hrs: 2.5, pct: "100%" },
                    { day: "Fri", hrs: 1.8, pct: "72%" },
                    { day: "Sat", hrs: 2.2, pct: "88%" },
                    { day: "Sun", hrs: 1.2, pct: "50%" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                      <div
                        style={{
                          width: "100%",
                          height: item.pct,
                          backgroundColor: i === 3 ? "var(--primary)" : "#cbd5e1",
                          borderRadius: "3px 3px 0 0",
                          transition: "height 0.3s ease",
                        }}
                        title={`${item.day}: ${item.hrs} hrs`}
                      />
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "4px" }}>
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Solved Practice Items */}
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "10px" }}>
                  Recently Solved Challenges
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { title: "Binary Search: Target Range", category: "Algorithms", difficulty: "Medium" },
                    { title: "Design JWT Authentication Middleware", category: "Backend", difficulty: "Hard" },
                  ].map((task, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                        backgroundColor: "var(--bg-subtle)",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.82rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <CheckCircle2 size={15} color="var(--primary)" />
                        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{task.title}</span>
                      </div>
                      <span className="badge badge-blue" style={{ fontSize: "0.7rem", padding: "2px 7px" }}>
                        {task.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-headline { font-size: 2.35rem !important; }
        }
      `}</style>
    </section>
  );
}
