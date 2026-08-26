const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

// Load environment variables
require("dotenv").config();

const { closePool } = require("./db/pool");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const siteUrl = (process.env.SKILLPATH_SITE_URL || "").replace(/\/+$/, "");
const serverApiKey = process.env.SKILLPATH_API_KEY || "";
const hasSiteUrl = /^https?:\/\/[^\s]+$/i.test(siteUrl);
const hasServerApiKey = serverApiKey.trim().length > 0;

// Server-only configuration: deliberately never sent to the browser or logs.
app.locals.serverApiKeyConfigured = hasServerApiKey;

// ── Security Headers ──
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:"],
                connectSrc: ["'self'"],
                fontSrc: ["'self'"],
                objectSrc: ["'none'"],
                frameAncestors: ["'none'"],
                baseUri: ["'self'"],
                formAction: ["'self'"],
            },
        },
        crossOriginEmbedderPolicy: false,
    })
);

// ── Compression ──
app.use(compression());

// ── Body Parsing ──
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

// ── Rate Limiting ──
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: { error: "Too many requests. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { error: "Too many requests. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use("/api/auth", authLimiter);
app.use("/api", apiLimiter);

// ── Indexable Paths (for sitemap) ──
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

// ── SEO Routes ──
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

// ── API Routes ──
app.use("/api/auth", require("./routes/auth"));
app.use("/api/plans", require("./routes/plans"));
app.use("/api/progress", require("./routes/progress"));
app.use("/api/portfolio", require("./routes/portfolio"));
app.use("/api/projects", require("./routes/projects"));

// ── Static Files ──
app.use(express.static("public"));

// ── Start Server ──
const server = app.listen(PORT, () => {
    console.log(`SkillSprint server running on port ${PORT}${hasServerApiKey ? " with server API key configuration" : ""}`);
});

// ── Graceful Shutdown ──
async function shutdown(signal) {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(async () => {
        await closePool();
        process.exit(0);
    });

    // Force exit after 10 seconds
    setTimeout(() => {
        console.error("Forced shutdown after timeout.");
        process.exit(1);
    }, 10000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
