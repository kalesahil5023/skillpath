const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { pool } = require("../db/pool");
const { requireAuth } = require("../middleware/auth");
const { validateEmail, validatePassword, sanitizeText } = require("../middleware/validate");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "dev-refresh-secret-change-in-production";
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const BCRYPT_ROUNDS = 12;

function generateAccessToken(user) {
    return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

function generateRefreshToken() {
    return crypto.randomBytes(40).toString("hex");
}

function setAuthCookies(res, accessToken, refreshToken) {
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: "/",
    });

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: REFRESH_TOKEN_EXPIRY_MS,
        path: "/api/auth",
    });
}

function clearAuthCookies(res) {
    res.clearCookie("access_token", { path: "/" });
    res.clearCookie("refresh_token", { path: "/api/auth" });
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
    try {
        const email = (req.body.email || "").trim().toLowerCase();
        const password = req.body.password || "";
        const displayName = sanitizeText(req.body.displayName || "", 100);

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Please provide a valid email address." });
        }
        if (!validatePassword(password)) {
            return res.status(400).json({ error: "Password must be between 8 and 128 characters." });
        }

        // Check if user already exists
        const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ error: "An account with this email already exists." });
        }

        const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
        const result = await pool.query(
            "INSERT INTO users (email, password_hash, display_name) VALUES ($1, $2, $3) RETURNING id, email, display_name",
            [email, passwordHash, displayName]
        );

        const user = result.rows[0];
        const accessToken = generateAccessToken({ id: user.id, email: user.email });
        const refreshToken = generateRefreshToken();

        // Store refresh token hash
        const refreshHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
        await pool.query(
            "INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
            [user.id, refreshHash, new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS)]
        );

        setAuthCookies(res, accessToken, refreshToken);

        res.status(201).json({
            user: { id: user.id, username: user.display_name || user.email.split("@")[0], email: user.email, displayName: user.display_name },
            access: accessToken,
            refresh: refreshToken,
            message: "User registered successfully.",
        });
    } catch (err) {
        console.error("Registration error:", err.message);
        res.status(500).json({ error: "Registration failed. Please try again." });
    }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
    try {
        const email = (req.body.email || "").trim().toLowerCase();
        const password = req.body.password || "";

        if (!validateEmail(email) || !validatePassword(password)) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        const result = await pool.query(
            "SELECT id, email, password_hash, display_name FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const user = result.rows[0];
        const valid = await bcrypt.compare(password, user.password_hash);

        if (!valid) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const accessToken = generateAccessToken({ id: user.id, email: user.email });
        const refreshToken = generateRefreshToken();

        // Store refresh token hash
        const refreshHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
        await pool.query(
            "INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
            [user.id, refreshHash, new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS)]
        );

        setAuthCookies(res, accessToken, refreshToken);

        res.json({
            user: { id: user.id, username: user.display_name || user.email.split("@")[0], email: user.email, displayName: user.display_name },
            access: accessToken,
            refresh: refreshToken,
            message: "Login successful.",
        });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ error: "Login failed. Please try again." });
    }
});

// POST /api/auth/logout
router.post("/logout", requireAuth, async (req, res) => {
    try {
        // Revoke all refresh tokens for this user
        await pool.query(
            "UPDATE refresh_tokens SET revoked = true WHERE user_id = $1 AND revoked = false",
            [req.user.id]
        );
        clearAuthCookies(res);
        res.json({ message: "Logged out successfully." });
    } catch (err) {
        console.error("Logout error:", err.message);
        clearAuthCookies(res);
        res.json({ message: "Logged out." });
    }
});

// POST /api/auth/refresh
router.post("/refresh", async (req, res) => {
    try {
        const refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) {
            return res.status(401).json({ error: "No refresh token provided." });
        }

        const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

        const result = await pool.query(
            "SELECT id, user_id, expires_at FROM refresh_tokens WHERE token_hash = $1 AND revoked = false",
            [tokenHash]
        );

        if (result.rows.length === 0) {
            clearAuthCookies(res);
            return res.status(401).json({ error: "Invalid refresh token." });
        }

        const tokenRecord = result.rows[0];

        if (new Date(tokenRecord.expires_at) < new Date()) {
            await pool.query("UPDATE refresh_tokens SET revoked = true WHERE id = $1", [tokenRecord.id]);
            clearAuthCookies(res);
            return res.status(401).json({ error: "Refresh token expired." });
        }

        // Revoke old token
        await pool.query("UPDATE refresh_tokens SET revoked = true WHERE id = $1", [tokenRecord.id]);

        // Get user
        const userResult = await pool.query("SELECT id, email, display_name FROM users WHERE id = $1", [tokenRecord.user_id]);
        if (userResult.rows.length === 0) {
            clearAuthCookies(res);
            return res.status(401).json({ error: "User not found." });
        }

        const user = userResult.rows[0];

        // Issue new tokens (rotation)
        const newAccessToken = generateAccessToken({ id: user.id, email: user.email });
        const newRefreshToken = generateRefreshToken();
        const newRefreshHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");

        await pool.query(
            "INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
            [user.id, newRefreshHash, new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS)]
        );

        setAuthCookies(res, newAccessToken, newRefreshToken);

        res.json({
            user: { id: user.id, email: user.email, displayName: user.display_name },
        });
    } catch (err) {
        console.error("Token refresh error:", err.message);
        res.status(500).json({ error: "Token refresh failed." });
    }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, email, display_name, created_at FROM users WHERE id = $1",
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        const user = result.rows[0];
        res.json({
            user: { id: user.id, email: user.email, displayName: user.display_name, createdAt: user.created_at },
        });
    } catch (err) {
        console.error("Get user error:", err.message);
        res.status(500).json({ error: "Could not retrieve user." });
    }
});

// POST /api/auth/google
router.post(["/google", "/google/"], async (req, res) => {
    try {
        const { credential } = req.body;
        if (!credential) {
            return res.status(400).json({ error: "Google credential token is required." });
        }

        // Verify ID token with Google's public tokeninfo endpoint
        const googleRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        const idinfo = await googleRes.json();

        if (idinfo.error || !idinfo.email) {
            return res.status(400).json({
                error: `Invalid Google token: ${idinfo.error_description || idinfo.error || "Token could not be verified."}`
            });
        }

        const email = idinfo.email.toLowerCase().trim();
        const displayName = idinfo.name || email.split("@")[0];

        // Ensure users table exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                display_name VARCHAR(100),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
            CREATE TABLE IF NOT EXISTS refresh_tokens (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                token_hash VARCHAR(64) NOT NULL,
                expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
                revoked BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `);

        // Check if user exists
        let userResult = await pool.query("SELECT id, email, display_name FROM users WHERE email = $1", [email]);
        let user;

        if (userResult.rows.length === 0) {
            const randomPassword = crypto.randomBytes(32).toString("hex");
            const passwordHash = await bcrypt.hash(randomPassword, BCRYPT_ROUNDS);
            const insertResult = await pool.query(
                "INSERT INTO users (email, password_hash, display_name) VALUES ($1, $2, $3) RETURNING id, email, display_name",
                [email, passwordHash, displayName]
            );
            user = insertResult.rows[0];
        } else {
            user = userResult.rows[0];
        }

        const accessToken = generateAccessToken({ id: user.id, email: user.email });
        const refreshToken = generateRefreshToken();

        // Store refresh token
        const refreshHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
        await pool.query(
            "INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
            [user.id, refreshHash, new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS)]
        );

        setAuthCookies(res, accessToken, refreshToken);

        res.json({
            user: {
                id: user.id,
                username: user.display_name || user.email.split("@")[0],
                email: user.email,
                displayName: user.display_name || user.email.split("@")[0],
            },
            access: accessToken,
            refresh: refreshToken,
            message: "Google authentication successful.",
        });
    } catch (err) {
        console.error("Google auth error:", err.message);
        res.status(500).json({ error: "Google authentication failed on server." });
    }
});

module.exports = router;
