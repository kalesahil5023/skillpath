import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { User, LogIn, LogOut, Menu, X, Search, Sparkles, Sun, Moon } from "lucide-react";

export default function Navbar({ onOpenLegal, onOpenSearch }) {
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Courses", href: "#popular-courses" },
    { label: "Practice", href: "#path-finder" },
    { label: "Roadmaps", href: "#skill-roadmaps" },
    { label: "Projects", href: "#builders" },
    { label: "Resources", href: "#resources" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "var(--bg-surface)",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "var(--border-subtle)"}`,
        boxShadow: scrolled ? "0 2px 10px rgba(15, 23, 42, 0.04)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
          }}
        >
          {/* Brand Logo */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "1.25rem",
              fontWeight: 800,
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                backgroundColor: "var(--primary)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "1.1rem",
                boxShadow: "0 2px 6px rgba(5, 150, 105, 0.3)",
              }}
            >
              S
            </div>
            <span>
              Skill<span style={{ color: "var(--primary)" }}>Sprint</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
            className="desktop-nav"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            className="desktop-actions"
          >
            {/* Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              title="Search (⌘K)"
              aria-label="Search"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                background: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-muted)",
                fontSize: "0.84rem",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              <Search size={15} />
              <span className="search-label">Search</span>
              <kbd style={{
                padding: "2px 5px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                fontSize: "0.68rem",
                fontFamily: "monospace",
                color: "var(--text-muted)",
              }}>⌘K</kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                background: "var(--bg-subtle)",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.15s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary)";
                e.currentTarget.style.borderColor = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {isLoggedIn ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 12px",
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "var(--primary)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {(user.displayName || user.username || "U")[0].toUpperCase()}
                  </div>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {user.displayName || user.username}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-ghost"
                  style={{ padding: "8px 12px", fontSize: "0.85rem" }}
                  title="Sign out of account"
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    padding: "8px 14px",
                    transition: "color 0.15s",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Log In
                </button>

                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="btn btn-primary"
                  style={{ padding: "9px 18px", fontSize: "0.9rem" }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: "8px",
              color: "var(--text-primary)",
              display: "none",
            }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: "18px 0 24px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Mobile Search */}
            <button
              type="button"
              onClick={() => { onOpenSearch(); setMobileMenuOpen(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                background: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-muted)",
                fontSize: "0.92rem",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              <Search size={16} />
              <span>Search courses, tasks, resources...</span>
            </button>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  padding: "8px 0",
                }}
              >
                {link.label}
              </a>
            ))}

            <div style={{ paddingTop: "12px", borderTop: "1px solid var(--border)", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {/* Dark mode toggle in mobile */}
              <button
                type="button"
                onClick={toggleTheme}
                className="btn btn-secondary"
                style={{ flex: "0 0 auto" }}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
              </button>

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  <LogOut size={16} />
                  <span>Log Out ({user.displayName || user.username})</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      openAuthModal("login");
                      setMobileMenuOpen(false);
                    }}
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      openAuthModal("register");
                      setMobileMenuOpen(false);
                    }}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 880px) {
          .desktop-nav { display: none !important; }
          .desktop-actions { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (max-width: 1100px) {
          .search-label { display: none; }
        }
      `}</style>
    </header>
  );
}
