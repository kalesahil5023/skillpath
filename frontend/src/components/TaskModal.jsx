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
          <span className="badge badge-primary">Stage: {taskData.stageName}</span>
          <span className="badge badge-secondary">{taskData.skillName}</span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: "1.65rem", marginBottom: "20px" }}>{taskData.task.title}</h3>

        {/* Objective */}
        <div
          style={{
            padding: "16px 20px",
            background: "rgba(115, 215, 255, 0.06)",
            border: "1px solid rgba(115, 215, 255, 0.18)",
            borderRadius: "var(--radius-md)",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--primary)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "6px" }}>
            <Target size={16} />
            <span>Core Objective</span>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--text)" }}>{taskData.task.objective}</p>
        </div>

        {/* Why this matters */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--secondary)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "6px" }}>
            <HelpCircle size={16} />
            <span>Why this matters</span>
          </div>
          <p style={{ fontSize: "0.95rem" }}>{taskData.task.why}</p>
        </div>

        {/* Step-by-Step Instructions */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "12px" }}>
            <ListChecks size={16} />
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
            background: "rgba(77, 225, 178, 0.06)",
            border: "1px solid rgba(77, 225, 178, 0.2)",
            borderRadius: "var(--radius-md)",
            marginBottom: "32px",
          }}
        >
          <strong style={{ display: "block", color: "var(--accent)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "4px" }}>
            Expected Deliverable / Outcome
          </strong>
          <p style={{ fontSize: "0.95rem", color: "var(--text)" }}>{taskData.task.outcome}</p>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "14px" }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className={isCompleted ? "btn btn-secondary" : "btn btn-accent"}
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
