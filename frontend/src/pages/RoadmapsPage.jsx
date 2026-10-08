import React, { useState } from "react";
import {
  Map, CheckCircle2, Circle, Clock, ArrowRight,
  Sparkles, Terminal, BookOpen, Layers, Award, ShieldCheck, ChevronRight
} from "lucide-react";

const TRACKS = [
  {
    id: "fullstack",
    title: "Full-Stack Web Architect",
    badge: "Most Popular",
    desc: "From semantic HTML & modern React to scalable microservices, PostgreSQL, and distributed caching with Redis.",
    duration: "12 Weeks • 48 Sprints",
    level: "Intermediate to Senior",
    accent: "linear-gradient(135deg, #3366cc 0%, #5b8def 100%)",
    stages: [
      {
        phase: "Phase 1: Modern Frontend Core",
        topics: [
          { name: "React 19 & Component Lifecycle", done: true, tag: "Completed" },
          { name: "State Management with Zustand & Redux", done: true, tag: "Completed" },
          { name: "Performant UI & Tailwind CSS Tokens", done: true, tag: "Completed" },
          { name: "Client-side Routing & Protected Routes", done: false, tag: "Up Next" },
        ],
      },
      {
        phase: "Phase 2: Scalable API & Backend",
        topics: [
          { name: "RESTful API Design & Express Middleware", done: false, tag: "Locked" },
          { name: "JWT Auth & Refresh Token Rotations", done: false, tag: "Locked" },
          { name: "PostgreSQL Schema, Indexing & ACID", done: false, tag: "Locked" },
          { name: "Prisma ORM & Migration Strategies", done: false, tag: "Locked" },
        ],
      },
      {
        phase: "Phase 3: Production Infrastructure & Realtime",
        topics: [
          { name: "WebSocket & Real-time Event Streaming", done: false, tag: "Locked" },
          { name: "Docker Containerization & Multi-stage Builds", done: false, tag: "Locked" },
          { name: "CI/CD Pipelines with GitHub Actions", done: false, tag: "Locked" },
          { name: "System Monitoring & Error Telemetry", done: false, tag: "Locked" },
        ],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & Distributed Systems",
    badge: "High Salary",
    desc: "Master high-throughput event queues, Kafka, Raft consensus, database indexing, and fault-tolerant system architecture.",
    duration: "10 Weeks • 40 Sprints",
    level: "Advanced",
    accent: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    stages: [
      {
        phase: "Phase 1: Concurrency & Storage Engines",
        topics: [
          { name: "Thread Safety, Mutexes & Async Event Loops", done: true, tag: "Completed" },
          { name: "B-Tree & LSM Storage Engines (RocksDB)", done: false, tag: "In Progress" },
          { name: "PostgreSQL EXPLAIN ANALYZE Optimization", done: false, tag: "Up Next" },
        ],
      },
      {
        phase: "Phase 2: Distributed Messaging & Caching",
        topics: [
          { name: "Redis Caching Patterns & Invalidation", done: false, tag: "Locked" },
          { name: "Apache Kafka Partitions & Consumer Groups", done: false, tag: "Locked" },
          { name: "gRPC & Protocol Buffers at Scale", done: false, tag: "Locked" },
        ],
      },
      {
        phase: "Phase 3: Resilience & Consensus",
        topics: [
          { name: "Raft Consensus Algorithm Implementation", done: false, tag: "Locked" },
          { name: "Rate Limiting & Circuit Breaker Architecture", done: false, tag: "Locked" },
          { name: "Distributed Tracing with OpenTelemetry", done: false, tag: "Locked" },
        ],
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Engineering Specialist",
    badge: "Design Systems",
    desc: "Dive deep into the browser rendering pipeline, AST compilers, complex canvas/WebGL interactions, and WCAG accessibility.",
    duration: "8 Weeks • 32 Sprints",
    level: "All Levels",
    accent: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
    stages: [
      {
        phase: "Phase 1: Deep JavaScript & DOM Runtime",
        topics: [
          { name: "Event Loop, Microtasks & Web Workers", done: true, tag: "Completed" },
          { name: "Critical Rendering Path & Layout Thrashing", done: true, tag: "Completed" },
          { name: "TypeScript Generics & Conditional Types", done: false, tag: "Up Next" },
        ],
      },
      {
        phase: "Phase 2: Modern Framework Internals",
        topics: [
          { name: "React Fiber Architecture & Reconciliation", done: false, tag: "Locked" },
          { name: "Server-Driven UI & Hydration Strategies", done: false, tag: "Locked" },
          { name: "Custom Canvas 2D Data Visualizations", done: false, tag: "Locked" },
        ],
      },
    ],
  },
];

export default function RoadmapsPage({ onNavigate }) {
  const [activeTrack, setActiveTrack] = useState(TRACKS[0]);

  return (
    <div style={{ background: "var(--bg-canvas)", minHeight: "85vh", paddingBottom: "70px" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #090d16 0%, #0f172a 100%)",
        color: "#fff", padding: "50px 0 40px", borderBottom: "1px solid #1e293b",
      }}>
        <div className="ss-container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(51,102,204,0.15)", border: "1px solid rgba(91,141,239,0.3)", borderRadius: "9999px", padding: "6px 14px", marginBottom: "16px" }}>
            <Map size={14} color="#60a5fa" />
            <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#93c5fd", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              CAREER ROADMAPS & SKILL TREES
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Step-by-Step Learning Paths
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem", maxWidth: "600px", lineHeight: 1.6 }}>
            Structured, milestone-based curricula verified against real engineering rubrics. Skip what you already know and sprint through what matters.
          </p>

          {/* Track Tabs */}
          <div style={{ display: "flex", gap: "10px", marginTop: "32px", flexWrap: "wrap" }}>
            {TRACKS.map((t) => {
              const selected = activeTrack.id === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTrack(t)}
                  style={{
                    padding: "10px 18px", borderRadius: "10px",
                    border: selected ? "1px solid #60a5fa" : "1px solid rgba(255,255,255,0.12)",
                    background: selected ? "rgba(51,102,204,0.25)" : "rgba(255,255,255,0.04)",
                    color: selected ? "#fff" : "rgba(255,255,255,0.7)",
                    fontWeight: selected ? 700 : 500,
                    fontSize: "0.875rem", cursor: "pointer", transition: "all 0.18s ease",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}>
                  <span>{t.title}</span>
                  {t.badge && (
                    <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "9999px", background: selected ? "#3b82f6" : "rgba(255,255,255,0.1)", color: "#fff" }}>
                      {t.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Track View */}
      <div className="ss-container" style={{ maxWidth: "1140px", margin: "40px auto 0", padding: "0 20px" }}>
        {/* Track Overview Card */}
        <div style={{
          background: "#fff", border: "1px solid var(--outline-variant)",
          borderRadius: "16px", padding: "28px", marginBottom: "32px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "20px", boxShadow: "0 2px 12px rgba(15,23,42,0.04)",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--on-surface)" }}>{activeTrack.title}</h2>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: "9999px", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }}>
                {activeTrack.level}
              </span>
            </div>
            <p style={{ color: "var(--on-surface-variant)", fontSize: "0.9375rem", maxWidth: "680px", lineHeight: 1.55 }}>
              {activeTrack.desc}
            </p>
            <div style={{ display: "flex", gap: "18px", marginTop: "12px", fontSize: "0.8125rem", color: "var(--outline)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Clock size={14} /> {activeTrack.duration}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <ShieldCheck size={14} color="#059669" /> Industry Benchmark Verified
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={() => onNavigate?.("lesson")}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #3366cc, #5b8def)",
                color: "#fff", border: "none", borderRadius: "10px",
                padding: "12px 22px", fontWeight: 700, fontSize: "0.9rem",
                cursor: "pointer", boxShadow: "0 4px 14px rgba(51,102,204,0.35)",
              }}>
              <Terminal size={16} /> Launch Interactive Simulator
            </button>
          </div>
        </div>

        {/* Roadmap Phases Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {activeTrack.stages.map((stage, idx) => (
            <div
              key={stage.phase}
              style={{
                background: "#fff", border: "1px solid var(--outline-variant)",
                borderRadius: "16px", padding: "26px",
                boxShadow: "0 2px 10px rgba(15,23,42,0.03)",
              }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px", borderBottom: "1px solid var(--outline-variant)", paddingBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: "var(--primary-container)", color: "var(--primary)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "0.9rem",
                  }}>
                    {idx + 1}
                  </div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--on-surface)" }}>
                    {stage.phase}
                  </h3>
                </div>
                <span style={{ fontSize: "0.8125rem", color: "var(--outline)", fontWeight: 500 }}>
                  {stage.topics.filter(t => t.done).length} / {stage.topics.length} Complete
                </span>
              </div>

              {/* Topics Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
                {stage.topics.map((topic) => (
                  <div
                    key={topic.name}
                    style={{
                      border: topic.done ? "1px solid #a7f3d0" : "1px solid var(--outline-variant)",
                      background: topic.done ? "#f0fdf4" : "var(--surface-subtle)",
                      borderRadius: "10px", padding: "14px 16px",
                      display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px",
                    }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      {topic.done ? (
                        <CheckCircle2 size={18} color="#059669" style={{ marginTop: "2px", flexShrink: 0 }} />
                      ) : (
                        <Circle size={18} color="var(--outline)" style={{ marginTop: "2px", flexShrink: 0 }} />
                      )}
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: topic.done ? "#065f46" : "var(--on-surface)", lineHeight: 1.4 }}>
                          {topic.name}
                        </div>
                        <span style={{
                          display: "inline-block", marginTop: "6px",
                          fontSize: "0.7rem", fontWeight: 700,
                          padding: "2px 8px", borderRadius: "9999px",
                          background: topic.done ? "#dcfce7" : topic.tag === "Up Next" ? "#eff6ff" : "var(--surface-container)",
                          color: topic.done ? "#166534" : topic.tag === "Up Next" ? "#2563eb" : "var(--outline)",
                        }}>
                          {topic.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Practice & Next Steps Callout */}
        <div style={{
          marginTop: "36px", padding: "28px", borderRadius: "16px",
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
          color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "20px",
        }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", fontWeight: 700, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
              <Sparkles size={14} /> Ready for technical interviews?
            </div>
            <h4 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "6px" }}>
              Practice STAR Behavioral & Technical System Design Questions
            </h4>
            <p style={{ color: "#c7d2fe", fontSize: "0.875rem", maxWidth: "600px" }}>
              Test your knowledge against real interview rubrics curated from high-performing engineering teams.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate?.("interview")}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "#4f46e5", color: "#fff", border: "none",
              borderRadius: "10px", padding: "12px 20px", fontWeight: 700,
              fontSize: "0.875rem", cursor: "pointer", transition: "all 0.15s ease",
            }}>
            Interview Prep Section <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
