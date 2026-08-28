/**
 * ============================================================================
 * Global Toast Notification Context
 * ============================================================================
 * Provides application-wide toast notifications with auto-dismiss.
 * Variants: "success" | "error" | "warning" | "info"
 */

import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

// ── Internal Toast Container ──────────────────────────────────────────────────
function ToastContainer({ toasts, onRemove }) {
  if (toasts.length === 0) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "380px",
        width: "calc(100vw - 48px)",
      }}
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

const TOAST_STYLES = {
  success: {
    bg: "#f0fdf4",
    border: "#a7f3d0",
    color: "#065f46",
    icon: "✓",
    iconBg: "#059669",
  },
  error: {
    bg: "#fff1f2",
    border: "#fecdd3",
    color: "#be123c",
    icon: "✕",
    iconBg: "#e11d48",
  },
  warning: {
    bg: "#fffbeb",
    border: "#fde68a",
    color: "#92400e",
    icon: "!",
    iconBg: "#d97706",
  },
  info: {
    bg: "#eff6ff",
    border: "#bfdbfe",
    color: "#1e40af",
    icon: "i",
    iconBg: "#2563eb",
  },
};

function ToastItem({ toast, onRemove }) {
  const style = TOAST_STYLES[toast.type] || TOAST_STYLES.success;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 16px",
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: "10px",
        boxShadow: "0 4px 16px rgba(15,23,42,0.1)",
        animation: "toast-in 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
      role="alert"
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: style.iconBg,
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          fontWeight: 900,
          flexShrink: 0,
        }}
      >
        {style.icon}
      </div>
      <span style={{ fontSize: "0.9rem", color: style.color, fontWeight: 600, flex: 1, lineHeight: 1.4 }}>
        {toast.message}
      </span>
      <button
        onClick={() => onRemove(toast.id)}
        style={{
          background: "none",
          border: "none",
          color: style.color,
          cursor: "pointer",
          fontSize: "1.1rem",
          lineHeight: 1,
          opacity: 0.6,
          flexShrink: 0,
        }}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}
