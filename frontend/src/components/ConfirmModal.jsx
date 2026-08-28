/**
 * ============================================================================
 * ConfirmModal — Accessible replacement for window.confirm()
 * ============================================================================
 * Usage:
 *   const [confirmState, setConfirmState] = useState(null);
 *   <ConfirmModal
 *     isOpen={!!confirmState}
 *     title={confirmState?.title}
 *     message={confirmState?.message}
 *     confirmLabel={confirmState?.confirmLabel}
 *     onConfirm={() => { confirmState?.onConfirm(); setConfirmState(null); }}
 *     onCancel={() => setConfirmState(null)}
 *   />
 */

import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger", // "danger" | "warning"
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  const isDanger = variant === "danger";

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal-container"
        style={{ maxWidth: "400px", padding: "32px 28px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onCancel}
          aria-label="Cancel"
        >
          <X size={18} />
        </button>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "12px",
              background: isDanger ? "#fff1f2" : "#fffbeb",
              border: `1px solid ${isDanger ? "#fecdd3" : "#fde68a"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isDanger ? "#e11d48" : "#d97706",
            }}
          >
            <AlertTriangle size={26} />
          </div>

          <div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "8px", color: "var(--text-primary)" }}>
              {title}
            </h3>
            {message && (
              <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                {message}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: "12px", width: "100%" }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: 1 }}
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              className="btn"
              style={{
                flex: 1,
                background: isDanger ? "#e11d48" : "#d97706",
                color: "#ffffff",
              }}
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
