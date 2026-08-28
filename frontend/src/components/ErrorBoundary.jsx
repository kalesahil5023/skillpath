/**
 * ============================================================================
 * ErrorBoundary — Root-Level React Error Boundary
 * ============================================================================
 * Catches unhandled render errors anywhere in the component tree.
 * Prevents a single broken component from white-screening the entire app.
 */

import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] Caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 24px",
            textAlign: "center",
            background: "#f8fafc",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#fff1f2",
              border: "1px solid #fecdd3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.75rem",
              marginBottom: "20px",
            }}
          >
            ⚠️
          </div>
          <h2 style={{ fontSize: "1.5rem", color: "#0f172a", marginBottom: "12px", fontFamily: "sans-serif" }}>
            Something went wrong
          </h2>
          <p style={{ color: "#64748b", maxWidth: "480px", marginBottom: "28px", fontFamily: "sans-serif" }}>
            An unexpected error occurred. Your progress is saved. Please refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 24px",
              background: "#059669",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              fontFamily: "sans-serif",
            }}
          >
            Refresh Page
          </button>
          {this.state.error && (
            <details style={{ marginTop: "24px", maxWidth: "600px", textAlign: "left" }}>
              <summary style={{ color: "#94a3b8", fontSize: "0.82rem", cursor: "pointer", fontFamily: "monospace" }}>
                Technical details
              </summary>
              <pre style={{ fontSize: "0.78rem", color: "#e11d48", marginTop: "8px", whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
