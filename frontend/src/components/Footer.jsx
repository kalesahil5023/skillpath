import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        background: "var(--surface)",
        borderTop: "1px solid var(--outline-variant)",
        padding: "24px 0",
      }}
    >
      <div
        className="ss-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          fontFamily: "var(--font-body)",
          fontSize: "0.6875rem",
          color: "var(--on-surface-variant)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.625rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--outline)",
            }}
          >
            VERIFICATION ENGINE SHA-256
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--on-surface)",
              fontWeight: 500,
            }}
          >
            v4.18.0-prod
          </span>
        </div>
        <span>
          © 2025 SkillSprint Systems Inc. All execution traces deterministic and
          cryptographically verified.
        </span>
      </div>
    </footer>
  );
}
