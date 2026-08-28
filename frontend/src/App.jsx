import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsStrip from "./components/StatsStrip";
import PopularCourses from "./components/PopularCourses";
import HowItWorks from "./components/HowItWorks";
import PathFinder from "./components/PathFinder";
import MyPlan from "./components/MyPlan";
import SkillRoadmaps from "./components/SkillRoadmaps";
import EarningPaths from "./components/EarningPaths";
import ProjectBuilder from "./components/ProjectBuilder";
import PortfolioBuilder from "./components/PortfolioBuilder";
import Testimonials from "./components/Testimonials";
import ResourceHub from "./components/ResourceHub";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import LegalModal from "./components/LegalModal";
import SearchModal from "./components/SearchModal";
import BackToTop from "./components/BackToTop";
import { Sparkles } from "lucide-react";

function MainContent() {
  const [selectedRoadmapSkill, setSelectedRoadmapSkill] = useState("Web Development");
  const [savedPlan, setSavedPlan] = useState(null);
  const [portfolioPrefill, setPortfolioPrefill] = useState(null);
  const [legalTopic, setLegalTopic] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSelectRoadmap = (skillName) => {
    setSelectedRoadmapSkill(skillName);
    const el = document.getElementById("skill-roadmaps");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSendToPortfolio = (prefill) => {
    setPortfolioPrefill(prefill);
    const el = document.getElementById("builders");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Global keyboard shortcut: Cmd/Ctrl+K to open search
  React.useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-canvas)" }}>
      {/* Navigation */}
      <Navbar
        onOpenLegal={(topic) => setLegalTopic(topic)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Sections */}
      <main style={{ flex: 1 }}>
        {/* 1. Hero with Realistic Product Dashboard Preview */}
        <Hero
          onExploreCourses={() => {
            const el = document.getElementById("popular-courses");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          onTryPractice={() => {
            const el = document.getElementById("path-finder");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 2. Compact Trust / Statistics Strip */}
        <StatsStrip />

        {/* 3. Popular Courses: "Most loved by our learners" */}
        <PopularCourses
          onSelectCourse={(courseId) => {
            // Navigate to PathFinder and scroll to it
            const el = document.getElementById("path-finder");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          onSelectRoadmap={handleSelectRoadmap}
        />

        {/* 4. SkillSprint Learning Journey: The 4 Core Pillars */}
        <HowItWorks />

        {/* 5. Interactive PathFinder Decision Engine */}
        <PathFinder
          onPlanSaved={(plan) => setSavedPlan(plan)}
          onSelectRoadmap={handleSelectRoadmap}
        />

        {/* 6. My Plan: 7-Day Checklist with Cloud Sync */}
        <MyPlan
          savedPlan={savedPlan}
          onSelectRoadmap={handleSelectRoadmap}
          onPlanReset={() => setSavedPlan(null)}
        />

        {/* 7. 30-Day Milestone Roadmaps */}
        <SkillRoadmaps
          activeSkill={selectedRoadmapSkill}
          onSkillChange={(skill) => setSelectedRoadmapSkill(skill)}
          onSendToPortfolio={handleSendToPortfolio}
        />

        {/* 8. Proof-of-Work Project & Portfolio Builders */}
        <section id="builders" className="section-spacing" style={{ backgroundColor: "var(--bg-subtle)" }}>
          <div className="container">
            <div className="section-header">
              <div className="eyebrow">
                <Sparkles size={14} />
                <span>Proof-of-Work Generators</span>
              </div>
              <h2>Project &amp; Portfolio Builders</h2>
              <p>
                Practice with purpose. Generate real-world project briefs, complete the work, and package case studies ready to download or save to your cloud account.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
                gap: "32px",
              }}
              className="builders-grid"
            >
              <ProjectBuilder onSendToPortfolio={handleSendToPortfolio} />
              <PortfolioBuilder prefillData={portfolioPrefill} />
            </div>
          </div>

          <style>{`
            @media (max-width: 860px) {
              .builders-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* 9. Earning Paths Guidance */}
        <EarningPaths onSelectRoadmap={handleSelectRoadmap} />

        {/* 10. Human Proof & Learner Testimonials */}
        <Testimonials />

        {/* 11. Curated Directory & Official Documentation */}
        <ResourceHub onOpenLegal={(topic) => setLegalTopic(topic)} />

        {/* 12. Final High-Contrast Conversion CTA */}
        <FinalCTA />
      </main>

      {/* 13. Professional Multi-Column Footer */}
      <Footer onOpenLegal={(topic) => setLegalTopic(topic)} />

      {/* Global Modals */}
      <AuthModal />
      <LegalModal
        topic={legalTopic}
        isOpen={!!legalTopic}
        onClose={() => setLegalTopic(null)}
      />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Global UX Utilities */}
      <BackToTop />
    </div>
  );
}

// Google Client ID for OAuth2 Web application (always use env var in production)
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

export default function App() {
  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ToastProvider>
          <AuthProvider>
            <MainContent />
          </AuthProvider>
        </ToastProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}
