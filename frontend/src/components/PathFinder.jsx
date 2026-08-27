import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getRecommendation,
  PATH_DETAILS,
  SKILL_RECOMMENDATIONS,
  PATH_DIFFICULTY,
  WEEKLY_TIME,
  ROADMAP_LINKS,
} from "../data/skillsData";
import { plansApi } from "../api/client";
import { Sparkles, Check, ArrowRight, RotateCcw, Cloud, BookmarkCheck, AlertCircle } from "lucide-react";

export default function PathFinder({ onPlanSaved, onSelectRoadmap }) {
  const { isLoggedIn, openAuthModal } = useAuth();

  const [skills, setSkills] = useState([]);
  const [time, setTime] = useState("");
  const [goal, setGoal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const availableSkills = ["Technology", "Design", "Writing", "Social Media", "Data/Excel", "Video"];
  const availableTimes = ["Less than 1 hour", "1–2 hours", "2–4 hours", "4+ hours"];
  const availableGoals = ["Side income", "Long-term income", "Remote job", "Build a business"];

  const answeredCount = (skills.length > 0 ? 1 : 0) + (time ? 1 : 0) + (goal ? 1 : 0);

  const handleSkillToggle = (skill) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (skills.length === 0) {
      setErrorMessage("Please select at least one skill or interest.");
      return;
    }
    if (!time) {
      setErrorMessage("Please select your daily time commitment.");
      return;
    }
    if (!goal) {
      setErrorMessage("Please select your primary career goal.");
      return;
    }

    setErrorMessage("");
    // 1. Calculate weighted recommendation based on user answers
    const result = getRecommendation(skills, time, goal);
    const path = result.primary;
    const details = PATH_DETAILS[path];
    const recommendedSkill = SKILL_RECOMMENDATIONS[path][skills[0]] || "Foundational Skills";
    const roadmapName = ROADMAP_LINKS[path][skills[0]] || "Web Development";

    // 2. Synthesize personal rationale explaining why this path matches their criteria
    const reason = `Your interests in ${skills.join(", ")}, daily availability of ${time.toLowerCase()}, and ambition for ${goal.toLowerCase()} make ${path} the most sustainable starting point.`;

    // 3. Assemble personalized 7-day starter checklist
    const checklist = details.checklist.map((item, idx) => ({
      day: idx + 1,
      task: idx === 0 ? `${item} Start with ${recommendedSkill.toLowerCase()} where possible.` : item,
      completed: false,
    }));

    const computedPlan = {
      path,
      recommendedSkill,
      reason,
      time,
      goal,
      roadmapName,
      difficulty: PATH_DIFFICULTY[path],
      weeklyHours: WEEKLY_TIME[time],
      runnerUp: result.runnerUp,
      checklist,
    };

    setRecommendation(computedPlan);
    setSaveSuccess(false);

    setTimeout(() => {
      document.getElementById("pathResult")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  /**
   * Persists the computed starter plan:
   * - Immediately stores to localStorage for instant client access.
   * - If logged in, sends POST /api/plans/ to synchronize with PostgreSQL.
   * - Automatically scrolls smoothly to the MyPlan section.
   */
  const handleSavePlan = async () => {
    if (!recommendation) return;
    setIsSaving(true);

    // Save to local storage cache immediately
    localStorage.setItem("skillpath_local_plan", JSON.stringify(recommendation));

    if (isLoggedIn) {
      try {
        await plansApi.savePlan(recommendation);
        setSaveSuccess(true);
        onPlanSaved(recommendation);
      } catch (err) {
        console.error("Cloud save failed:", err);
        // Fallback saved locally
        setSaveSuccess(true);
        onPlanSaved(recommendation);
      }
    } else {
      setSaveSuccess(true);
      onPlanSaved(recommendation);
    }

    setIsSaving(false);

    setTimeout(() => {
      document.getElementById("my-plan")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  };

  const handleReset = () => {
    setSkills([]);
    setTime("");
    setGoal("");
    setRecommendation(null);
    setErrorMessage("");
    setSaveSuccess(false);
  };

  return (
    <section id="path-finder" className="section-spacing" style={{ backgroundColor: "var(--bg-canvas)" }}>
      <div className="container">
        <div className="card" style={{ padding: "48px 36px", backgroundColor: "#ffffff" }}>
          {/* Header */}
          <div style={{ maxWidth: "720px", marginBottom: "36px" }}>
            <div className="eyebrow">
              <Sparkles size={14} />
              <span>Interactive Decision Engine</span>
            </div>
            <h2>Find Your Best Learning &amp; Earning Direction</h2>
            <p style={{ marginTop: "12px", fontSize: "1.05rem", color: "var(--text-muted)" }}>
              Answer three quick questions to receive a tailored, credible recommendation. This is practical educational guidance, not an inflated income claim.
            </p>

            {/* Progress Track */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginTop: "24px",
                color: "var(--text-muted)",
                fontSize: "0.88rem",
              }}
            >
              <div
                style={{
                  flex: "0 0 160px",
                  height: "8px",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-full)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(answeredCount / 3) * 100}%`,
                    background: "var(--primary)",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                {answeredCount} of 3 answered
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Question 1: Skills */}
            <fieldset
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                marginBottom: "24px",
                background: "#ffffff",
              }}
            >
              <legend style={{ padding: "0 8px", fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>
                1. What skills or interests do you have?
              </legend>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: "6px 0 18px" }}>
                Select all that appeal to you.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                }}
              >
                {availableSkills.map((skill) => {
                  const isChecked = skills.includes(skill);
                  return (
                    <label
                      key={skill}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "14px 18px",
                        borderRadius: "var(--radius-sm)",
                        background: isChecked ? "var(--primary-light)" : "var(--bg-subtle)",
                        border: isChecked ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                        color: isChecked ? "var(--primary-text)" : "var(--text-primary)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        fontWeight: isChecked ? 700 : 500,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSkillToggle(skill)}
                        style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
                      />
                      <span>{skill}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Question 2: Time Commitment */}
            <fieldset
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                marginBottom: "24px",
                background: "#ffffff",
              }}
            >
              <legend style={{ padding: "0 8px", fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>
                2. How much time can you realistically invest per day?
              </legend>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: "6px 0 18px" }}>
                Consistency beats cramming. Choose an honest daily allotment.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                }}
              >
                {availableTimes.map((t) => {
                  const isSelected = time === t;
                  return (
                    <label
                      key={t}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "14px 18px",
                        borderRadius: "var(--radius-sm)",
                        background: isSelected ? "var(--primary-light)" : "var(--bg-subtle)",
                        border: isSelected ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                        color: isSelected ? "var(--primary-text)" : "var(--text-primary)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        fontWeight: isSelected ? 700 : 500,
                      }}
                    >
                      <input
                        type="radio"
                        name="time"
                        value={t}
                        checked={isSelected}
                        onChange={() => {
                          setTime(t);
                          setErrorMessage("");
                        }}
                        style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
                      />
                      <span>{t}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Question 3: Primary Goal */}
            <fieldset
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                marginBottom: "24px",
                background: "#ffffff",
              }}
            >
              <legend style={{ padding: "0 8px", fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)" }}>
                3. What is your primary career outcome?
              </legend>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: "6px 0 18px" }}>
                Select what success looks like over the next 6–12 months.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                }}
              >
                {availableGoals.map((g) => {
                  const isSelected = goal === g;
                  return (
                    <label
                      key={g}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "14px 18px",
                        borderRadius: "var(--radius-sm)",
                        background: isSelected ? "var(--primary-light)" : "var(--bg-subtle)",
                        border: isSelected ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                        color: isSelected ? "var(--primary-text)" : "var(--text-primary)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        fontWeight: isSelected ? 700 : 500,
                      }}
                    >
                      <input
                        type="radio"
                        name="goal"
                        value={g}
                        checked={isSelected}
                        onChange={() => {
                          setGoal(g);
                          setErrorMessage("");
                        }}
                        style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
                      />
                      <span>{g}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Validation Error Message */}
            {errorMessage && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--danger)",
                  marginBottom: "20px",
                  fontSize: "0.95rem",
                }}
              >
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button type="submit" className="btn btn-primary" style={{ padding: "14px 28px" }}>
                <span>Calculate My Starting Path</span>
                <ArrowRight size={18} />
              </button>
              {recommendation && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-secondary"
                  style={{ padding: "14px 20px" }}
                >
                  <RotateCcw size={16} />
                  <span>Reset Questions</span>
                </button>
              )}
            </div>
          </form>

          {/* Computed Recommendation Display */}
          {recommendation && (
            <div
              id="pathResult"
              style={{
                marginTop: "48px",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#ffffff",
                border: "1.5px solid var(--primary-border)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              {/* Result Header */}
              <div
                style={{
                  padding: "32px",
                  background: "linear-gradient(135deg, #ecfdf5, #f0fdf4)",
                  borderBottom: "1px solid var(--primary-border)",
                }}
              >
                <span className="badge badge-green" style={{ marginBottom: "12px" }}>
                  Personalized Recommendation
                </span>
                <h3 style={{ fontSize: "2rem", marginBottom: "10px", color: "var(--text-primary)" }}>
                  Start with {recommendation.path}
                </h3>
                <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)" }}>{recommendation.reason}</p>
              </div>

              {/* Details Metrics */}
              <div style={{ padding: "32px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                    marginBottom: "32px",
                  }}
                >
                  <div
                    style={{
                      padding: "18px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 800 }}>
                      Skill to Prioritize
                    </span>
                    <strong style={{ display: "block", fontSize: "1.1rem", marginTop: "6px", color: "var(--text-primary)" }}>
                      {recommendation.recommendedSkill}
                    </strong>
                  </div>

                  <div
                    style={{
                      padding: "18px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 800 }}>
                      Difficulty Level
                    </span>
                    <strong style={{ display: "block", fontSize: "1.1rem", marginTop: "6px", color: "var(--text-primary)" }}>
                      {recommendation.difficulty}
                    </strong>
                  </div>

                  <div
                    style={{
                      padding: "18px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 800 }}>
                      Time Commitment
                    </span>
                    <strong style={{ display: "block", fontSize: "1.1rem", marginTop: "6px" }}>
                      {recommendation.weeklyHours}
                    </strong>
                  </div>
                </div>

                {/* 7-Day Starter Checklist Preview */}
                <h4 style={{ marginBottom: "16px" }}>Your Personalized 7-Day Starter Plan</h4>
                <div
                  style={{
                    display: "grid",
                    gap: "10px",
                    marginBottom: "32px",
                  }}
                >
                  {recommendation.checklist.map((item) => (
                    <div
                      key={item.day}
                      style={{
                        padding: "14px 18px",
                        background: "rgba(255, 255, 255, 0.025)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        display: "flex",
                        gap: "14px",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          color: "var(--primary)",
                          minWidth: "55px",
                        }}
                      >
                        DAY {item.day}
                      </span>
                      <span style={{ fontSize: "0.95rem", color: "var(--text)" }}>{item.task}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons on Result */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
                  <button
                    type="button"
                    className="btn btn-accent"
                    onClick={handleSavePlan}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <span>Saving to Account...</span>
                    ) : saveSuccess ? (
                      <>
                        <BookmarkCheck size={18} />
                        <span>Saved to My Plan!</span>
                      </>
                    ) : (
                      <>
                        <Cloud size={18} />
                        <span>Save to My Plan {isLoggedIn ? "(Cloud Sync)" : ""}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => onSelectRoadmap(recommendation.roadmapName)}
                  >
                    <span>View {recommendation.roadmapName} Roadmap</span>
                    <ArrowRight size={16} />
                  </button>

                  {!isLoggedIn && (
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      💡{" "}
                      <button
                        type="button"
                        onClick={() => openAuthModal("login")}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--primary)",
                          cursor: "pointer",
                          textDecoration: "underline",
                          fontFamily: "inherit",
                        }}
                      >
                        Log in or register
                      </button>{" "}
                      to sync this plan across all your devices.
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
