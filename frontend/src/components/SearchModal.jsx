/**
 * ============================================================================
 * SearchModal — Global Search over Courses, Roadmap Tasks & Resources
 * ============================================================================
 * Triggered by the search button in the Navbar.
 * Searches across: courses (PopularCourses), roadmap tasks (SKILL_ROADMAPS),
 * and resources (RESOURCE_CATALOG).
 */

import React, { useState, useEffect, useRef } from "react";
import { Search, X, BookOpen, Map, Link2, ArrowRight } from "lucide-react";
import { SKILL_ROADMAPS, RESOURCE_CATALOG } from "../data/skillsData";

const COURSES = [
  { id: "web-dev-pro", title: "Modern Full-Stack Engineering with React & Django", category: "Web Development" },
  { id: "python-dsa-mastery", title: "Data Structures & Algorithms: The Technical Interview", category: "Python & DSA" },
  { id: "applied-ml", title: "Applied Machine Learning & Neural Network Pipelines", category: "Machine Learning" },
  { id: "cybersec-defense", title: "Practical Network Defense & Web Security Protocols", category: "Cybersecurity" },
  { id: "cloud-devops", title: "Production DevOps: Docker, Kubernetes & CI/CD Pipelines", category: "Cloud & Systems" },
  { id: "foundations-cs", title: "Computer Systems Fundamentals: Memory, OS & Networks", category: "Python & DSA" },
];

function buildSearchIndex() {
  const results = [];

  // Courses
  COURSES.forEach((c) => {
    results.push({ type: "course", title: c.title, subtitle: c.category, href: "#popular-courses", icon: "course" });
  });

  // Roadmap tasks
  Object.entries(SKILL_ROADMAPS).forEach(([skill, roadmap]) => {
    roadmap.stages.forEach((stage) => {
      stage.tasks.forEach((task) => {
        results.push({
          type: "task",
          title: task.title,
          subtitle: `${skill} · Stage: ${stage.name}`,
          href: "#skill-roadmaps",
          icon: "task",
          skill,
        });
      });
    });
  });

  // Resources
  Object.values(RESOURCE_CATALOG).forEach((res) => {
    results.push({
      type: "resource",
      title: res.name,
      subtitle: res.category,
      href: "#resources",
      icon: "resource",
      url: res.officialUrl,
    });
  });

  return results;
}

const ALL_ITEMS = buildSearchIndex();

const ICONS = {
  course: <BookOpen size={16} />,
  task: <Map size={16} />,
  resource: <Link2 size={16} />,
};

const TYPE_COLORS = {
  course: { bg: "#ecfdf5", color: "#065f46" },
  task: { bg: "#eff6ff", color: "#1e40af" },
  resource: { bg: "#fffbeb", color: "#92400e" },
};

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard shortcut Escape to close
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.trim().length < 2
    ? []
    : ALL_ITEMS.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 12);

  const handleSelect = (item) => {
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(15,23,42,0.15)",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          margin: "60px auto auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Search size={20} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search courses, roadmap tasks, resources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "1.05rem",
              color: "var(--text-primary)",
              background: "transparent",
              fontFamily: "var(--font-body)",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{ color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
          <kbd
            style={{
              padding: "3px 8px",
              background: "var(--bg-subtle)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              fontFamily: "monospace",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {query.trim().length < 2 ? (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--text-muted)", fontSize: "0.92rem" }}>
              <Search size={32} style={{ marginBottom: "12px", opacity: 0.3 }} />
              <p>Type at least 2 characters to search</p>
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--text-muted)", fontSize: "0.92rem" }}>
              <p>No results found for <strong>"{query}"</strong></p>
            </div>
          ) : (
            <div style={{ padding: "8px" }}>
              {results.map((item, idx) => {
                const typeStyle = TYPE_COLORS[item.type];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(item)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.1s",
                      fontFamily: "var(--font-body)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-subtle)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: typeStyle.bg,
                        color: typeStyle.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {ICONS[item.type]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "0.92rem",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.title}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
                        {item.subtitle}
                      </div>
                    </div>
                    <ArrowRight size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div
          style={{
            padding: "10px 20px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: "16px",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          <span><kbd style={{ padding: "2px 5px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "3px", fontFamily: "monospace" }}>↑↓</kbd> navigate</span>
          <span><kbd style={{ padding: "2px 5px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "3px", fontFamily: "monospace" }}>↵</kbd> open</span>
          <span>{results.length > 0 && `${results.length} results`}</span>
        </div>
      </div>
    </div>
  );
}
