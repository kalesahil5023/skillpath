import React, { useState } from "react";
import { useSprint } from "../context/SprintContext";

const TABS = ["Global", "Squad", "This Week"];
const AVATAR_COLORS = ["#3366cc","#059669","#7c3aed","#d97706","#e11d48","#0891b2","#be185d","#65a30d"];
const CROWN_COLORS = ["#FFD700","#C0C0C0","#CD7F32"];
const GLOW_COLORS = ["rgba(255,215,0,0.3)","rgba(192,192,192,0.2)","rgba(205,127,50,0.2)"];

function RankBadge({ rank }) {
  if (rank === 1) return <span style={{ fontSize: "1.4rem" }}>🥇</span>;
  if (rank === 2) return <span style={{ fontSize: "1.4rem" }}>🥈</span>;
  if (rank === 3) return <span style={{ fontSize: "1.4rem" }}>🥉</span>;
  return <span style={{ fontWeight: 800, fontSize: "0.9rem", color: "#94a3b8" }}>#{rank}</span>;
}

export default function Leaderboard({ standalone = true }) {
  const { globalLeaderboard, squad } = useSprint();
  const [tab, setTab] = useState("Global");

  const squadEntries = squad
    .map((m, i) => ({ rank: i + 1, name: m.name, avatar: m.avatar, score: m.score, streak: m.streak, change: 0, isYou: m.name === "Sahil Khan" }))
    .sort((a, b) => b.score - a.score)
    .map((e, i) => ({ ...e, rank: i + 1 }));

  const entries = tab === "Squad" ? squadEntries : globalLeaderboard;

  return (
    <div style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #0f172a 100%)", minHeight: standalone ? "80vh" : "auto", padding: standalone ? "56px 0" : "0" }}>
      <div className={standalone ? "ss-container" : ""} style={{ maxWidth: standalone ? "860px" : "100%", margin: "0 auto" }}>

        {standalone && (
          <div style={{ marginBottom: "40px", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "9999px", padding: "6px 16px", marginBottom: "16px" }}>
              <span style={{ fontSize: "1rem" }}>🏆</span>
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#FFD700", letterSpacing: "0.05em", textTransform: "uppercase" }}>RANKINGS</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>Sprint Leaderboard</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9375rem", maxWidth: "480px", margin: "0 auto" }}>
              Compete with your squad and the global community. Live rankings based on Career Score, streak, and missions.
            </p>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "6px" }}>
          {TABS.map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)}
              style={{
                flex: 1, padding: "8px 16px", borderRadius: "8px", border: "none", cursor: "pointer",
                fontSize: "0.875rem", fontWeight: 600,
                background: tab === t ? "rgba(255,255,255,0.12)" : "transparent",
                color: tab === t ? "#fff" : "rgba(255,255,255,0.45)",
                transition: "all 0.2s ease",
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        {entries.length >= 3 && (
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "16px", marginBottom: "40px", padding: "0 16px" }}>
            {[entries[1], entries[0], entries[2]].map((e, pIdx) => {
              const podiumH = ["120px", "156px", "100px"];
              const rankOrder = [2, 1, 3];
              const rank = rankOrder[pIdx];
              return (
                <div key={e?.rank ?? pIdx} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, maxWidth: "200px" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}</div>
                  <div style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${AVATAR_COLORS[e?.rank % AVATAR_COLORS.length]}, ${AVATAR_COLORS[(e?.rank + 2) % AVATAR_COLORS.length]})`,
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "1rem", marginBottom: "10px",
                    border: `3px solid ${CROWN_COLORS[rank - 1]}`,
                    boxShadow: `0 0 20px ${GLOW_COLORS[rank - 1]}, 0 0 40px ${GLOW_COLORS[rank - 1]}`,
                  }}>{e?.avatar}</div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff", marginBottom: "6px", textAlign: "center" }}>{e?.name} {e?.isYou && <span style={{ color: "#5b8def", fontSize: "0.7rem" }}>(you)</span>}</div>
                  <div style={{
                    width: "100%", height: podiumH[pIdx],
                    background: rank === 1
                      ? "linear-gradient(180deg, rgba(255,215,0,0.2), rgba(255,215,0,0.08))"
                      : rank === 2
                      ? "linear-gradient(180deg, rgba(192,192,192,0.15), rgba(192,192,192,0.05))"
                      : "linear-gradient(180deg, rgba(205,127,50,0.15), rgba(205,127,50,0.05))",
                    border: `1px solid ${CROWN_COLORS[rank - 1]}40`,
                    borderRadius: "12px 12px 0 0",
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", gap: "4px",
                  }}>
                    <span style={{ fontSize: "1.75rem", fontWeight: 900, color: "#fff" }}>{e?.score}</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: CROWN_COLORS[rank - 1], letterSpacing: "0.08em" }}>SCORE</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Rankings Table */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "grid", gridTemplateColumns: "48px 1fr 90px 90px 70px 60px", gap: "8px", fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <span>#</span><span>Player</span><span style={{ textAlign: "center" }}>Score</span>
            <span style={{ textAlign: "center" }}>Streak</span><span style={{ textAlign: "center" }}>XP</span><span style={{ textAlign: "center" }}>Trend</span>
          </div>
          {entries.map((e, i) => (
            <div key={i} style={{
              padding: "14px 20px", display: "grid",
              gridTemplateColumns: "48px 1fr 90px 90px 70px 60px",
              gap: "8px", alignItems: "center",
              background: e.isYou ? "rgba(51,102,204,0.12)" : "transparent",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              transition: "background 0.15s",
              borderLeft: e.isYou ? "3px solid #3366cc" : "3px solid transparent",
            }}
            onMouseEnter={(el) => { if (!e.isYou) el.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={(el) => { if (!e.isYou) el.currentTarget.style.background = "transparent"; }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><RankBadge rank={i + 1} /></div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
                  background: `linear-gradient(135deg, ${AVATAR_COLORS[e.rank % AVATAR_COLORS.length]}, ${AVATAR_COLORS[(e.rank + 3) % AVATAR_COLORS.length]})`,
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", fontWeight: 700,
                  boxShadow: i < 3 ? `0 0 12px ${GLOW_COLORS[i]}` : "none",
                }}>{e.avatar}</div>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff" }}>
                    {e.name} {e.isYou && <span style={{ color: "#5b8def", fontSize: "0.7rem", fontWeight: 600 }}>(you)</span>}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>Web Dev Track</div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff" }}>{e.score}</span>
                <div style={{ height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", marginTop: "4px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min((e.score / 100) * 100, 100)}%`, background: "linear-gradient(90deg, #3366cc, #5b8def)", borderRadius: "2px" }} />
                </div>
              </div>
              <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                <span style={{ fontSize: "1rem" }}>🔥</span>
                <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#ea580c" }}>{e.streak}</span>
              </div>
              <div style={{ textAlign: "center", fontSize: "0.8rem", color: "#a78bfa", fontWeight: 600 }}>
                {((e.score * 52) + 480).toLocaleString()}
              </div>
              <div style={{ textAlign: "center" }}>
                {(e.change || 0) > 0 ? <span style={{ color: "#10b981", fontSize: "0.8rem", fontWeight: 700 }}>↑{e.change}</span>
                  : (e.change || 0) < 0 ? <span style={{ color: "#ef4444", fontSize: "0.8rem", fontWeight: 700 }}>↓{Math.abs(e.change)}</span>
                  : <span style={{ color: "#64748b", fontSize: "0.8rem" }}>–</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
