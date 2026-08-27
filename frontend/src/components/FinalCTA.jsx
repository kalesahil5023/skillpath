import React from "react";
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function FinalCTA() {
  const { openAuthModal, isLoggedIn } = useAuth();

  return (
    <section style={{ padding: "80px 0", backgroundColor: "#ffffff" }}>
      <div className="container">
        <div
          style={{
            backgroundColor: "#0f172a",
            backgroundImage: "radial-gradient(circle at 100% 0%, rgba(5, 150, 105, 0.25) 0%, transparent 60%)",
            borderRadius: "20px",
            padding: "64px 48px",
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.3)",
          }}
          className="final-cta-card"
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "rgba(5, 150, 105, 0.2)",
              border: "1px solid rgba(52, 211, 153, 0.3)",
              color: "#34d399",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            <Sparkles size={14} />
            <span>START LEARNING TODAY</span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: "2.75rem",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              maxWidth: "640px",
              marginBottom: "16px",
            }}
            className="final-cta-heading"
          >
            Ready to build skills that launch your career?
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "1.1rem",
              color: "#94a3b8",
              lineHeight: 1.6,
              maxWidth: "560px",
              marginBottom: "36px",
            }}
          >
            Join 42,000+ ambitious learners. Get instant access to free courses, 7-day starter plans, and technical interview roadmaps.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "32px",
            }}
          >
            <button
              type="button"
              onClick={() => openAuthModal("register")}
              className="btn btn-primary"
              style={{
                padding: "14px 30px",
                fontSize: "1.02rem",
                backgroundColor: "#10b981",
                color: "#022c22",
                fontWeight: 800,
              }}
            >
              <span>{isLoggedIn ? "Access Your Dashboard" : "Get Started for Free"}</span>
              <ArrowRight size={18} />
            </button>

            <a
              href="#popular-courses"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 26px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                fontSize: "1.02rem",
                fontWeight: 600,
                fontFamily: "var(--font-heading)",
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)")}
            >
              <span>Explore Courses</span>
            </a>
          </div>

          {/* Guarantee Badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
              justifyContent: "center",
              fontSize: "0.84rem",
              color: "#94a3b8",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={16} color="#34d399" />
              <span>No credit card required</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={16} color="#34d399" />
              <span>Free starter tracks included</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <ShieldCheck size={16} color="#34d399" />
              <span>Verified certificates &amp; cloud sync</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .final-cta-card { padding: 40px 20px !important; }
          .final-cta-heading { font-size: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
