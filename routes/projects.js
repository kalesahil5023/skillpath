const express = require("express");
const { pool } = require("../db/pool");
const { requireAuth } = require("../middleware/auth");
const { sanitizeText, validateSkill } = require("../middleware/validate");

const router = express.Router();

// All project routes require authentication
router.use(requireAuth);

// GET /api/projects — List saved project plans
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, skill, project_type, title, created_at FROM project_plans WHERE user_id = $1 ORDER BY created_at DESC",
            [req.user.id]
        );

        res.json({
            projects: result.rows.map((row) => ({
                id: row.id,
                skill: row.skill,
                projectType: row.project_type,
                title: row.title,
                createdAt: row.created_at,
            })),
        });
    } catch (err) {
        console.error("Get projects error:", err.message);
        res.status(500).json({ error: "Could not retrieve projects." });
    }
});

// POST /api/projects — Save a project plan
router.post("/", async (req, res) => {
    const skill = req.body.skill;
    const projectType = sanitizeText(req.body.projectType, 100);
    const title = sanitizeText(req.body.title, 100);

    if (!validateSkill(skill)) return res.status(400).json({ error: "Invalid skill." });
    if (!projectType) return res.status(400).json({ error: "Project type is required." });
    if (!title) return res.status(400).json({ error: "Title is required." });

    try {
        const result = await pool.query(
            "INSERT INTO project_plans (user_id, skill, project_type, title) VALUES ($1, $2, $3, $4) RETURNING id, created_at",
            [req.user.id, skill, projectType, title]
        );

        res.status(201).json({
            id: result.rows[0].id,
            message: "Project plan saved.",
            createdAt: result.rows[0].created_at,
        });
    } catch (err) {
        console.error("Save project error:", err.message);
        res.status(500).json({ error: "Could not save project." });
    }
});

// DELETE /api/projects/:id — Delete a project plan
router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid project ID." });

    try {
        const result = await pool.query(
            "DELETE FROM project_plans WHERE id = $1 AND user_id = $2 RETURNING id",
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Project not found." });
        }

        res.json({ message: "Project deleted." });
    } catch (err) {
        console.error("Delete project error:", err.message);
        res.status(500).json({ error: "Could not delete project." });
    }
});

module.exports = router;
