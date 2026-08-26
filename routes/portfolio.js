const express = require("express");
const { pool } = require("../db/pool");
const { requireAuth } = require("../middleware/auth");
const { sanitizeText, validateUrl } = require("../middleware/validate");

const router = express.Router();

// All portfolio routes require authentication
router.use(requireAuth);

// GET /api/portfolio — List all portfolio entries
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, title, description, skills_used, tools_used, outcome, project_url, created_at, updated_at
             FROM portfolio_entries WHERE user_id = $1 ORDER BY created_at DESC`,
            [req.user.id]
        );

        res.json({
            entries: result.rows.map((row) => ({
                id: row.id,
                title: row.title,
                description: row.description,
                skillsUsed: row.skills_used,
                toolsUsed: row.tools_used,
                outcome: row.outcome,
                projectUrl: row.project_url,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
            })),
        });
    } catch (err) {
        console.error("Get portfolio error:", err.message);
        res.status(500).json({ error: "Could not retrieve portfolio entries." });
    }
});

// POST /api/portfolio — Create a portfolio entry
router.post("/", async (req, res) => {
    const title = sanitizeText(req.body.title, 100);
    const description = sanitizeText(req.body.description, 2000);
    const skillsUsed = sanitizeText(req.body.skillsUsed, 180);
    const toolsUsed = sanitizeText(req.body.toolsUsed, 180);
    const outcome = sanitizeText(req.body.outcome, 1000);
    const projectUrl = req.body.projectUrl && validateUrl(req.body.projectUrl) ? req.body.projectUrl.trim() : null;

    if (!title) return res.status(400).json({ error: "Title is required (max 100 characters)." });
    if (!description) return res.status(400).json({ error: "Description is required." });

    try {
        const result = await pool.query(
            `INSERT INTO portfolio_entries (user_id, title, description, skills_used, tools_used, outcome, project_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, created_at`,
            [req.user.id, title, description, skillsUsed, toolsUsed, outcome, projectUrl]
        );

        res.status(201).json({
            id: result.rows[0].id,
            message: "Portfolio entry created.",
            createdAt: result.rows[0].created_at,
        });
    } catch (err) {
        console.error("Create portfolio error:", err.message);
        res.status(500).json({ error: "Could not create portfolio entry." });
    }
});

// PUT /api/portfolio/:id — Update a portfolio entry
router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid entry ID." });

    const title = sanitizeText(req.body.title, 100);
    const description = sanitizeText(req.body.description, 2000);
    const skillsUsed = sanitizeText(req.body.skillsUsed, 180);
    const toolsUsed = sanitizeText(req.body.toolsUsed, 180);
    const outcome = sanitizeText(req.body.outcome, 1000);
    const projectUrl = req.body.projectUrl && validateUrl(req.body.projectUrl) ? req.body.projectUrl.trim() : null;

    if (!title) return res.status(400).json({ error: "Title is required." });
    if (!description) return res.status(400).json({ error: "Description is required." });

    try {
        const result = await pool.query(
            `UPDATE portfolio_entries
             SET title = $1, description = $2, skills_used = $3, tools_used = $4, outcome = $5, project_url = $6, updated_at = NOW()
             WHERE id = $7 AND user_id = $8 RETURNING id`,
            [title, description, skillsUsed, toolsUsed, outcome, projectUrl, id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Portfolio entry not found." });
        }

        res.json({ message: "Portfolio entry updated." });
    } catch (err) {
        console.error("Update portfolio error:", err.message);
        res.status(500).json({ error: "Could not update portfolio entry." });
    }
});

// DELETE /api/portfolio/:id — Delete a portfolio entry
router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid entry ID." });

    try {
        const result = await pool.query(
            "DELETE FROM portfolio_entries WHERE id = $1 AND user_id = $2 RETURNING id",
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Portfolio entry not found." });
        }

        res.json({ message: "Portfolio entry deleted." });
    } catch (err) {
        console.error("Delete portfolio error:", err.message);
        res.status(500).json({ error: "Could not delete portfolio entry." });
    }
});

module.exports = router;
