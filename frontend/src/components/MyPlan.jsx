import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { plansApi } from "../api/client";
import { CheckCircle, Circle, ArrowRight, RotateCcw, CloudCheck, Sparkles, Share2 } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

// ── Loading Skeleton ──────────────────────────────────────────────────────────
function PlanSkeleton() {
  return (
    <div className="card" style={{ padding: "40px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div style={{ width: "60%" }}>
          <div className="skeleton-title" style={{ width: "50%", marginBottom: "12px" }} />
          <div className="skeleton-text" style={{ width: "90%", marginBottom: "8px" }} />
          <div className="skeleton-text" style={{ width: "70%" }} />
        </div>
        <div className="skeleton" style={{ width: "100px", height: "34px", borderRadius: "6px" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton" style={{ height: "72px", borderRadius: "8px" }} />
        ))}
      </div>
      <div className="skeleton" style={{ height: "9px", borderRadius: "9999px", marginBottom: "28px" }} />
      <div style={{ display: "grid", gap: "12px" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton" style={{ height: "64px", borderRadius: "8px" }} />
        ))}
      </div>
    </div>
  );
}

export default function MyPlan({ savedPlan, onSelectRoadmap, onPlanReset }) {
  const { isLoggedIn, openAuthModal } = useAuth();
  const { addToast } = useToast();
  const [currentPlan, setCurrentPlan] = useState(savedPlan);
  const [loading, setLoading] = useState(false);
  // B6 FIX: Replace window.confirm with ConfirmModal state
  const [confirmReset, setConfirmReset] = useState(false);

  // ── 1. Plan Synchronization (PostgreSQL Cloud + LocalStorage Fallback) ──
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
          // Fallback to local storage if offline or backend is waking up
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

  // ── 2. Optimistic Checklist Toggle ───────────────────────────────────────
  const handleToggleDay = async (dayNumber) => {
    if (!currentPlan) return;

    const updatedChecklist = currentPlan.checklist.map((item) => {
      if (item.day === dayNumber) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    const targetItem = updatedChecklist.find((i) => i.day === dayNumber);
    const updatedPlan = { ...currentPlan, checklist: updatedChecklist };
    setCurrentPlan(updatedPlan);
    localStorage.setItem("skillpath_local_plan", JSON.stringify(updatedPlan));

    // U2: Toast on toggle
    addToast(
      targetItem.completed ? `✓ Day ${dayNumber} marked complete!` : `Day ${dayNumber} marked incomplete`,
      targetItem.completed ? "success" : "info",
      2000
    );

    if (isLoggedIn) {
      try {
        await plansApi.toggleChecklist(dayNumber, targetItem.completed);
      } catch (err) {
        console.error("Failed to sync checklist day with cloud:", err);
        addToast("Cloud sync failed — progress saved locally", "warning");
      }
    }
  };

  const handleReset = async () => {
    localStorage.removeItem("skillpath_local_plan");
    setCurrentPlan(null);
    setConfirmReset(false);

    if (isLoggedIn) {
      try {
        await plansApi.deletePlan();
      } catch (err) {
        console.error("Failed to delete cloud plan:", err);
      }
    }

    addToast("Plan reset successfully", "info");
    onPlanReset();
  };

  // F8: Social sharing
  const handleShare = async () => {
    const text = `I'm learning ${currentPlan.path} on SkillSprint! Day ${
      currentPlan.checklist.filter((i) => i.completed).length
    }/${currentPlan.checklist.length} complete. Join me! 🚀`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My SkillSprint Plan", text, url: window.location.href });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      addToast("Progress copied to clipboard!", "success");
    }
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
            Track your daily starter tasks. Your progress is saved automatically and synced with the cloud when logged in.
          </p>
        </div>

        {/* B5 FIX: Show skeleton while loading */}
        {loading ? (
          <PlanSkeleton />
        ) : currentPlan ? (
          <div className="card" style={{ padding: "40px 32px", backgroundColor: "var(--bg-surface)" }}>
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
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: "1.6rem", color: "var(--text-primary)" }}>Your 7-Day Action Plan</h3>
                  {isLoggedIn ? (
                    <span className="badge badge-green" title="Synced with Cloud Database">
                      <CloudCheck size={14} />
                      <span>Synced to Cloud</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openAuthModal("login")}
                      className="badge badge-amber"
                      style={{ cursor: "pointer", border: "none" }}
                      title="Click to sign up and save across devices"
                    >
                      <span>Device Only · Log in to Sync</span>
                    </button>
                  )}
                </div>
                <p style={{ maxWidth: "600px", color: "var(--text-secondary)" }}>{currentPlan.reason}</p>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleShare}
                  style={{ padding: "8px 12px", fontSize: "0.82rem" }}
                  title="Share your progress"
                >
                  <Share2 size={14} />
                  <span>Share</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setConfirmReset(true)}
                  style={{ color: "var(--text-muted)", padding: "8px 14px", fontSize: "0.85rem" }}
                >
                  <RotateCcw size={14} />
                  <span>Reset Plan</span>
                </button>
              </div>
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
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 800 }}>
                  Recommended Path
                </span>
                <strong style={{ display: "block", fontSize: "1.1rem", marginTop: "4px", color: "var(--text-primary)" }}>
                  {currentPlan.path}
                </strong>
              </div>

              <div
                style={{
                  padding: "16px",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 800 }}>
                  Skill Focus
                </span>
                <strong style={{ display: "block", fontSize: "1.1rem", marginTop: "4px", color: "var(--text-primary)" }}>
                  {currentPlan.recommendedSkill}
                </strong>
              </div>

              <div
                style={{
                  padding: "16px",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 800 }}>
                  Target Outcome
                </span>
                <strong style={{ display: "block", fontSize: "1.1rem", marginTop: "4px", color: "var(--text-primary)" }}>
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
                <span style={{ color: "var(--text-primary)" }}>Checklist Progress ({progressPercent}%)</span>
                <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                  {completedCount} of {totalCount} completed
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "9px",
                  background: "var(--border)",
                  borderRadius: "var(--radius-full)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progressPercent}%`,
                    background: progressPercent === 100
                      ? "linear-gradient(90deg, #059669, #10b981)"
                      : "var(--primary)",
                    borderRadius: "var(--radius-full)",
                    transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>
              {progressPercent === 100 && (
                <div style={{ textAlign: "center", marginTop: "12px", fontSize: "0.9rem", color: "var(--primary)", fontWeight: 700 }}>
                  🎉 All 7 days complete! You're on your way. Now explore your Roadmap.
                </div>
              )}
            </div>

            {/* Checklist items */}
            <div style={{ display: "grid", gap: "12px", marginBottom: "36px" }}>
              {currentPlan.checklist.map((item) => (
                <div
                  key={item.day}
                  role="checkbox"
                  aria-checked={item.completed}
                  tabIndex={0}
                  onClick={() => handleToggleDay(item.day)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleToggleDay(item.day)}
                  style={{
                    padding: "16px 20px",
                    borderRadius: "var(--radius-md)",
                    background: item.completed ? "var(--primary-light)" : "var(--bg-surface)",
                    border: item.completed ? "1.5px solid var(--primary-border)" : "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    boxShadow: item.completed ? "none" : "var(--shadow-xs)",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(5,150,105,0.2)")}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = item.completed ? "none" : "var(--shadow-xs)")}
                >
                  <div style={{ color: item.completed ? "var(--primary)" : "var(--border-medium)" }}>
                    {item.completed ? <CheckCircle size={22} color="var(--primary)" /> : <Circle size={22} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: item.completed ? "var(--primary-text)" : "var(--primary)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      Day {item.day}
                    </span>
                    <p
                      style={{
                        fontSize: "0.98rem",
                        marginTop: "2px",
                        color: item.completed ? "var(--text-muted)" : "var(--text-primary)",
                        textDecoration: item.completed ? "line-through" : "none",
                        fontWeight: item.completed ? 400 : 500,
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
                background: "var(--bg-subtle)",
                border: "1px solid var(--border)",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 800 }}>
                  Associated Roadmap
                </span>
                <h4 style={{ fontSize: "1.15rem", marginTop: "4px", color: "var(--text-primary)" }}>{currentPlan.roadmapName}</h4>
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
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
                background: "var(--primary-light)",
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
            <p style={{ fontSize: "1.05rem", marginBottom: "28px", color: "var(--text-muted)" }}>
              Take the quick 3-question Path Finder to generate your custom 7-day starter roadmap and unlock structured tracking.
            </p>
            <a href="#path-finder" className="btn btn-primary">
              <span>Launch Path Finder</span>
              <ArrowRight size={18} />
            </a>
          </div>
        )}
      </div>

      {/* B6 FIX: ConfirmModal instead of window.confirm */}
      <ConfirmModal
        isOpen={confirmReset}
        title="Reset your plan?"
        message="This will permanently delete your 7-day starter plan and all checklist progress. This cannot be undone."
        confirmLabel="Yes, Reset Plan"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleReset}
        onCancel={() => setConfirmReset(false)}
      />
    </section>
  );
}
