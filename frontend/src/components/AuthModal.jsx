import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { X, LogIn, UserPlus, AlertCircle, Eye, EyeOff } from "lucide-react";

// ── Password Strength Utility ─────────────────────────────────────────────────
function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "#e11d48", pct: "25%" };
  if (score <= 2) return { score, label: "Fair", color: "#d97706", pct: "50%" };
  if (score <= 3) return { score, label: "Good", color: "#2563eb", pct: "75%" };
  return { score, label: "Strong", color: "#059669", pct: "100%" };
}

export default function AuthModal() {
  const {
    authModalOpen,
    authModalMode,
    closeAuthModal,
    setAuthModalMode,
    login,
    register,
    loginWithGoogle,
  } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = authModalMode === "login";
  const passwordStrength = getPasswordStrength(password);

  // B1 FIX: Reset form state every time modal opens
  useEffect(() => {
    if (authModalOpen) {
      setUsername("");
      setEmail("");
      setPassword("");
      setDisplayName("");
      setError("");
      setShowPassword(false);
    }
  }, [authModalOpen]);

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // F3 FIX: Accept email-or-username — if input contains @, pass as email too
        await login(username, password);
      } else {
        await register(username, email, password, displayName);
      }
    } catch (err) {
      console.error("Auth error:", err);
      const data = err.response?.data;
      if (data) {
        if (typeof data === "string") {
          setError(data);
        } else if (data.detail) {
          setError(data.detail);
        } else if (data.error) {
          setError(data.error);
        } else {
          const messages = Object.entries(data)
            .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(" ") : msgs}`)
            .join(" | ");
          setError(messages || "Authentication failed. Please verify credentials.");
        }
      } else {
        setError("Network error connecting to backend. Is the server running?");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError("");
      await loginWithGoogle(credentialResponse.credential);
    } catch (err) {
      console.error("Google login error:", err);
      const errMsg = err.response?.data?.error || "Google authentication failed. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeAuthModal}>
      <div
        className="modal-container"
        style={{ maxWidth: "460px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={closeAuthModal}
          aria-label="Close authentication modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "var(--primary)",
              color: "#ffffff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "1.25rem",
              marginBottom: "12px",
              boxShadow: "0 2px 8px rgba(5, 150, 105, 0.25)",
            }}
          >
            S
          </div>
          <h3 style={{ fontSize: "1.65rem", marginBottom: "6px", color: "var(--text-primary)" }}>
            {isLogin ? "Welcome back" : "Create your account"}
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--text-muted)" }}>
            {isLogin
              ? "Access your saved starter plans and progress across devices."
              : "Sync your learning checklists and portfolio case studies to cloud."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            background: "var(--bg-subtle)",
            border: "1px solid var(--border)",
            padding: "4px",
            borderRadius: "var(--radius-md)",
            marginBottom: "20px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setAuthModalMode("login");
              setError("");
            }}
            style={{
              padding: "9px",
              borderRadius: "var(--radius-sm)",
              background: isLogin ? "var(--bg-surface)" : "transparent",
              color: isLogin ? "var(--text-primary)" : "var(--text-muted)",
              border: isLogin ? "1px solid var(--border)" : "none",
              boxShadow: isLogin ? "var(--shadow-xs)" : "none",
              fontWeight: isLogin ? 700 : 500,
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.9rem",
              transition: "all 0.15s ease",
            }}
          >
            Log In
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthModalMode("register");
              setError("");
            }}
            style={{
              padding: "9px",
              borderRadius: "var(--radius-sm)",
              background: !isLogin ? "var(--bg-surface)" : "transparent",
              color: !isLogin ? "var(--text-primary)" : "var(--text-muted)",
              border: !isLogin ? "1px solid var(--border)" : "none",
              boxShadow: !isLogin ? "var(--shadow-xs)" : "none",
              fontWeight: !isLogin ? 700 : 500,
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.9rem",
              transition: "all 0.15s ease",
            }}
          >
            Register
          </button>
        </div>

        {/* Google One-Tap / Sign-In Button */}
        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "6px" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google Sign-In was cancelled or unavailable.")}
            theme="outline"
            shape="pill"
            text={isLogin ? "signin_with" : "signup_with"}
            width="380"
          />
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "18px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>
            or continue with email
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name / Display Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Alex River"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={100}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              {isLogin ? "Username or Email" : "Username"}
            </label>
            <input
              className="form-input"
              type="text"
              placeholder={isLogin ? "username or you@email.com" : "e.g. alexriver"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete={isLogin ? "username" : "username"}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          {/* Password field with show/hide toggle */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                className="form-input"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                style={{ paddingRight: "44px" }}
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {/* U5: Password strength indicator (register only) */}
            {!isLogin && password.length > 0 && (
              <div style={{ marginTop: "8px" }}>
                <div
                  style={{
                    height: "4px",
                    background: "var(--border)",
                    borderRadius: "2px",
                    overflow: "hidden",
                    marginBottom: "4px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: passwordStrength.pct,
                      background: passwordStrength.color,
                      borderRadius: "2px",
                      transition: "width 0.3s ease, background-color 0.3s ease",
                    }}
                  />
                </div>
                <span style={{ fontSize: "0.78rem", color: passwordStrength.color, fontWeight: 600 }}>
                  {passwordStrength.label} password
                </span>
              </div>
            )}
          </div>

          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                color: "var(--danger, #e11d48)",
                fontSize: "0.88rem",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                background: "rgba(225, 29, 72, 0.06)",
                border: "1px solid rgba(225, 29, 72, 0.2)",
                marginBottom: "20px",
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", padding: "14px", marginTop: "4px" }}
            disabled={loading}
          >
            {loading ? (
              <span>Connecting to Backend...</span>
            ) : isLogin ? (
              <>
                <LogIn size={16} />
                <span>Log In to Account</span>
              </>
            ) : (
              <>
                <UserPlus size={16} />
                <span>Create Free Account</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
