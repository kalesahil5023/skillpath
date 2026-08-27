import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { portfolioApi } from "../api/client";
import { Briefcase, Download, Trash2, ExternalLink, CloudCheck, Sparkles } from "lucide-react";

export default function PortfolioBuilder({ prefillData }) {
  const { isLoggedIn, openAuthModal } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillsUsed, setSkillsUsed] = useState("");
  const [toolsUsed, setToolsUsed] = useState("");
  const [outcome, setOutcome] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  const [savedEntries, setSavedEntries] = useState([]);
  const [previewEntry, setPreviewEntry] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Apply prefill data if transferred from ProjectBuilder or Roadmap
  useEffect(() => {
    if (prefillData) {
      if (prefillData.title) setTitle(prefillData.title);
      if (prefillData.description) setDescription(prefillData.description);
      if (prefillData.skillsUsed) setSkillsUsed(prefillData.skillsUsed);
      if (prefillData.toolsUsed) setToolsUsed(prefillData.toolsUsed);
      if (prefillData.outcome) setOutcome(prefillData.outcome);
    }
  }, [prefillData]);

  // Load user's saved portfolio entries from Django PostgreSQL
  useEffect(() => {
    const fetchEntries = async () => {
      if (isLoggedIn) {
        try {
          const res = await portfolioApi.getEntries();
          setSavedEntries(res.data);
          localStorage.setItem("skillpath_local_portfolio", JSON.stringify(res.data));
        } catch {
          const local = localStorage.getItem("skillpath_local_portfolio");
          if (local) setSavedEntries(JSON.parse(local));
        }
      } else {
        const local = localStorage.getItem("skillpath_local_portfolio");
        if (local) {
          try {
            setSavedEntries(JSON.parse(local));
          } catch {
            setSavedEntries([]);
          }
        }
      }
    };

    fetchEntries();
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSaving(true);
    const entryPayload = {
      title: title.trim(),
      description: description.trim(),
      skillsUsed: skillsUsed.trim(),
      toolsUsed: toolsUsed.trim(),
      outcome: outcome.trim(),
      projectUrl: projectUrl.trim() || null,
    };

    setPreviewEntry(entryPayload);

    if (isLoggedIn) {
      try {
        const res = await portfolioApi.createEntry(entryPayload);
        const newEntries = [res.data, ...savedEntries];
        setSavedEntries(newEntries);
        localStorage.setItem("skillpath_local_portfolio", JSON.stringify(newEntries));
      } catch (err) {
        console.error("Cloud entry save failed:", err);
      }
    } else {
      const localEntry = { ...entryPayload, id: Date.now() };
      const newEntries = [localEntry, ...savedEntries];
      setSavedEntries(newEntries);
      localStorage.setItem("skillpath_local_portfolio", JSON.stringify(newEntries));
    }

    setIsSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this portfolio entry?")) return;

    setSavedEntries((prev) => prev.filter((item) => item.id !== id));

    if (isLoggedIn) {
      try {
        await portfolioApi.deleteEntry(id);
      } catch (err) {
        console.error("Failed to delete entry:", err);
      }
    }
  };

  const handleDownload = (entry) => {
    const textContent = `=====================================================
PORTFOLIO CASE STUDY: ${entry.title.toUpperCase()}
=====================================================

WHAT I BUILT & THE CLIENT PROBLEM:
${entry.description}

SKILLS DEMONSTRATED:
${entry.skillsUsed || "None specified"}

TOOLS & TECHNOLOGIES UTILIZED:
${entry.toolsUsed || "None specified"}

MEASURABLE OUTCOMES & DELIVERABLES:
${entry.outcome || "Completed as practice brief"}

${entry.projectUrl ? `LIVE PROJECT DEMO URL:\n${entry.projectUrl}\n` : ""}
--
Documented via SkillSprint (https://skillsprint.example)
Guidance is educational. Verify credentials responsibly.`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${entry.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-portfolio-entry.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card" style={{ padding: "36px 30px", backgroundColor: "#ffffff" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "var(--primary-light)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Briefcase size={20} />
        </div>
        <h3 style={{ fontSize: "1.45rem", color: "var(--text-primary)" }}>Portfolio Entry Builder</h3>
      </div>
      <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "24px" }}>
        Assemble honest, clear case study descriptions for completed work. Download formatted text ready for Upwork, LinkedIn, or personal portfolio sites.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Project Title</label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. Accessible Coffee Roasters E-Commerce Landing Page"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={120}
          />
        </div>

        <div className="form-group">
          <label className="form-label">What did you build &amp; why?</label>
          <textarea
            className="form-textarea"
            placeholder="Describe the client or practice brief, the problem, and your technical solution..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="form-group">
            <label className="form-label">Skills Used</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. HTML5, CSS Grid, Responsive Design"
              value={skillsUsed}
              onChange={(e) => setSkillsUsed(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tools Used</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. VS Code, Chrome DevTools, Figma"
              value={toolsUsed}
              onChange={(e) => setToolsUsed(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Measurable Outcome / Deliverables</label>
          <textarea
            className="form-textarea"
            style={{ minHeight: "80px" }}
            placeholder="e.g. 100% Lighthouse score, zero layout shift, responsive down to 320px..."
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Live Project or Repo URL (Optional)</label>
          <input
            className="form-input"
            type="url"
            placeholder="https://github.com/yourhandle/project-repo"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%" }}
          disabled={isSaving}
        >
          <Sparkles size={16} />
          <span>{isSaving ? "Saving..." : "Save Case Study"}</span>
        </button>
      </form>

      {/* Live Preview of Last Generated Entry */}
      {previewEntry && (
        <div
          style={{
            marginTop: "32px",
            padding: "24px",
            borderRadius: "var(--radius-md)",
            background: "rgba(6, 14, 25, 0.85)",
            border: "1px solid rgba(77, 225, 178, 0.3)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span className="badge badge-accent">Ready for Deployment</span>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => handleDownload(previewEntry)}
            >
              <Download size={14} />
              <span>Download Text (.txt)</span>
            </button>
          </div>

          <h4 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>{previewEntry.title}</h4>
          <p style={{ fontSize: "0.95rem", marginBottom: "16px" }}>{previewEntry.description}</p>

          <div style={{ display: "grid", gap: "8px", fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
            <div><strong style={{ color: "var(--primary)" }}>Skills:</strong> {previewEntry.skillsUsed}</div>
            <div><strong style={{ color: "var(--secondary)" }}>Tools:</strong> {previewEntry.toolsUsed}</div>
            <div><strong style={{ color: "var(--accent)" }}>Outcome:</strong> {previewEntry.outcome}</div>
            {previewEntry.projectUrl && (
              <div>
                <strong style={{ color: "var(--text)" }}>Live URL:</strong>{" "}
                <a href={previewEntry.projectUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "underline" }}>
                  {previewEntry.projectUrl}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Saved Cloud Entries */}
      {savedEntries.length > 0 && (
        <div style={{ marginTop: "36px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h4 style={{ fontSize: "1.15rem" }}>
              Saved Portfolio Entries ({savedEntries.length})
            </h4>
            {isLoggedIn ? (
              <span className="badge badge-primary" style={{ fontSize: "0.72rem" }}>
                <CloudCheck size={12} />
                <span>PostgreSQL Synced</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="badge badge-warning"
                style={{ border: "none", cursor: "pointer", fontSize: "0.72rem" }}
              >
                <span>Save to Cloud</span>
              </button>
            )}
          </div>

          <div style={{ display: "grid", gap: "12px" }}>
            {savedEntries.map((entry) => (
              <div
                key={entry.id}
                style={{
                  padding: "16px 20px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(255, 255, 255, 0.025)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "14px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <strong style={{ display: "block", fontSize: "1rem" }}>{entry.title}</strong>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    {entry.skillsUsed || "General Project"}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleDownload(entry)}
                    title="Download formatted text"
                  >
                    <Download size={14} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleDelete(entry.id)}
                    style={{ color: "var(--danger)" }}
                    title="Delete entry"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
