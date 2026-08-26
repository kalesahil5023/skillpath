import React, { useState } from "react";
import { PROJECT_TEMPLATES } from "../data/skillsData";
import { useAuth } from "../context/AuthContext";
import { portfolioApi } from "../api/client";
import { Sparkles, Layers, CheckCircle2, Cloud, ArrowRight } from "lucide-react";

export default function ProjectBuilder({ onSendToPortfolio }) {
  const { isLoggedIn } = useAuth();
  const [skill, setSkill] = useState("Web Development");
  const [title, setTitle] = useState("");
  const [generatedBrief, setGeneratedBrief] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentTemplate = PROJECT_TEMPLATES[skill];

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const brief = {
      skill,
      projectType: currentTemplate.type,
      title: title.trim(),
      objective: currentTemplate.objective,
      requirements: currentTemplate.requirements,
      steps: currentTemplate.steps,
      deliverables: currentTemplate.deliverables,
      skills: currentTemplate.skills,
      portfolioStarter: `Created ${title.trim()}, a ${currentTemplate.type.toLowerCase()} demonstrating ${currentTemplate.skills.join(", ")}. Developed as a rigorous proof-of-work project solving real client requirements.`,
    };

    setGeneratedBrief(brief);
    setSavedSuccess(false);

    if (isLoggedIn) {
      setIsSaving(true);
      portfolioApi
        .createProject({
          skill,
          projectType: currentTemplate.type,
          title: title.trim(),
        })
        .then(() => setSavedSuccess(true))
        .catch((err) => console.error("Cloud project save failed:", err))
        .finally(() => setIsSaving(false));
    }
  };

  return (
    <div className="glass-card" style={{ padding: "36px 30px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "rgba(115, 215, 255, 0.15)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Layers size={20} />
        </div>
        <h3 style={{ fontSize: "1.45rem" }}>Project Plan Generator</h3>
      </div>
      <p style={{ fontSize: "0.95rem", marginBottom: "24px" }}>
        Turn a broad skill into a concrete, client-ready practice brief with clear requirements and deliverables.
      </p>

      <form onSubmit={handleGenerate}>
        <div className="form-group">
          <label className="form-label">Select Skill Discipline</label>
          <select
            className="form-select"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          >
            {Object.keys(PROJECT_TEMPLATES).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Project Type</label>
          <input
            className="form-input"
            type="text"
            value={currentTemplate.type}
            disabled
            style={{ opacity: 0.8 }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Custom Project Title</label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. Modern Landing Page for Heritage Roasters"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={120}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }}>
          <span>Generate Structured Project Brief</span>
        </button>
      </form>

      {generatedBrief && (
        <div
          style={{
            marginTop: "32px",
            padding: "24px",
            borderRadius: "var(--radius-md)",
            background: "rgba(6, 14, 25, 0.85)",
            border: "1px solid rgba(115, 215, 255, 0.3)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span className="badge badge-accent">{generatedBrief.projectType}</span>
            {isLoggedIn && savedSuccess && (
              <span className="badge badge-primary" style={{ fontSize: "0.75rem" }}>
                <Cloud size={12} />
                <span>Saved to Cloud</span>
              </span>
            )}
          </div>

          <h4 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>{generatedBrief.title}</h4>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
            <strong>Objective:</strong> {generatedBrief.objective}
          </p>

          {/* Requirements */}
          <div style={{ marginBottom: "16px" }}>
            <strong style={{ display: "block", color: "var(--primary)", fontSize: "0.88rem", textTransform: "uppercase", marginBottom: "6px" }}>
              Technical Requirements
            </strong>
            <ul style={{ paddingLeft: "20px", display: "grid", gap: "6px" }}>
              {generatedBrief.requirements.map((req, idx) => (
                <li key={idx} style={{ fontSize: "0.9rem", color: "var(--text)" }}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Action Steps */}
          <div style={{ marginBottom: "16px" }}>
            <strong style={{ display: "block", color: "var(--secondary)", fontSize: "0.88rem", textTransform: "uppercase", marginBottom: "6px" }}>
              Execution Steps
            </strong>
            <ol style={{ paddingLeft: "20px", display: "grid", gap: "6px" }}>
              {generatedBrief.steps.map((stp, idx) => (
                <li key={idx} style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{stp}</li>
              ))}
            </ol>
          </div>

          {/* Deliverables */}
          <div style={{ marginBottom: "20px" }}>
            <strong style={{ display: "block", color: "var(--accent)", fontSize: "0.88rem", textTransform: "uppercase", marginBottom: "6px" }}>
              Expected Deliverables
            </strong>
            <ul style={{ paddingLeft: "20px", display: "grid", gap: "6px" }}>
              {generatedBrief.deliverables.map((del, idx) => (
                <li key={idx} style={{ fontSize: "0.9rem", color: "var(--text)" }}>{del}</li>
              ))}
            </ul>
          </div>

          {/* Send to Portfolio Builder CTA */}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onSendToPortfolio({
              title: generatedBrief.title,
              description: generatedBrief.objective,
              skillsUsed: generatedBrief.skills.join(", "),
              toolsUsed: "VS Code, Chrome DevTools, Git",
              outcome: generatedBrief.deliverables.join("; "),
            })}
            style={{ width: "100%" }}
          >
            <span>Transfer Details to Portfolio Builder</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
