import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { plansApi } from "../api/client";
import { CheckCircle, Circle, ArrowRight, RotateCcw, CloudCheck, Sparkles, AlertCircle } from "lucide-react";

export default function MyPlan({ savedPlan, onSelectRoadmap, onPlanReset }) {
  const { isLoggedIn, openAuthModal } = useAuth();
  const [currentPlan, setCurrentPlan] = useState(savedPlan);
  const [loading, setLoading] = useState(false);

  // Sync with prop or load from Django / localStorage
  useEffect(() => {
    if (savedPlan) {
      setCurrentPlan(savedPlan);
      return;
    }

    const fetchPlan = async () => {
      if (isLoggedIn) {
        setLoading(true);
        try {
          const res = await plansApi.getPlan();
          if (res.data.plan) {
            setCurrentPlan(res.data.plan);
            localStorage.setItem("skillpath_local_plan", JSON.stringify(res.data.plan));
          }
        } catch {
          // fallback
          const local = localStorage.getItem("skillpath_local_plan");
          if (local) setCurrentPlan(JSON.parse(local));
        } finally {
          setLoading(false);
        }
      } else {
        const local = localStorage.getItem("skillpath_local_plan");
        if (local) {
          try {
            setCurrentPlan(JSON.parse(local));
          } catch {
            setCurrentPlan(null);
          }
        }
      }
    };

    fetchPlan();
  }, [savedPlan, isLoggedIn]);

  const handleToggleDay = async (dayNumber) => {
    if (!currentPlan) return;

    const updatedChecklist = currentPlan.checklist.map((item) => {
      if (item.day === dayNumber) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    const updatedPlan = { ...currentPlan, checklist: updatedChecklist };
    setCurrentPlan(updatedPlan);
    localStorage.setItem("skillpath_local_plan", JSON.stringify(updatedPlan));

    if (isLoggedIn) {
      const targetItem = updatedChecklist.find((i) => i.day === dayNumber);
      try {
        await plansApi.toggleChecklist(dayNumber, targetItem.completed);
      } catch (err) {
        console.error("Failed to sync checklist day:", err);
      }
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Are you sure you want to reset your saved starter plan?")) return;

    localStorage.removeItem("skillpath_local_plan");
    setCurrentPlan(null);

    if (isLoggedIn) {
      try {
        await plansApi.deletePlan();
      } catch (err) {
        console.error("Failed to delete cloud plan:", err);
      }
    }

    onPlanReset();
  };

  const completedCount = currentPlan?.checklist?.filter((item) => item.completed).length || 0;
  const totalCount = currentPlan?.checklist?.length || 7;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <section id="my-plan" className="section-spacing">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} />
            <span>Active Momentum</span>
          </div>
          <h2>My Plan &amp; 7-Day Checklist</h2>
          <p>
            Track your daily starter tasks. Your progress is saved automatically and synced with PostgreSQL when logged in.
          </p>
        </div>

        {currentPlan ? (
          <div className="glass-card" style={{ padding: "40px 32px" }}>
            {/* Header with Title & Cloud Sync Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
                paddingBottom: "24px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <h3 style={{ fontSize: "1.6rem" }}>Your 7-Day Action Plan</h3>
                  {isLoggedIn ? (
                    <span className="badge badge-accent" title="Synced with PostgreSQL Database">
                      <CloudCheck size={14} />
                      <span>Synced to Cloud</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openAuthModal("login")}
                      className="badge badge-warning"
                      style={{ border: "none", cursor: "pointer" }}
                      title="Click to sign up and save across devices"
                    >
                      <span>Device Only · Log in to Sync</span>
                    </button>
                  )}
                </div>
                <p style={{ maxWidth: "600px" }}>{currentPlan.reason}</p>
              </div>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleReset}
                style={{ color: "var(--text-muted)" }}
              >
                <RotateCcw size={14} />
                <span>Reset Plan</span>
              </button>
            </div>

            {/* Plan Metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                margin: "28px 0",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  background: "rgba(255, 255, 255, 0.025)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 800 }}>
                  Recommended Path
                </span>
                <strong style={{ display: "block", fontSize: "1.1rem", marginTop: "4px" }}>
                  {currentPlan.path}
                </strong>
              </div>

              <div
                style={{
                  padding: "16px",
                  background: "rgba(255, 255, 255, 0.025)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 800 }}>
                  Skill Focus
                </span>
                <strong style={{ display: "block", fontSize: "1.1rem", marginTop: "4px" }}>
                  {currentPlan.recommendedSkill}
                </strong>
              </div>

              <div
                style={{
                  padding: "16px",
                  background: "rgba(255, 255, 255, 0.025)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 800 }}>
                  Target Outcome
                </span>
                <strong style={{ display: "block", fontSize: "1.1rem", marginTop: "4px" }}>
                  {currentPlan.goal}
                </strong>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: "32px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  marginBottom: "10px",
                }}
              >
                <span>Checklist Progress ({progressPercent}%)</span>
                <span style={{ color: "var(--primary)" }}>
                  {completedCount} of {totalCount} completed
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "10px",
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "var(--radius-full)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progressPercent}%`,
                    background: "linear-gradient(90deg, var(--primary), var(--accent))",
                    borderRadius: "var(--radius-full)",
                    transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>
            </div>

            {/* Checklist items */}
            <div style={{ display: "grid", gap: "12px", marginBottom: "36px" }}>
              {currentPlan.checklist.map((item) => (
                <div
                  key={item.day}
                  onClick={() => handleToggleDay(item.day)}
                  style={{
                    padding: "16px 20px",
                    borderRadius: "var(--radius-md)",
                    background: item.completed ? "rgba(77, 225, 178, 0.08)" : "rgba(255, 255, 255, 0.03)",
                    border: item.completed ? "1px solid rgba(77, 225, 178, 0.3)" : "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ color: item.completed ? "var(--accent)" : "var(--text-muted)" }}>
                    {item.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: item.completed ? "var(--accent)" : "var(--primary)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      Day {item.day}
                    </span>
                    <p
                      style={{
                        fontSize: "1rem",
                        marginTop: "2px",
                        color: item.completed ? "var(--text-muted)" : "var(--text)",
                        textDecoration: item.completed ? "line-through" : "none",
                      }}
                    >
                      {item.task}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Roadmap Link action */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
                padding: "20px 24px",
                borderRadius: "var(--radius-md)",
                background: "rgba(115, 215, 255, 0.06)",
                border: "1px solid rgba(115, 215, 255, 0.2)",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 800 }}>
                  Associated Roadmap
                </span>
                <h4 style={{ fontSize: "1.15rem", marginTop: "4px" }}>{currentPlan.roadmapName}</h4>
                <p style={{ fontSize: "0.88rem" }}>
                  Dive into the 5 structured stages (Learn, Practice, Build, Portfolio, Find Work) for this skill.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onSelectRoadmap(currentPlan.roadmapName)}
              >
                <span>Continue Roadmap</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div
            className="glass-card"
            style={{
              padding: "56px 32px",
              textAlign: "center",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(115, 215, 255, 0.1)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <Sparkles size={32} />
            </div>
            <h3 style={{ fontSize: "1.75rem", marginBottom: "12px" }}>No Active Plan Saved Yet</h3>
            <p style={{ fontSize: "1.05rem", marginBottom: "28px" }}>
              Take the quick 3-question Path Finder to generate your custom 7-day starter roadmap and unlock structured tracking.
            </p>
            <a href="#path-finder" className="btn btn-primary">
              <span>Launch Path Finder</span>
              <ArrowRight size={18} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
