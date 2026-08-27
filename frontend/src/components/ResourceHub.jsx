import React, { useState } from "react";
import { RESOURCE_CATALOG } from "../data/skillsData";
import { Sparkles, ExternalLink, ShieldCheck, Filter } from "lucide-react";

export default function ResourceHub({ onOpenLegal }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Learning · Web Development",
    "Learning · Design",
    "Productivity · Writing",
    "Software · Video",
    "Software · Data",
    "Freelance · Platforms",
    "Employment · Job Search",
  ];

  const allResources = Object.values(RESOURCE_CATALOG);

  const filteredResources =
    selectedCategory === "All"
      ? allResources
      : allResources.filter((r) => r.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <section id="resources" className="section-spacing">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} />
            <span>Curated Directory</span>
          </div>
          <h2>Verified Tools &amp; Official Documentation</h2>
          <p>
            Avoid low-quality courses and predatory software subscriptions. We only list direct, official resources with honest trade-offs and free alternatives.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "16px",
            marginBottom: "36px",
            scrollbarWidth: "none",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--radius-full)",
                background: selectedCategory === cat ? "var(--primary)" : "#ffffff",
                color: selectedCategory === cat ? "#ffffff" : "var(--text-secondary)",
                border: selectedCategory === cat ? "1px solid var(--primary)" : "1px solid var(--border)",
                fontWeight: selectedCategory === cat ? 700 : 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
                fontFamily: "inherit",
                boxShadow: selectedCategory === cat ? "var(--shadow-xs)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resource Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="card"
              style={{
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#ffffff",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: 700 }}>
                    {res.category}
                  </span>
                  <span className={`badge ${res.pricingType === "Free" ? "badge-green" : res.pricingType === "Freemium" ? "badge-blue" : "badge-amber"}`}>
                    {res.pricingType}
                  </span>
                </div>

                <h4 style={{ fontSize: "1.25rem", marginBottom: "8px", color: "var(--text-primary)" }}>{res.name}</h4>
                <p style={{ fontSize: "0.92rem", marginBottom: "14px", color: "var(--text-secondary)" }}>{res.description}</p>

                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                    fontSize: "0.86rem",
                    marginBottom: "20px",
                  }}
                >
                  <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "2px" }}>
                    Why we recommend it:
                  </strong>
                  <span style={{ color: "var(--text-muted)" }}>{res.whyRecommended}</span>
                </div>
              </div>

              <a
                href={res.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ width: "100%", padding: "9px 14px", fontSize: "0.85rem" }}
              >
                <span>Visit Official Resource</span>
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* Ethical Standards & Compliance Notice */}
        <div
          style={{
            padding: "24px",
            borderRadius: "var(--radius-md)",
            background: "rgba(244, 198, 107, 0.06)",
            border: "1px solid rgba(244, 198, 107, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <ShieldCheck size={28} color="var(--warning)" />
            <div>
              <strong style={{ display: "block", fontSize: "1rem", color: "var(--text)" }}>
                Ethical Curation &amp; Transparent Monetization Policy
              </strong>
              <p style={{ fontSize: "0.88rem", marginTop: "2px" }}>
                We prioritize user safety and free alternatives over commercial deals. No resource can pay for inclusion.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onOpenLegal("affiliate-disclosure")}
          >
            <span>Review Disclosure Policy</span>
          </button>
        </div>
      </div>
    </section>
  );
}
