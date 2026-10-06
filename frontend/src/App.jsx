import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ErrorBoundary from "./components/ErrorBoundary";

// ── New SkillSprint Simulator Components ──────────────────────────────────
import Navbar from "./components/Navbar";
import TelemetryBar from "./components/TelemetryBar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import SkillRoadmaps from "./components/SkillRoadmaps";
import PopularCourses from "./components/PopularCourses";
import EarningPaths from "./components/EarningPaths";
import StatsStrip from "./components/StatsStrip";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

function MainContent() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--background)",
      }}
    >
      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Content — offset by navbar height (64px) */}
      <main style={{ flex: 1, paddingTop: 64 }}>
        {/* Live Engine Telemetry Bar */}
        <TelemetryBar />

        {/* 1. Hero: Career Simulator + Career Twin Widget */}
        <Hero />

        {/* 2. 8-Stage Verification Pipeline */}
        <HowItWorks />

        {/* 3. Interactive Skill Graph & DAG Navigator */}
        <SkillRoadmaps />

        {/* 4. Career Simulation Arena */}
        <PopularCourses />

        {/* 5. Skill Passport: Cryptographic Proof */}
        <EarningPaths />

        {/* 6. Platform Architecture & Comparison Matrix */}
        <StatsStrip />

        {/* 7. Final Call to Action */}
        <FinalCTA />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}

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
