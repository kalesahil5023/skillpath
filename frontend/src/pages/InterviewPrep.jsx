import React, { useState } from "react";

const HR_QUESTIONS = [
  { q: "Tell me about yourself.", tip: "Use the STAR method. Focus on your journey, key achievements, and why this role excites you.", category: "Introduction" },
  { q: "What is your greatest strength?", tip: "Pick a strength relevant to the role. Back it with a specific example.", category: "Behavioral" },
  { q: "Describe a time you faced a major challenge at work.", tip: "Structure: Situation → Task → Action → Result. Quantify results wherever possible.", category: "STAR Method" },
  { q: "Where do you see yourself in 5 years?", tip: "Show ambition aligned with the company's growth. Mention skill development.", category: "Career Goals" },
  { q: "Why do you want to leave your current job?", tip: "Stay positive. Focus on growth opportunities, not complaints about current role.", category: "Behavioral" },
  { q: "How do you handle tight deadlines?", tip: "Discuss prioritization, communication with stakeholders, and a real example.", category: "STAR Method" },
];

const TECH_QUESTIONS = [
  { q: "Reverse a linked list in O(n) time and O(1) space.", tip: "Use three pointers: prev, curr, next. Iterate and reverse links one by one.", category: "DSA", difficulty: "Medium" },
  { q: "Design a URL shortener like bit.ly.", tip: "Cover: hashing/encoding, DB schema (URL ↔ hash), redirect API, load balancing, caching.", category: "System Design", difficulty: "Hard" },
  { q: "What is the difference between useEffect and useLayoutEffect in React?", tip: "useEffect runs after paint. useLayoutEffect runs synchronously after DOM mutations. Use layout for measuring.", category: "Frontend", difficulty: "Medium" },
  { q: "Explain the CAP theorem.", tip: "Consistency, Availability, Partition Tolerance — a distributed system can guarantee only 2 of 3.", category: "System Design", difficulty: "Hard" },
  { q: "Find all subsets of a given set.", tip: "Use backtracking or bit manipulation. Time complexity O(2^n).", category: "DSA", difficulty: "Medium" },
  { q: "How does React reconciliation work?", tip: "React uses a virtual DOM diffing algorithm (Fiber). Compares trees and batches updates.", category: "Frontend", difficulty: "Easy" },
];

const DIFF_COLORS = { Easy: { bg: "#ecfdf5", text: "#059669", border: "#a7f3d0" }, Medium: { bg: "#fffbeb", text: "#d97706", border: "#fde68a" }, Hard: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" } };

function QuestionCard({ item, isHR }) {
  const [showTip, setShowTip] = useState(false);
  const [practiced, setPracticed] = useState(false);
  return (
    <div style={{
      background: "#fff", border: practiced ? "1.5px solid #059669" : "1px solid var(--outline-variant)",
      borderRadius: "12px", padding: "20px", transition: "all 0.2s ease",
      boxShadow: practiced ? "0 0 0 3px rgba(5,150,105,0.08)" : "none",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "12px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.6875rem", fontWeight: 700, padding: "3px 10px", borderRadius: "9999px", background: "var(--primary-container)", color: "var(--primary)" }}>{item.category}</span>
            {!isHR && item.difficulty && (
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, padding: "3px 10px", borderRadius: "9999px", background: DIFF_COLORS[item.difficulty].bg, color: DIFF_COLORS[item.difficulty].text, border: `1px solid ${DIFF_COLORS[item.difficulty].border}` }}>{item.difficulty}</span>
            )}
            {practiced && <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#059669", display: "flex", alignItems: "center", gap: "4px" }}><span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span>Done</span>}
          </div>
          <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--on-surface)", lineHeight: 1.5 }}>{item.q}</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button type="button" onClick={() => setShowTip(!showTip)}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "8px", border: "1px solid var(--outline-variant)", background: showTip ? "var(--primary-container)" : "transparent", fontSize: "0.8125rem", fontWeight: 600, color: showTip ? "var(--primary)" : "var(--on-surface-variant)", cursor: "pointer", transition: "all 0.15s" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>lightbulb</span>
          {showTip ? "Hide Tip" : "Show Tip"}
        </button>
        <button type="button" onClick={() => setPracticed(!practiced)}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "8px", border: practiced ? "1.5px solid #059669" : "1px solid var(--outline-variant)", background: practiced ? "#ecfdf5" : "transparent", fontSize: "0.8125rem", fontWeight: 600, color: practiced ? "#059669" : "var(--on-surface-variant)", cursor: "pointer", transition: "all 0.15s" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>{practiced ? "check_circle" : "radio_button_unchecked"}</span>
          {practiced ? "Practiced" : "Mark Practiced"}
        </button>
      </div>
      {showTip && (
        <div style={{ marginTop: "14px", padding: "14px 16px", borderRadius: "10px", background: "linear-gradient(135deg, #eff6ff, #e0f2fe)", border: "1px solid #bae6fd", fontSize: "0.875rem", color: "#0369a1", lineHeight: 1.6 }}>
          💡 <strong>Tip:</strong> {item.tip}
        </div>
      )}
    </div>
  );
}

export default function InterviewPrep({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("hr");
  const [filterCategory, setFilterCategory] = useState("All");

  const questions = activeTab === "hr" ? HR_QUESTIONS : TECH_QUESTIONS;
  const categories = ["All", ...new Set(questions.map((q) => q.category))];
  const filtered = filterCategory === "All" ? questions : questions.filter((q) => q.category === filterCategory);

  return (
    <section style={{ background: "var(--background)", padding: "64px 0 80px", minHeight: "80vh" }}>
      <div className="ss-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--primary-container)", border: "1px solid rgba(51,102,204,0.2)", borderRadius: "9999px", padding: "6px 16px", marginBottom: "16px" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: "var(--primary)" }}>psychology</span>
            <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Interview Prep</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--on-surface)", marginBottom: "12px" }}>
            Ace Your Next Interview
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--on-surface-variant)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Practice HR behavioral questions and technical challenges. Get instant tips and track your preparation progress.
          </p>
        </div>

        {/* Track Tabs */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px", justifyContent: "center" }}>
          {[
            { id: "hr", label: "HR Interview", icon: "groups", color: "#3366cc" },
            { id: "tech", label: "Technical Interview", icon: "terminal", color: "#7c3aed" },
          ].map((track) => (
            <button key={track.id} type="button" onClick={() => { setActiveTab(track.id); setFilterCategory("All"); }}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "14px 28px", borderRadius: "12px", border: "none", cursor: "pointer",
                fontSize: "0.9375rem", fontWeight: 700, transition: "all 0.2s ease",
                background: activeTab === track.id ? track.color : "var(--surface)",
                color: activeTab === track.id ? "#fff" : "var(--on-surface-variant)",
                boxShadow: activeTab === track.id ? `0 4px 20px ${track.color}40` : "var(--shadow-sm)",
                border: activeTab === track.id ? "none" : "1px solid var(--outline-variant)",
              }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{track.icon}</span>
              {track.label}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px", justifyContent: "center" }}>
          {categories.map((cat) => (
            <button key={cat} type="button" onClick={() => setFilterCategory(cat)}
              style={{
                padding: "6px 16px", borderRadius: "9999px", border: "1px solid var(--outline-variant)",
                fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                background: filterCategory === cat ? "var(--on-surface)" : "var(--surface)",
                color: filterCategory === cat ? "#fff" : "var(--on-surface-variant)",
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "16px" }}>
          {filtered.map((item, i) => <QuestionCard key={i} item={item} isHR={activeTab === "hr"} />)}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "48px", padding: "40px", background: "linear-gradient(135deg, #0f172a, #1e293b)", borderRadius: "20px", color: "#fff" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "12px" }}>🎯</div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "8px" }}>Ready for a real coding challenge?</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "20px", fontSize: "0.9375rem" }}>Put your skills to test in our live coding simulator.</p>
          <button type="button" onClick={() => onNavigate?.("lesson")}
            style={{ padding: "12px 28px", borderRadius: "10px", background: "linear-gradient(135deg, #3366cc, #5b8def)", border: "none", fontSize: "0.9375rem", fontWeight: 700, color: "#fff", cursor: "pointer", boxShadow: "0 4px 20px rgba(51,102,204,0.4)" }}>
            Launch Simulator
          </button>
        </div>
      </div>
    </section>
  );
}
