/**
 * ============================================================================
 * BackToTop — Floating scroll-to-top button
 * ============================================================================
 * Appears after user scrolls 400px down. Smooth-scrolls back to the top.
 */

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "88px",
        right: "24px",
        zIndex: 998,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: "var(--primary)",
        color: "#ffffff",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(5, 150, 105, 0.35)",
        transition: "transform 0.2s ease, opacity 0.2s ease",
        animation: "fade-in 0.25s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <ArrowUp size={20} />
    </button>
  );
}
