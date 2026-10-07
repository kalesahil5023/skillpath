import React from "react";

export default function TelemetryBar() {
  return (
    <section
      style={{
        width: "100%",
        background: "var(--surface)",
        borderBottom: "1px solid var(--outline-variant)",
        padding: "8px 0",
      }}
    >
      <div
        className="ss-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          fontFamily: "var(--font-mono)",
          fontSize: "0.6875rem",
          color: "var(--on-surface-variant)",
        }}
      >
        {/* Left Cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 600,
              color: "var(--tertiary)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--tertiary)",
                display: "inline-block",
                animation: "ping 1.2s cubic-bezier(0,0,0.2,1) infinite",
              }}
            />
            KERNEL: DETERMINISTIC CLUSTER ACTIVE
          </span>
          <span style={{ color: "var(--outline-variant)" }}>/</span>
          <span className="hide-mobile">SANDBOX RUNNER: JUDGE-0-V4 PROD</span>
          <span className="hide-mobile" style={{ color: "var(--outline-variant)" }}>/</span>
          <span
            className="hide-mobile"
            style={{ color: "var(--outline)", fontWeight: 500 }}
          >
            SYS LOAD: 0.18
          </span>
        </div>

        {/* Right Cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            className="hide-mobile"
            style={{ color: "var(--outline)" }}
          >
            EVALUATION METRIC: SHA-256 VERIFIED
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "2px 8px",
              background: "var(--surface-container)",
              borderRadius: 4,
              border: "1px solid var(--outline-variant)",
              color: "var(--on-surface)",
              fontWeight: 600,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 13, color: "var(--primary)" }}
            >
              verified
            </span>
            <span>1,842 AUDITS TODAY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
