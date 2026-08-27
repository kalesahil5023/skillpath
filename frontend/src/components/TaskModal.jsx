import React from "react";
import { X, CheckCircle2, ListChecks, HelpCircle, Target } from "lucide-react";

export default function TaskModal({ taskData, isOpen, onClose, onComplete, isCompleted }) {
  if (!isOpen || !taskData) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close task modal"
        >
          <X size={18} />
        </button>

        {/* Stage & Skill Badge */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px" }}>
          <span className="badge badge-green">Stage: {taskData.stageName}</span>
          <span className="badge badge-blue">{taskData.skillName}</span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: "1.65rem", marginBottom: "20px", color: "var(--text-primary)" }}>{taskData.task.title}</h3>

        {/* Objective */}
        <div
          style={{
            padding: "16px 20px",
            background: "var(--bg-subtle)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--primary)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "6px" }}>
            <Target size={16} />
            <span>Core Objective</span>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>{taskData.task.objective}</p>
        </div>

        {/* Why this matters */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-primary)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "6px" }}>
            <HelpCircle size={16} color="var(--primary)" />
            <span>Why this matters</span>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>{taskData.task.why}</p>
        </div>

        {/* Step-by-Step Instructions */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-primary)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "12px" }}>
            <ListChecks size={16} color="var(--primary)" />
            <span>Step-by-Step Action Items</span>
          </div>
          <ol style={{ paddingLeft: "20px", display: "grid", gap: "10px" }}>
            {taskData.task.steps.map((step, idx) => (
              <li key={idx} style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Expected Outcome */}
        <div
          style={{
            padding: "16px 20px",
            background: "var(--primary-light)",
            border: "1px solid var(--primary-border)",
            borderRadius: "var(--radius-md)",
            marginBottom: "32px",
          }}
        >
          <strong style={{ display: "block", color: "var(--primary-text)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "4px" }}>
            Expected Deliverable / Outcome
          </strong>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>{taskData.task.outcome}</p>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "14px" }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className={isCompleted ? "btn btn-secondary" : "btn btn-primary"}
            onClick={() => {
              onComplete(taskData.skillName, taskData.taskIndex, !isCompleted);
              onClose();
            }}
          >
            <CheckCircle2 size={18} />
            <span>{isCompleted ? "Mark Incomplete" : "Mark as Complete"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
