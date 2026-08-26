const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

pool.on("error", (err) => {
    console.error("Unexpected database pool error:", err.message);
});

// Graceful shutdown helper — called from server.js
async function closePool() {
    try {
        await pool.end();
        console.log("Database pool closed.");
    } catch (err) {
        console.error("Error closing database pool:", err.message);
    }
}

module.exports = { pool, closePool };
