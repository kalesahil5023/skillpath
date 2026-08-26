const express = require("express");

const app = express();
const PORT = 3000;
const siteUrl = (process.env.SKILLPATH_SITE_URL || "").replace(/\/+$/, "");
const hasSiteUrl = /^https?:\/\/[^\s]+$/i.test(siteUrl);
const indexablePaths = [
  "/",
  "/about.html",
  "/contact.html",
  "/privacy.html",
  "/terms.html",
  "/affiliate-disclosure.html",
  "/resource-standards.html",
  "/beginner-skill-roadmaps.html",
  "/freelancing-for-beginners.html",
  "/legitimate-online-jobs.html",
];

app.get("/robots.txt", (req, res) => {
  const sitemapLine = hasSiteUrl
    ? `Sitemap: ${siteUrl}/sitemap.xml`
    : "# Add SKILLPATH_SITE_URL at launch to publish absolute sitemap URLs.";

  res.type("text/plain").send(["User-agent: *", "Allow: /", sitemapLine].join("\n"));
});

app.get("/sitemap.xml", (req, res) => {
  const urls = hasSiteUrl
    ? indexablePaths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join("\n")
    : "  <!-- Set SKILLPATH_SITE_URL to emit production sitemap URLs. -->";

  res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
});

// Serve files from the public folder
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
