import React from "react";

export default function FinalCTA() {
  return (
    <section
      id="assessment-arena"
      style={{
        width: "100%",
        padding: "64px 0",
        background: "var(--surface-subtle)",
      }}
    >
      <div className="ss-container">
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--outline-variant)",
            borderRadius: 12,
            padding: "48px 40px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* Text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              maxWidth: 580,
            }}
          >
            <span className="eyebrow">Ready for Truth in Engineering?</span>
            <h2
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                fontWeight: 700,
                color: "var(--on-surface)",
                lineHeight: 1.25,
              }}
            >
              Run Your Baseline Simulation Now
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                color: "var(--on-surface-variant)",
                lineHeight: 1.7,
              }}
            >
              Take 15 minutes to run our live diagnostics. Receive your calibrated
              readiness score, identify your top 3 system gaps, and start your first
              sprint.
            </p>
          </div>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 12,
            }}
          >
            <a href="#" className="btn-primary" style={{ padding: "12px 24px", fontSize: "0.6875rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 17 }}>
                play_arrow
              </span>
              Start 15-Min Free Assessment
            </a>
            <a href="#skill-graph" className="btn-outline" style={{ padding: "12px 20px" }}>
              Explore All 24 Tracks
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
