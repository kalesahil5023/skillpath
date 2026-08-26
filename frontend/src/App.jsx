import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import PathFinder from "./components/PathFinder";
import MyPlan from "./components/MyPlan";
import SkillRoadmaps from "./components/SkillRoadmaps";
import EarningPaths from "./components/EarningPaths";
import ProjectBuilder from "./components/ProjectBuilder";
import PortfolioBuilder from "./components/PortfolioBuilder";
import ResourceHub from "./components/ResourceHub";
import AuthModal from "./components/AuthModal";
import LegalModal from "./components/LegalModal";
import Footer from "./components/Footer";
import { Sparkles, Layers } from "lucide-react";

function MainContent() {
  const [selectedRoadmapSkill, setSelectedRoadmapSkill] = useState("Web Development");
  const [savedPlan, setSavedPlan] = useState(null);
  const [portfolioPrefill, setPortfolioPrefill] = useState(null);
  const [legalTopic, setLegalTopic] = useState(null);

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

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navigation */}
      <Navbar onOpenLegal={(topic) => setLegalTopic(topic)} />

      {/* Main Sections */}
      <main style={{ flex: 1 }}>
        <Hero />
        <HowItWorks />
        <PathFinder
          onPlanSaved={(plan) => setSavedPlan(plan)}
          onSelectRoadmap={handleSelectRoadmap}
        />
        <MyPlan
          savedPlan={savedPlan}
          onSelectRoadmap={handleSelectRoadmap}
          onPlanReset={() => setSavedPlan(null)}
        />
        <SkillRoadmaps
          activeSkill={selectedRoadmapSkill}
          onSkillChange={(skill) => setSelectedRoadmapSkill(skill)}
          onSendToPortfolio={handleSendToPortfolio}
        />
        <EarningPaths onSelectRoadmap={handleSelectRoadmap} />

        {/* Builders Section: Project Builder + Portfolio Builder */}
        <section id="builders" className="section-spacing">
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
                gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
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

        <ResourceHub onOpenLegal={(topic) => setLegalTopic(topic)} />
      </main>

      {/* Footer */}
      <Footer onOpenLegal={(topic) => setLegalTopic(topic)} />

      {/* Global Modals */}
      <AuthModal />
      <LegalModal
        topic={legalTopic}
        isOpen={!!legalTopic}
        onClose={() => setLegalTopic(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
