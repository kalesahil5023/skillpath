import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
import { LogOut, Menu, X, Search } from "lucide-react";

const NAV_LINKS = [
  { label: "Explore", page: "landing", icon: "explore" },
  { label: "Courses", page: "dashboard", icon: "school" },
  { label: "Practice", page: "interview", icon: "psychology" },
  { label: "Roadmap", page: "roadmap", icon: "map" },
];

const DROPDOWN_ITEMS = [
  { icon: "person", label: "My Profile", page: "profile" },
  { icon: "dashboard", label: "Courses & Missions", page: "dashboard" },
  { icon: "psychology", label: "Interview Prep", page: "interview" },
  { icon: "map", label: "Career Roadmaps", page: "roadmap" },
  { icon: "leaderboard", label: "Leaderboard", page: "leaderboard" },
  { icon: "groups", label: "Study Squad", page: "squad" },
  { icon: "work", label: "Portfolio", page: "portfolio" },
];

export default function Navbar({ onOpenLegal, onOpenSearch, onNavigate }) {
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState("landing");
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNav = (page) => {
    setActivePage(page);
    onNavigate?.(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--outline-variant)",
        transition: "box-shadow 0.2s ease, background 0.2s ease",
        boxShadow: scrolled ? "0 2px 20px rgba(15,23,42,0.08)" : "none",
      }}>
        <div className="ss-container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

            {/* Left: Logo + Nav */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNav("landing"); }}
                style={{ display: "flex", alignItems: "center", textDecoration: "none", marginRight: "20px" }}
                aria-label="SkillPath Home">
                <Logo iconSize={36} theme="light" />
              </a>
              <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                {NAV_LINKS.map((link) => {
                  const isActive = activePage === link.page;
                  return (
                    <button key={link.label} type="button" onClick={() => handleNav(link.page)}
                      style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500,
                        color: isActive ? "var(--primary)" : "var(--on-surface-variant)",
                        padding: "7px 12px", borderRadius: "8px",
                        background: isActive ? "var(--primary-container)" : "transparent",
                        border: "none", cursor: "pointer", transition: "all 0.18s ease",
                      }}
                      onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "var(--surface-container)"; e.currentTarget.style.color = "var(--on-surface)"; } }}
                      onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--on-surface-variant)"; } }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{link.icon}</span>
                      {link.label}
                    </button>
                  );
                })}
                <button type="button" onClick={() => handleNav("lesson")}
                  style={{
                    display: "flex", alignItems: "center", gap: "7px",
                    fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 700, color: "#fff",
                    padding: "7px 16px", borderRadius: "8px",
                    background: "linear-gradient(135deg, #3366cc, #5b8def)",
                    border: "none", cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(51,102,204,0.35)",
                    transition: "all 0.18s ease", marginLeft: "4px",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(51,102,204,0.5)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(51,102,204,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}>terminal</span>
                  Simulator
                </button>
              </nav>
            </div>

            {/* Right: Search + Auth */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button type="button" onClick={onOpenSearch} aria-label="Search" className="hide-mobile"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "36px", height: "36px", borderRadius: "8px",
                  border: "1px solid var(--outline-variant)", background: "var(--surface)",
                  color: "var(--on-surface-variant)", cursor: "pointer", transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--outline-variant)"; e.currentTarget.style.color = "var(--on-surface-variant)"; }}>
                <Search size={15} />
              </button>

              {isLoggedIn ? (
                <div ref={menuRef} style={{ position: "relative" }}>
                  <button type="button" onClick={() => setUserMenuOpen(!userMenuOpen)}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "5px 10px 5px 5px", borderRadius: "24px",
                      border: "1px solid var(--outline-variant)", background: "var(--surface)",
                      cursor: "pointer", transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--outline-variant)"}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #3366cc, #5b8def)",
                      color: "#fff", display: "flex", alignItems: "center",
                      justifyContent: "center", fontWeight: 700, fontSize: "0.8rem",
                    }}>
                      {(user?.displayName?.[0] || user?.username?.[0] || "U").toUpperCase()}
                    </div>
                    <span className="hide-mobile" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--on-surface)", maxWidth: "90px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {user?.displayName || user?.username || "Profile"}
                    </span>
                    <span className="material-symbols-outlined hide-mobile" style={{ fontSize: 16, color: "var(--on-surface-variant)", transform: userMenuOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>expand_more</span>
                  </button>
                  {userMenuOpen && (
                    <div style={{
                      position: "absolute", right: 0, top: "48px", width: "220px",
                      background: "#fff", border: "1px solid var(--outline-variant)",
                      borderRadius: "12px", boxShadow: "0 8px 32px rgba(15,23,42,0.12)",
                      overflow: "hidden", zIndex: 200,
                    }}>
                      <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--outline-variant)", background: "var(--surface-subtle)" }}>
                        <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--on-surface)" }}>{user?.displayName || user?.username}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--outline)", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email}</div>
                      </div>
                      {DROPDOWN_ITEMS.map((item) => (
                        <button key={item.label} type="button"
                          onClick={() => { handleNav(item.page); setUserMenuOpen(false); }}
                          style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", fontSize: "0.8125rem", color: "var(--on-surface)", cursor: "pointer", background: "transparent", border: "none", textAlign: "left", transition: "background 0.12s" }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-subtle)"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16, color: "var(--primary)" }}>{item.icon}</span>
                          {item.label}
                        </button>
                      ))}
                      <div style={{ borderTop: "1px solid var(--outline-variant)" }}>
                        <button type="button" onClick={() => { logout(); setUserMenuOpen(false); }}
                          style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", fontSize: "0.8125rem", color: "#dc2626", cursor: "pointer", background: "transparent", border: "none", textAlign: "left", transition: "background 0.12s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#fff1f2"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                          <LogOut size={14} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button type="button" onClick={() => openAuthModal("login")}
                    style={{ padding: "8px 18px", borderRadius: "8px", border: "1px solid var(--outline-variant)", background: "transparent", fontSize: "0.875rem", fontWeight: 600, color: "var(--on-surface)", cursor: "pointer", transition: "all 0.15s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--outline-variant)"; e.currentTarget.style.color = "var(--on-surface)"; }}>
                    Log In
                  </button>
                  <button type="button" onClick={() => openAuthModal("signup")}
                    style={{ padding: "8px 18px", borderRadius: "8px", background: "linear-gradient(135deg, #3366cc, #5b8def)", border: "none", fontSize: "0.875rem", fontWeight: 700, color: "#fff", cursor: "pointer", boxShadow: "0 2px 8px rgba(51,102,204,0.35)", transition: "all 0.15s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(51,102,204,0.5)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(51,102,204,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    Sign Up Free
                  </button>
                </div>
              )}

              <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ display: "none", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "8px", border: "1px solid var(--outline-variant)", background: "var(--surface)", cursor: "pointer", color: "var(--on-surface)" }}
                className="show-mobile" aria-label="Toggle menu">
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div style={{ borderTop: "1px solid var(--outline-variant)", background: "#fff", padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {NAV_LINKS.map((link) => (
              <button key={link.label} type="button" onClick={() => handleNav(link.page)}
                style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "8px", fontFamily: "var(--font-body)", fontSize: "0.9375rem", fontWeight: 600, color: "var(--on-surface)", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-container)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "var(--primary)" }}>{link.icon}</span>
                {link.label}
              </button>
            ))}
            <button type="button" onClick={() => handleNav("lesson")}
              style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "8px", fontFamily: "var(--font-body)", fontSize: "0.9375rem", fontWeight: 700, color: "var(--primary)", background: "var(--primary-container)", border: "none", cursor: "pointer" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "var(--primary)" }}>terminal</span>
              Simulator
            </button>
            <div style={{ paddingTop: "12px", borderTop: "1px solid var(--outline-variant)", display: "flex", flexDirection: "column", gap: "8px" }}>
              {isLoggedIn ? (
                <>
                  <button type="button" onClick={() => handleNav("profile")} style={{ padding: "11px 16px", borderRadius: "8px", border: "1px solid var(--outline-variant)", background: "transparent", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>My Profile</button>
                  <button type="button" onClick={() => { logout(); setMobileMenuOpen(false); }} style={{ padding: "11px 16px", borderRadius: "8px", background: "#fef2f2", border: "1px solid #fecaca", fontSize: "0.9rem", fontWeight: 600, color: "#dc2626", cursor: "pointer" }}>Sign Out</button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => { openAuthModal("login"); setMobileMenuOpen(false); }} style={{ padding: "11px 16px", borderRadius: "8px", border: "1px solid var(--outline-variant)", background: "transparent", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>Log In</button>
                  <button type="button" onClick={() => { openAuthModal("signup"); setMobileMenuOpen(false); }} style={{ padding: "11px 16px", borderRadius: "8px", background: "linear-gradient(135deg, #3366cc, #5b8def)", border: "none", fontSize: "0.9rem", fontWeight: 700, color: "#fff", cursor: "pointer" }}>Sign Up Free</button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
