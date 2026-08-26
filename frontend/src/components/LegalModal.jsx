import React from "react";
import { X, ShieldCheck, Scale, FileText, Info } from "lucide-react";

export default function LegalModal({ topic, isOpen, onClose }) {
  if (!isOpen || !topic) return null;

  const contentMap = {
    about: {
      title: "About SkillSprint",
      icon: Info,
      body: (
        <div style={{ display: "grid", gap: "18px", lineHeight: 1.65 }}>
          <div>
            <h4 style={{ color: "var(--primary)", marginBottom: "6px" }}>What SkillSprint Is</h4>
            <p>
              SkillSprint is an educational career-planning and skill-building application designed for individuals seeking credible, legitimate paths to online income. It transforms broad, confusing aspirations into structured 30-day milestones.
            </p>
          </div>
          <div>
            <h4 style={{ color: "var(--secondary)", marginBottom: "6px" }}>Who It Is Designed For</h4>
            <p>
              Beginners wanting an honest starting point, including those considering freelancing, preparing for remote employment, or researching audience-led monetization.
            </p>
          </div>
          <div>
            <h4 style={{ color: "var(--accent)", marginBottom: "6px" }}>What SkillSprint Does NOT Do</h4>
            <p>
              SkillSprint does <strong>not</strong> promise, guarantee, or imply any specific income, job offer, client acquisition, or financial return. Success is dependent on individual effort, market conditions, and deliberate practice.
            </p>
          </div>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      icon: ShieldCheck,
      body: (
        <div style={{ display: "grid", gap: "18px", lineHeight: 1.65 }}>
          <div>
            <h4 style={{ color: "var(--primary)", marginBottom: "6px" }}>Zero Selling of Personal Data</h4>
            <p>
              We respect your privacy. SkillSprint does not sell, rent, or trade your personal data to data brokers or third-party advertisers.
            </p>
          </div>
          <div>
            <h4 style={{ color: "var(--secondary)", marginBottom: "6px" }}>Storage &amp; Authentication</h4>
            <p>
              Guest data is stored exclusively in your browser's localStorage. When you create an account, your username, email, encrypted password hash, and saved plans are securely stored in our PostgreSQL database using industry-standard JWT authentication.
            </p>
          </div>
          <div>
            <h4 style={{ color: "var(--accent)", marginBottom: "6px" }}>Analytics &amp; Tracking</h4>
            <p>
              Product analytics are strictly opt-in and disabled by default. We never collect financial details, passwords in plain text, or sensitive private documents.
            </p>
          </div>
        </div>
      ),
    },
    terms: {
      title: "Terms of Use",
      icon: Scale,
      body: (
        <div style={{ display: "grid", gap: "18px", lineHeight: 1.65 }}>
          <div>
            <h4 style={{ color: "var(--primary)", marginBottom: "6px" }}>Educational Disclaimer</h4>
            <p>
              All materials, roadmaps, project templates, and guidance provided on SkillSprint are for informational and educational purposes only. None of the content constitutes legal, financial, or employment advice.
            </p>
          </div>
          <div>
            <h4 style={{ color: "var(--secondary)", marginBottom: "6px" }}>User Responsibility</h4>
            <p>
              Users are solely responsible for independently verifying third-party platforms, agreements, contracts, and payment terms before accepting freelance or employment engagements.
            </p>
          </div>
          <div>
            <h4 style={{ color: "var(--accent)", marginBottom: "6px" }}>Scam Protection</h4>
            <p>
              You agree to never pay upfront fees for employment, never share banking credentials or one-time passwords, and conduct due diligence on all prospective clients.
            </p>
          </div>
        </div>
      ),
    },
    "affiliate-disclosure": {
      title: "Affiliate & Commercial Disclosure",
      icon: FileText,
      body: (
        <div style={{ display: "grid", gap: "18px", lineHeight: 1.65 }}>
          <div>
            <h4 style={{ color: "var(--primary)", marginBottom: "6px" }}>FTC Compliance Statement</h4>
            <p>
              In accordance with Federal Trade Commission (FTC) guidelines and international consumer protection standards, we disclose that certain external links to software or tools may be affiliate links.
            </p>
          </div>
          <div>
            <h4 style={{ color: "var(--secondary)", marginBottom: "6px" }}>No Extra Cost to You</h4>
            <p>
              If you purchase a product or service through a verified affiliate link on this website, SkillSprint may earn a referral commission at absolutely zero additional cost to you.
            </p>
          </div>
          <div>
            <h4 style={{ color: "var(--accent)", marginBottom: "6px" }}>Editorial Independence</h4>
            <p>
              Affiliate status never influences our recommendations. We explicitly prioritize free and open-source alternatives and clearly label every commercial relationship.
            </p>
          </div>
        </div>
      ),
    },
  };

  const currentTopic = contentMap[topic] || contentMap.about;
  const Icon = currentTopic.icon;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close information modal"
        >
          <X size={18} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(115, 215, 255, 0.15)",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={22} />
          </div>
          <h3 style={{ fontSize: "1.75rem" }}>{currentTopic.title}</h3>
        </div>

        <div style={{ padding: "8px 0 24px" }}>{currentTopic.body}</div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
