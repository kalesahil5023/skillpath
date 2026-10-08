import React, { useState, useEffect } from "react";

const SLIDES = [
  {
    tag: "🚀 Learn by Building",
    headline: "Build Skills for the\nCareer You Actually Want",
    sub: "Real projects. Real code. Real results. No multiple choice. Just engineering missions that mirror what top companies actually test.",
    cta1: { label: "Start Free Today", page: "lesson", icon: "rocket_launch" },
    cta2: { label: "View Courses", page: "dashboard", icon: "school" },
    accent: "linear-gradient(135deg, #3366cc 0%, #5b8def 100%)",
    badge: "10,000+ learners",
    badgeIcon: "people",
  },
  {
    tag: "💡 Practice & Improve",
    headline: "Learn. Practice.\nGet Hired.",
    sub: "Daily 20-minute coding sprints build real muscle memory. Streak-based learning keeps you accountable and on track.",
    cta1: { label: "Launch Simulator", page: "lesson", icon: "terminal" },
    cta2: { label: "See Leaderboard", page: "leaderboard", icon: "leaderboard" },
    accent: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    badge: "Avg. 3× faster growth",
    badgeIcon: "trending_up",
  },
  {
    tag: "🗺️ Structured Learning",
    headline: "Track Your Growth\nwith Real Projects",
    sub: "Follow curated roadmaps from zero to production-ready. Build a verified portfolio that proves your skills to employers.",
    cta1: { label: "Explore Roadmaps", page: "portfolio", icon: "map" },
    cta2: { label: "View Portfolio", page: "portfolio", icon: "verified" },
    accent: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
    badge: "SHA-256 Verified",
    badgeIcon: "verified",
  },
];

const STATS = [
  { value: "50K+", label: "Active Learners", icon: "people" },
  { value: "1.2M+", label: "Missions Completed", icon: "task_alt" },
  { value: "94%", label: "Placement Rate", icon: "work" },
  { value: "4.9★", label: "Learner Rating", icon: "star" },
];

function WelcomeBanner({ onClose }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onClose, 400); }, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", top: "80px", right: "24px", zIndex: 1000,
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      color: "#fff", borderRadius: "16px",
      padding: "16px 20px", maxWidth: "300px",
      boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
      border: "1px solid rgba(255,255,255,0.1)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.95)",
      transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <span style={{ fontSize: "1.5rem" }}>👋</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "4px" }}>Welcome back!</div>
          <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
            Ready to sprint today? Your daily mission is waiting. 🔥
          </div>
        </div>
        <button onClick={() => { setVisible(false); setTimeout(onClose, 400); }}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: "2px", lineHeight: 1 }}>
          ✕
        </button>
      </div>
      <div style={{ marginTop: "10px", height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
        <div style={{ height: "100%", background: "linear-gradient(90deg, #3366cc, #5b8def)", borderRadius: "2px", animation: "shrink 5s linear forwards" }} />
      </div>
    </div>
  );
}

export default function HeroBanner({ onNavigate }) {
  const [current, setCurrent] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setCurrent((c) => (c + 1) % SLIDES.length); setAnimating(false); }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (i) => {
    if (i === current) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(i); setAnimating(false); }, 300);
  };

  const slide = SLIDES[current];

  return (
    <>
      {showWelcome && <WelcomeBanner onClose={() => setShowWelcome(false)} />}

      <section style={{
        width: "100%",
        background: "linear-gradient(160deg, #0a0f1e 0%, #0f172a 40%, #1a1f35 100%)",
        position: "relative", overflow: "hidden",
        padding: "80px 0 64px",
      }}>
        {/* Animated mesh background */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(51,102,204,0.15) 0%, transparent 70%)", top: "-200px", right: "-100px", animation: "float 8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(92,141,239,0.1) 0%, transparent 70%)", bottom: "-100px", left: "10%", animation: "float 10s ease-in-out infinite reverse" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="ss-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>

            {/* Slide tag */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: "9999px",
              padding: "6px 16px", fontSize: "0.8125rem", color: "rgba(255,255,255,0.9)",
              fontWeight: 600, marginBottom: "28px",
              opacity: animating ? 0 : 1, transform: animating ? "translateY(-8px)" : "translateY(0)",
              transition: "all 0.3s ease",
            }}>
              {slide.tag}
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "var(--font-headline)", fontWeight: 800,
              fontSize: "clamp(2.2rem, 5vw, 3.75rem)", lineHeight: 1.15,
              color: "#ffffff", marginBottom: "24px",
              opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)",
              transition: "all 0.35s ease",
              whiteSpace: "pre-line",
            }}>
              {slide.headline.split("\n").map((line, i) => (
                <span key={i}>
                  {i === 1 ? <span style={{ background: slide.accent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{line}</span> : line}
                  {i === 0 && "\n"}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)", color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7, marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px",
              opacity: animating ? 0 : 1, transition: "all 0.4s ease 0.05s",
            }}>
              {slide.sub}
            </p>

            {/* CTAs */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "14px",
              flexWrap: "wrap", marginBottom: "48px",
              opacity: animating ? 0 : 1, transition: "all 0.4s ease 0.1s",
            }}>
              <button type="button" onClick={() => onNavigate?.(slide.cta1.page)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "14px 28px", borderRadius: "12px",
                  background: slide.accent, border: "none",
                  fontSize: "1rem", fontWeight: 700, color: "#fff", cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(51,102,204,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(51,102,204,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(51,102,204,0.4)"; }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{slide.cta1.icon}</span>
                {slide.cta1.label}
              </button>
              <button type="button" onClick={() => onNavigate?.(slide.cta2.page)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "14px 24px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)",
                  fontSize: "1rem", fontWeight: 600, color: "#fff", cursor: "pointer",
                  backdropFilter: "blur(8px)", transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{slide.cta2.icon}</span>
                {slide.cta2.label}
              </button>
            </div>

            {/* Slide Dots */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "56px" }}>
              {SLIDES.map((_, i) => (
                <button key={i} type="button" onClick={() => goTo(i)}
                  style={{
                    width: i === current ? "28px" : "8px", height: "8px",
                    borderRadius: "4px", border: "none", cursor: "pointer",
                    background: i === current ? "#5b8def" : "rgba(255,255,255,0.25)",
                    transition: "all 0.3s ease",
                  }} />
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "40px",
          }}>
            {STATS.map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "4px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#5b8def" }}>{stat.icon}</span>
                  <span style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#fff" }}>{stat.value}</span>
                </div>
                <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
