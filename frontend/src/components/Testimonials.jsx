import React from "react";
import { Star, Quote, CheckCircle, Award } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rohan Patel",
      role: "Associate Software Engineer",
      company: "Acme Cloud Systems",
      course: "Full-Stack Web Development Track",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
      quote:
        "The project builder was the game changer for me. Instead of just coding along with tutorials, I built an actual authenticated web app with Django and PostgreSQL that I walked through during my technical interview.",
      stars: 5,
    },
    {
      name: "Claire Moreau",
      role: "Frontend Developer",
      company: "Nordic Digital",
      course: "React 18 & Component Systems",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      quote:
        "SkillSprint's 7-day starter plan eliminated my decision fatigue. It gave me a clear, day-by-day checklist that kept me accountable. Three months later, I landed my first junior developer role.",
      stars: 5,
    },
    {
      name: "Marcus Adebayo",
      role: "Data Analyst / Python Dev",
      company: "FinMetrics Global",
      course: "Python & Algorithms Track",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      quote:
        "The practice challenges actually explain the trade-offs of time and space complexity clearly. The streak tracking and roadmap milestones helped me maintain momentum while working full-time.",
      stars: 5,
    },
  ];

  return (
    <section className="section-spacing" style={{ backgroundColor: "#ffffff", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <Award size={13} />
            <span>Learner Outcomes</span>
          </div>
          <h2>Real stories from real learners</h2>
          <p>
            Here is how students, career changers, and engineers used SkillSprint to build competency, complete real projects, and land technical roles.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "14px",
                backgroundColor: "#ffffff",
                position: "relative",
              }}
            >
              {/* Star Rating */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "18px" }}>
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" stroke="#f59e0b" />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: "0.96rem",
                  lineHeight: 1.65,
                  color: "var(--text-secondary)",
                  marginBottom: "24px",
                  fontStyle: "normal",
                }}
              >
                "{t.quote}"
              </p>

              {/* Learner Info */}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid var(--border)",
                  }}
                  loading="lazy"
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.96rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>{t.name}</span>
                    <CheckCircle size={14} color="var(--primary)" />
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    {t.role} • <strong style={{ color: "var(--text-secondary)", fontWeight: 600 }}>{t.company}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
