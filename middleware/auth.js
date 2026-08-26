const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";

/**
 * Required authentication middleware.
 * Reads access token from HttpOnly cookie, verifies it, and attaches req.user.
 * Returns 401 if missing or invalid.
 */
function requireAuth(req, res, next) {
    const token = req.cookies?.access_token;

    if (!token) {
        return res.status(401).json({ error: "Authentication required." });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = { id: payload.sub, email: payload.email };
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired.", code: "TOKEN_EXPIRED" });
        }
        return res.status(401).json({ error: "Invalid token." });
    }
}

/**
 * Optional authentication middleware.
 * Attaches req.user if a valid token is present, but does not reject unauthenticated requests.
 */
function optionalAuth(req, res, next) {
    const token = req.cookies?.access_token;

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = { id: payload.sub, email: payload.email };
    } catch {
        req.user = null;
    }
    next();
}

module.exports = { requireAuth, optionalAuth };
