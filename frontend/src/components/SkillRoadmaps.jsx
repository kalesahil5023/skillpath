import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  SKILL_ROADMAPS,
  ROADMAP_RESOURCES,
  RESOURCE_CATALOG,
} from "../data/skillsData";
import { roadmapsApi } from "../api/client";
import TaskModal from "./TaskModal";
import {
  Code2,
  Palette,
  PenTool,
  Video,
  FileSpreadsheet,
  Share2,
  CheckCircle2,
  Circle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function SkillRoadmaps({ activeSkill, onSkillChange, onSendToPortfolio }) {
  const { isLoggedIn } = useAuth();
  const [selectedSkill, setSelectedSkill] = useState(activeSkill || "Web Development");
  const [skillProgress, setSkillProgress] = useState({});
  const [activeModalTask, setActiveModalTask] = useState(null);

  const skillsList = [
    { name: "Web Development", icon: Code2 },
    { name: "Graphic Design", icon: Palette },
    { name: "Content Writing", icon: PenTool },
    { name: "Video Editing", icon: Video },
    { name: "Excel & Data", icon: FileSpreadsheet },
    { name: "Social Media Management", icon: Share2 },
  ];

  // Sync prop changes
  useEffect(() => {
    if (activeSkill) {
      setSelectedSkill(activeSkill);
    }
  }, [activeSkill]);

  // Load progress from Django API or localStorage
  useEffect(() => {
    const loadProgress = async () => {
      if (isLoggedIn) {
        try {
          const res = await roadmapsApi.getProgress();
          if (res.data.progress) {
            setSkillProgress(res.data.progress);
            localStorage.setItem("skillpath_roadmap_progress", JSON.stringify(res.data.progress));
          }
        } catch {
          const saved = localStorage.getItem("skillpath_roadmap_progress");
          if (saved) setSkillProgress(JSON.parse(saved));
        }
      } else {
        const saved = localStorage.getItem("skillpath_roadmap_progress");
        if (saved) {
          try {
            setSkillProgress(JSON.parse(saved));
          } catch {
            setSkillProgress({});
          }
        }
      }
    };

    loadProgress();
  }, [isLoggedIn]);

  const handleTaskToggle = async (skill, taskIndex, completed) => {
    const updatedSkillMap = {
      ...(skillProgress[skill] || {}),
      [taskIndex]: completed,
    };
    const updatedTotalProgress = {
      ...skillProgress,
      [skill]: updatedSkillMap,
    };

    setSkillProgress(updatedTotalProgress);
    localStorage.setItem("skillpath_roadmap_progress", JSON.stringify(updatedTotalProgress));

    if (isLoggedIn) {
      try {
        await roadmapsApi.updateProgress(skill, taskIndex, completed);
      } catch (err) {
        console.error("Cloud progress sync failed:", err);
      }
    }
  };

  const currentRoadmap = SKILL_ROADMAPS[selectedSkill];
  const currentSkillProgress = skillProgress[selectedSkill] || {};

  // Compute total tasks for selected skill
  let totalTasks = 0;
  currentRoadmap.stages.forEach((stg) => {
    totalTasks += stg.tasks.length;
  });

  let completedTasks = 0;
  Object.values(currentSkillProgress).forEach((status) => {
    if (status) completedTasks += 1;
  });

  const progressPercent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  let globalTaskIndex = 0;

  return (
    <section id="skill-roadmaps" className="section-spacing">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} />
            <span>30-Day Step-by-Step Blueprints</span>
          </div>
          <h2>Explore Core Skill Roadmaps</h2>
          <p>
            Choose a discipline below to access a 5-stage roadmap: Learn fundamentals, Practice exercises, Build projects, assemble a Portfolio, and Find paying work.
          </p>
        </div>

        {/* Skill Category Selector Tabs */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "16px",
            marginBottom: "36px",
            scrollbarWidth: "none",
          }}
        >
          {skillsList.map((skillItem) => {
            const Icon = skillItem.icon;
            const isSelected = selectedSkill === skillItem.name;
            return (
              <button
                key={skillItem.name}
                type="button"
                onClick={() => {
                  setSelectedSkill(skillItem.name);
                  onSkillChange(skillItem.name);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 20px",
                  borderRadius: "var(--radius-md)",
                  background: isSelected ? "var(--primary-light)" : "#ffffff",
                  border: isSelected ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                  color: isSelected ? "var(--primary-text)" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.95rem",
                  fontWeight: isSelected ? 700 : 600,
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                  boxShadow: isSelected ? "var(--shadow-xs)" : "none",
                }}
              >
                <Icon size={18} color={isSelected ? "var(--primary)" : "var(--text-muted)"} />
                <span>{skillItem.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Roadmap Container */}
        <div className="card" style={{ padding: "40px 32px", backgroundColor: "#ffffff" }}>
          {/* Header & Meta */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "24px",
              marginBottom: "36px",
              paddingBottom: "28px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
                <span className="badge badge-green">{selectedSkill}</span>
                <span className="badge badge-blue">{currentRoadmap.difficulty}</span>
              </div>
              <h3 style={{ fontSize: "2rem", marginBottom: "10px", color: "var(--text-primary)" }}>{selectedSkill} Roadmap</h3>
              <p style={{ maxWidth: "680px", fontSize: "1.05rem", color: "var(--text-secondary)" }}>{currentRoadmap.description}</p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "6px" }}>
                <strong style={{ color: "var(--text-primary)" }}>Ideal for:</strong> {currentRoadmap.suitable}
              </p>
            </div>

            {/* Progress Box */}
            <div
              style={{
                background: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "20px",
                minWidth: "240px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.85rem", fontWeight: 700 }}>
                <span style={{ color: "var(--primary)" }}>ROADMAP MILESTONES</span>
                <span style={{ color: "var(--text-primary)" }}>{progressPercent}%</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#e2e8f0",
                  borderRadius: "var(--radius-full)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progressPercent}%`,
                    background: "var(--primary)",
                    borderRadius: "var(--radius-full)",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>
          </div>

          {/* 5 Stages Grid */}
          <div style={{ display: "grid", gap: "28px" }}>
            {currentRoadmap.stages.map((stage, stageIdx) => (
              <div
                key={stage.name}
                style={{
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "var(--primary-light)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                    }}
                  >
                    0{stageIdx + 1}
                  </span>
                  <h4 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>Stage {stageIdx + 1}: {stage.name}</h4>
                </div>

                <div style={{ display: "grid", gap: "12px" }}>
                  {stage.tasks.map((task) => {
                    const taskIndex = globalTaskIndex++;
                    const isDone = !!currentSkillProgress[taskIndex];

                    return (
                      <div
                        key={task.title}
                        style={{
                          padding: "16px 20px",
                          borderRadius: "var(--radius-sm)",
                          background: isDone ? "var(--primary-light)" : "#ffffff",
                          border: isDone ? "1.5px solid var(--primary-border)" : "1px solid var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "16px",
                          flexWrap: "wrap",
                          boxShadow: isDone ? "none" : "var(--shadow-xs)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            flex: 1,
                            minWidth: "260px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleTaskToggle(selectedSkill, taskIndex, !isDone)}
                        >
                          <div style={{ color: isDone ? "var(--accent)" : "var(--text-muted)" }}>
                            {isDone ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                          </div>
                          <div>
                            <strong
                              style={{
                                display: "block",
                                fontSize: "1rem",
                                color: isDone ? "var(--text-muted)" : "var(--text)",
                                textDecoration: isDone ? "line-through" : "none",
                              }}
                            >
                              {task.title}
                            </strong>
                            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                              {task.objective.slice(0, 95)}...
                            </span>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() =>
                              setActiveModalTask({
                                stageName: stage.name,
                                skillName: selectedSkill,
                                task,
                                taskIndex,
                              })
                            }
                          >
                            <span>Inspect Task</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Resources for this Skill */}
          <div
            style={{
              marginTop: "40px",
              paddingTop: "28px",
              borderTop: "1px solid var(--border)",
            }}
          >
            <h4 style={{ marginBottom: "16px", fontSize: "1.2rem" }}>
              Verified Tools &amp; Official Documentation for {selectedSkill}
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {(ROADMAP_RESOURCES[selectedSkill] || []).map((resourceId) => {
                const resource = RESOURCE_CATALOG[resourceId];
                if (!resource) return null;
                return (
                  <div
                    key={resource.id}
                    style={{
                      padding: "20px",
                      borderRadius: "var(--radius-md)",
                      background: "rgba(255, 255, 255, 0.025)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 700 }}>
                          {resource.category}
                        </span>
                        <span className="badge badge-primary">{resource.pricingType}</span>
                      </div>
                      <h5 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>{resource.name}</h5>
                      <p style={{ fontSize: "0.88rem", marginBottom: "14px" }}>{resource.description}</p>
                    </div>

                    <a
                      href={resource.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ alignSelf: "flex-start" }}
                    >
                      <span>Official Link</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Task Inspection Modal */}
      <TaskModal
        isOpen={!!activeModalTask}
        taskData={activeModalTask}
        onClose={() => setActiveModalTask(null)}
        onComplete={handleTaskToggle}
        isCompleted={
          activeModalTask
            ? !!(skillProgress[activeModalTask.skillName] || {})[activeModalTask.taskIndex]
            : false
        }
      />
    </section>
  );
}
