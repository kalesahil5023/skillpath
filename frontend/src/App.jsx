import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { SprintProvider } from "./context/SprintContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import StatsStrip from "./components/StatsStrip";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import LegalModal from "./components/LegalModal";
import SearchModal from "./components/SearchModal";
import Dashboard from "./pages/Dashboard";
import LessonPlayer from "./pages/LessonPlayer";
import Leaderboard from "./pages/Leaderboard";
import SquadPage from "./pages/SquadPage";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import InterviewPrep from "./pages/InterviewPrep";
import RoadmapsPage from "./pages/RoadmapsPage";
import { Terminal, Map, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

/* ── Home / Landing Page ─────────────────────────────────────────────────── */
function LandingPage({ onNavigate }) {
  return (
    <main>
      {/* 1 & 2: Dedicated rotating hero banner + sweet welcome */}
      <HeroBanner onNavigate={onNavigate} />

      {/* Stats Counter Strip */}
      <StatsStrip />

      {/* Featured Tracks & Interview Prep Spotlight */}
      <section style={{ padding: "64px 0 72px", background: "var(--bg-canvas)" }}>
        <div className="ss-container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(51,102,204,0.1)", border: "1px solid rgba(51,102,204,0.2)", borderRadius: "9999px", padding: "6px 16px", marginBottom: "14px" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                END-TO-END CAREER ACCELERATION
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "var(--on-surface)", marginBottom: "12px", letterSpacing: "-0.02em" }}>
              Everything You Need to Land the Offer
            </h2>
            <p style={{ color: "var(--on-surface-variant)", fontSize: "1rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.6 }}>
              Follow structured roadmaps, solve real-world engineering missions in the simulator, and master HR behavioral & technical interviews.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {/* Card 1: Interactive Roadmaps */}
            <div
              style={{
                background: "#fff", border: "1px solid var(--outline-variant)",
                borderRadius: "16px", padding: "32px 28px",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                boxShadow: "0 4px 20px rgba(15,23,42,0.04)", transition: "all 0.2s ease",
              }}>
              <div>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: "linear-gradient(135deg, #3366cc, #5b8def)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", marginBottom: "20px",
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>map</span>
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "10px", color: "var(--on-surface)" }}>
                  Visual Career Roadmaps
                </h3>
                <p style={{ color: "var(--on-surface-variant)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "20px" }}>
                  Curated DAG graphs for Full-Stack, Backend Systems, and Frontend Engineering. Master each node step-by-step with verified tests.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("roadmap")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "transparent", border: "none", color: "var(--primary)",
                  fontWeight: 700, fontSize: "0.9375rem", cursor: "pointer", padding: 0,
                }}>
                Explore Roadmaps <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
              </button>
            </div>

            {/* Card 2: Interactive Coding Simulator */}
            <div
              style={{
                background: "#fff", border: "1px solid var(--outline-variant)",
                borderRadius: "16px", padding: "32px 28px",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                boxShadow: "0 4px 20px rgba(15,23,42,0.04)", transition: "all 0.2s ease",
              }}>
              <div>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: "linear-gradient(135deg, #059669, #10b981)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", marginBottom: "20px",
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>terminal</span>
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "10px", color: "var(--on-surface)" }}>
                  20-Min Coding Simulator
                </h3>
                <p style={{ color: "var(--on-surface-variant)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "20px" }}>
                  Real browser Monaco IDE with live test harness. Fix real API race conditions, optimize SQL queries, and implement JWT auth.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("lesson")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "transparent", border: "none", color: "#059669",
                  fontWeight: 700, fontSize: "0.9375rem", cursor: "pointer", padding: 0,
                }}>
                Launch Simulator <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
              </button>
            </div>

            {/* Card 3: HR & Tech Interview Preparation */}
            <div
              style={{
                background: "#fff", border: "1px solid var(--outline-variant)",
                borderRadius: "16px", padding: "32px 28px",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                boxShadow: "0 4px 20px rgba(15,23,42,0.04)", transition: "all 0.2s ease",
              }}>
              <div>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", marginBottom: "20px",
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>psychology</span>
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "10px", color: "var(--on-surface)" }}>
                  HR & Tech Interview Prep
                </h3>
                <p style={{ color: "var(--on-surface-variant)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "20px" }}>
                  Behavioral questions using the STAR framework alongside core System Design, DSA, and modern framework architecture challenges.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("interview")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "transparent", border: "none", color: "#7c3aed",
                  fontWeight: 700, fontSize: "0.9375rem", cursor: "pointer", padding: 0,
                }}>
                Practice Interviews <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Real Outcomes */}
      <Testimonials />

      {/* Final Call to Action */}
      <FinalCTA />
    </main>
  );
}

/* ── App Shell ────────────────────────────────────────────────────────────── */
function AppShell() {
  const [page, setPage] = useState("landing");
  const [legalTopic, setLegalTopic] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Full-screen Lesson player
  if (page === "lesson") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar onNavigate={navigate} />
        <LessonPlayer
          onBack={() => navigate("landing")}
          onComplete={() => navigate("dashboard")}
        />
        <AuthModal />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar
        onOpenLegal={(t) => setLegalTopic(t)}
        onOpenSearch={() => setSearchOpen(true)}
        onNavigate={navigate}
      />

      <div style={{ flex: 1 }}>
        {page === "landing" && <LandingPage onNavigate={navigate} />}
        {page === "dashboard" && <Dashboard onStartMission={() => navigate("lesson")} />}
        {page === "interview" && <InterviewPrep onNavigate={navigate} />}
        {page === "roadmap" && <RoadmapsPage onNavigate={navigate} />}
        {page === "leaderboard" && <Leaderboard standalone={true} />}
        {page === "squad" && <SquadPage />}
        {page === "portfolio" && <Portfolio />}
        {page === "profile" && <Profile onNavigate={navigate} />}
      </div>

      <Footer onOpenLegal={(t) => setLegalTopic(t)} />

      <AuthModal />
      <LegalModal
        topic={legalTopic}
        isOpen={!!legalTopic}
        onClose={() => setLegalTopic(null)}
      />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "skillsprint-dev-client-id.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <SprintProvider>
          <ToastProvider>
            <ErrorBoundary>
              <AppShell />
            </ErrorBoundary>
          </ToastProvider>
        </SprintProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
