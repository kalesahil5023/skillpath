import React, { useState } from "react";
import {
  GitBranch, ExternalLink, Award, Download,
  CheckCircle2, Calendar, Code2, Star, Shield, Globe,
  Sparkles, Flame, Check, Copy, Activity
} from "lucide-react";
import { useToast } from "../context/ToastContext";

const PORTFOLIO_DATA = {
  username: "SAHIL",
  displayName: "SAHIL ",
  headline: "Full-Stack Developer · Web Dev Sprint Alumni",
  bio: "Built 3 production-grade projects through SkillSprint's intensive sprint program. Focused on React, Node.js, and PostgreSQL.",
  careerScore: 91,
  streak: 14,
  sprintsCompleted: 2,
  githubUrl: "https://github.com/sahilkhan",
  skills: [
    { name: "React 19 & Next.js", level: 92, category: "Frontend" },
    { name: "Node.js & Express REST APIs", level: 88, category: "Backend" },
    { name: "PostgreSQL & Prisma ORM", level: 85, category: "Database" },
    { name: "System Architecture & Caching", level: 78, category: "Architecture" },
    { name: "Docker & CI/CD Pipelines", level: 74, category: "DevOps" },
  ],
  badges: [
    { name: "14-Day Streak", icon: "🔥", desc: "Two straight weeks of daily sprint missions" },
    { name: "Clean Architecture", icon: "💎", desc: "Top 5% score on code modularity and testing" },
    { name: "Zero-Bug Deployer", icon: "🛡️", desc: "100% test pass rate on automated CI runner" },
    { name: "Squad Leader", icon: "⚡", desc: "Helped 4 squad mates resolve blockers" },
  ],
  projects: [
    {
      id: "p1",
      title: "JWT Authentication & Role Security API",
      description: "A production-ready REST API with JWT-based authentication, refresh tokens, role-based access control (RBAC), and automated Jest test coverage.",
      tags: ["Node.js", "Express", "PostgreSQL", "JWT", "Jest"],
      githubUrl: "https://github.com/sahilkhan/jwt-auth-api",
      deployUrl: "https://jwt-api.vercel.app",
      completedDate: "Oct 5, 2026",
      certHash: "ss-2026-a4f3b1e9c2d7",
      track: "Web Dev Sprint",
      testsPassed: 12,
    },
    {
      id: "p2",
      title: "Real-Time Collaborative Kanban Board",
      description: "A Kanban-style task management app with fluid drag-and-drop, real-time sync via WebSockets, and a robust PostgreSQL persistence layer.",
      tags: ["React", "Node.js", "WebSockets", "PostgreSQL", "Tailwind"],
      githubUrl: "https://github.com/sahilkhan/react-taskboard",
      deployUrl: "https://taskboard-demo.vercel.app",
      completedDate: "Sep 20, 2026",
      certHash: "ss-2026-b9e2c5f1a3d8",
      track: "Web Dev Sprint",
      testsPassed: 9,
    },
    {
      id: "p3",
      title: "Distributed Rate Limiter Service",
      description: "Token bucket & sliding window rate limiting middleware implemented with Redis cluster, capable of sustaining 25,000 req/sec benchmark loads.",
      tags: ["Node.js", "Redis", "Docker", "Microservices"],
      githubUrl: "https://github.com/sahilkhan/distributed-rate-limiter",
      deployUrl: "https://rate-limiter.vercel.app",
      completedDate: "Aug 15, 2026",
      certHash: "ss-2026-c7e1f4d9a2b5",
      track: "Backend Systems",
      testsPassed: 16,
    },
  ],
  certificates: [
    {
      id: "c1",
      title: "Full-Stack Web Dev Sprint — Module 1",
      issuedDate: "Sep 25, 2026",
      hash: "ss-2026-b9e2c5f1a3d8",
      track: "Web Development",
    },
    {
      id: "c2",
      title: "Backend Concurrency & Distributed Systems",
      issuedDate: "Aug 20, 2026",
      hash: "ss-2026-c7e1f4d9a2b5",
      track: "Backend Engineering",
    },
  ],
};

// ── Activity Grid ─────────────────────────────────────────────────────────────
function ActivityGrid() {
  // 12 weeks of 7 days
  const days = Array.from({ length: 84 }).map((_, i) => {
    const val = (i * 7 + 13) % 5;
    return val;
  });

  const colors = ["#f1f5f9", "#bbf7d0", "#86efac", "#4ade80", "#16a34a"];

  return (
    <div style={{ marginTop: "12px", overflowX: "auto" }}>
      <div style={{ display: "grid", gridTemplateRows: "repeat(7, 10px)", gridAutoFlow: "column", gap: "3px" }}>
        {days.map((level, idx) => (
          <div
            key={idx}
            style={{
              width: "10px", height: "10px", borderRadius: "2px",
              background: colors[level],
            }}
            title={`Day ${idx + 1}: ${level * 2} sprint missions`}
          />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px", marginTop: "8px", fontSize: "0.7rem", color: "var(--outline)" }}>
        <span>Less</span>
        {colors.map((c, i) => (
          <div key={i} style={{ width: "8px", height: "8px", borderRadius: "2px", background: c }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

// ── QR Placeholder ─────────────────────────────────────────────────────────────
function QRPlaceholder({ hash }) {
  return (
    <div style={{
      width: "72px", height: "72px", display: "grid",
      gridTemplateColumns: "repeat(7,1fr)", gap: "1.5px",
      padding: "6px", background: "#fff", borderRadius: "6px",
      border: "1px solid var(--border)", flexShrink: 0
    }}>
      {Array.from({ length: 49 }).map((_, i) => {
        const corners = [0,1,2,6,7,13,14,21,35,42,43,48,47,46,41,40];
        const dark = corners.includes(i) || (Math.sin(i * 17.3 + hash.charCodeAt(i % hash.length)) > 0.2);
        return <div key={i} style={{ background: dark ? "#0f172a" : "transparent", borderRadius: "1px" }} />;
      })}
    </div>
  );
}

// ── Certificate Card ───────────────────────────────────────────────────────────
function CertificateCard({ cert }) {
  const { showToast } = useToast?.() || { showToast: (m) => alert(m) };

  const handleVerify = () => {
    navigator.clipboard?.writeText?.(`https://skillsprint.online/verify/${cert.hash}`);
    showToast("Verification URL copied to clipboard! 📋");
  };

  const handleDownload = () => {
    showToast(`Downloading verified certificate ${cert.title}... 📄`);
  };

  return (
    <div style={{
      border: "2px solid #059669", borderRadius: "14px",
      padding: "20px", background: "linear-gradient(135deg, #f0fdf4, #fff)",
      position: "relative", overflow: "hidden", marginBottom: "16px",
    }}>
      <div style={{
        position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px",
        borderRadius: "50%", background: "rgba(5,150,105,0.06)"
      }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Award size={18} color="#059669" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#059669", letterSpacing: "0.06em" }}>VERIFIED CREDENTIAL</span>
          </div>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "6px", color: "#0f172a" }}>{cert.title}</h3>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "12px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Calendar size={12} /> {cert.issuedDate}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Shield size={12} /> {cert.hash}
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleDownload}
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "6px 12px", borderRadius: "6px", border: "none",
                background: "#059669", color: "#fff", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              }}>
              <Download size={13} /> Download PDF
            </button>
            <button
              type="button"
              onClick={handleVerify}
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "6px 12px", borderRadius: "6px", border: "1px solid #d1d5db",
                background: "#fff", color: "#374151", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              }}>
              <Globe size={13} /> Verify Online
            </button>
          </div>
        </div>
        <QRPlaceholder hash={cert.hash} />
      </div>
    </div>
  );
}

// ── Project Card ───────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  return (
    <div className="card" style={{ padding: "24px", background: "#fff", border: "1px solid var(--outline-variant)", borderRadius: "12px", marginBottom: "16px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "9999px", background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0" }}>
              {project.track}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
              <CheckCircle2 size={12} color="#059669" /> {project.testsPassed} test suites passing
            </span>
          </div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--on-surface)", marginBottom: "6px" }}>
            {project.title}
          </h3>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 12px", background: "#0f172a", borderRadius: "7px", color: "#fff", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}>
            <GitBranch size={13} /> GitHub
          </a>
          <a href={project.deployUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 12px", background: "var(--primary)", borderRadius: "7px", color: "#fff", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}>
            <ExternalLink size={13} /> Live Demo
          </a>
        </div>
      </div>
      <p style={{ fontSize: "0.88rem", color: "var(--on-surface-variant)", lineHeight: 1.6, marginBottom: "14px" }}>
        {project.description}
      </p>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
        {project.tags.map((t) => (
          <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--surface-container)", border: "1px solid var(--outline-variant)", color: "var(--on-surface)", fontSize: "0.72rem", padding: "3px 8px", borderRadius: "6px", fontWeight: 500 }}>
            <Code2 size={10} /> {t}
          </span>
        ))}
      </div>
      <div style={{ padding: "10px 14px", background: "var(--surface-subtle)", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", color: "var(--outline)" }}>
        <Shield size={12} color="var(--primary)" />
        <span>SHA-256 Hash: <code style={{ fontFamily: "monospace", color: "var(--on-surface)", fontWeight: 600 }}>{project.certHash}</code></span>
        <span>· Completed {project.completedDate}</span>
      </div>
    </div>
  );
}

// ── Portfolio Page ─────────────────────────────────────────────────────────────
export default function Portfolio() {
  const p = PORTFOLIO_DATA;

  return (
    <div style={{ background: "var(--bg-canvas)", minHeight: "80vh", paddingBottom: "80px" }}>
      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg, #090d16 0%, #0f172a 100%)",
        padding: "60px 0 0", borderBottom: "1px solid #1e293b"
      }}>
        <div className="ss-container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", paddingBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
              {/* Avatar */}
              <div style={{
                width: "84px", height: "84px", borderRadius: "50%",
                background: "linear-gradient(135deg, #3366cc, #5b8def)",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: "1.7rem", border: "3px solid #334155", flexShrink: 0,
                boxShadow: "0 4px 20px rgba(51,102,204,0.3)"
              }}>SK</div>
              <div>
                <div style={{ fontSize: "0.78rem", color: "#60a5fa", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "4px" }}>
                  skillsprint.online/@{p.username}
                </div>
                <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>{p.displayName}</h1>
                <p style={{ fontSize: "0.95rem", color: "#94a3b8", marginBottom: "12px" }}>{p.headline}</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}>
                    <GitBranch size={14} /> GitHub Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              {[
                { label: "Career Score", value: p.careerScore, icon: Star, color: "#d97706" },
                { label: "Day Streak", value: p.streak, emoji: "🔥", color: "#ea580c" },
                { label: "Sprints Done", value: p.sprintsCompleted, icon: Award, color: "#059669" },
              ].map((s) => (
                <div key={s.label} style={{
                  textAlign: "center", padding: "16px 20px", background: "#1e293b",
                  border: "1px solid #334155", borderRadius: "12px", minWidth: "90px"
                }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                    {s.emoji || ""}{s.value}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "4px", fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="ss-container" style={{ maxWidth: "1140px", margin: "40px auto 0", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px" }} className="portfolio-grid">

          {/* Left Column: Projects & Verified Activity */}
          <div>
            {/* Verified Projects */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "8px", color: "var(--on-surface)" }}>
                  <Code2 size={20} color="var(--primary)" /> Verified Project Portfolio
                  <span style={{ fontSize: "0.82rem", color: "var(--outline)", fontWeight: 500 }}>({p.projects.length} completed)</span>
                </h2>
              </div>
              <div>
                {p.projects.map((proj) => <ProjectCard key={proj.id} project={proj} />)}
              </div>
            </div>

            {/* Weekly Activity Heatmap */}
            <div style={{ background: "#fff", border: "1px solid var(--outline-variant)", borderRadius: "12px", padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                  <Activity size={16} color="var(--primary)" /> Sprint Activity Matrix
                </h3>
                <span style={{ fontSize: "0.78rem", color: "#059669", fontWeight: 700 }}>
                  14-Day Active Streak
                </span>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--outline)", marginTop: "4px" }}>
                Verified code submissions and daily micro-sprints over the past 12 weeks.
              </p>
              <ActivityGrid />
            </div>
          </div>

          {/* Right Column: Bio, Skills Radar, Badges, Certs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Bio Card */}
            <div style={{ background: "#fff", border: "1px solid var(--outline-variant)", borderRadius: "12px", padding: "20px" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "10px", color: "var(--on-surface)" }}>About Engineer</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--on-surface-variant)", lineHeight: 1.65 }}>{p.bio}</p>
            </div>

            {/* Skills Competency */}
            <div style={{ background: "#fff", border: "1px solid var(--outline-variant)", borderRadius: "12px", padding: "20px" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "16px", color: "var(--on-surface)" }}>
                Verified Skill Competencies
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {p.skills.map((s) => (
                  <div key={s.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "5px" }}>
                      <span>{s.name}</span>
                      <span style={{ color: "var(--primary)" }}>{s.level}%</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", background: "var(--surface-container)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${s.level}%`, height: "100%", background: "linear-gradient(90deg, #3366cc, #5b8def)", borderRadius: "3px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Badges */}
            <div style={{ background: "#fff", border: "1px solid var(--outline-variant)", borderRadius: "12px", padding: "20px" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "14px", color: "var(--on-surface)" }}>
                Earned Badges
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {p.badges.map((b) => (
                  <div key={b.name} style={{
                    padding: "12px", borderRadius: "10px",
                    background: "var(--surface-subtle)", border: "1px solid var(--outline-variant)",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "1.4rem", marginBottom: "4px" }}>{b.icon}</div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--on-surface)" }}>{b.name}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--outline)", marginTop: "2px", lineHeight: 1.3 }}>{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px", color: "var(--on-surface)" }}>
                <Award size={18} color="#059669" /> Certificates of Mastery
              </h3>
              {p.certificates.map((c) => <CertificateCard key={c.id} cert={c} />)}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
