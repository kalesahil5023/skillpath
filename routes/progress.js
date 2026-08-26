const express = require("express");
const { pool } = require("../db/pool");
const { requireAuth } = require("../middleware/auth");
const { validateSkill } = require("../middleware/validate");

const router = express.Router();

// All progress routes require authentication
router.use(requireAuth);

// GET /api/progress — Get summary of all roadmap progress
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT skill, COUNT(*) FILTER (WHERE completed = true) AS completed_count, COUNT(*) AS total_count
             FROM roadmap_progress WHERE user_id = $1 GROUP BY skill ORDER BY skill`,
            [req.user.id]
        );

        const progress = {};
        for (const row of result.rows) {
            progress[row.skill] = {
                completed: parseInt(row.completed_count, 10),
                total: parseInt(row.total_count, 10),
            };
        }

        res.json({ progress });
    } catch (err) {
        console.error("Get all progress error:", err.message);
        res.status(500).json({ error: "Could not retrieve progress." });
    }
});

// GET /api/progress/:skill — Get roadmap progress for a skill
router.get("/:skill", async (req, res) => {
    const skill = decodeURIComponent(req.params.skill);

    if (!validateSkill(skill)) {
        return res.status(400).json({ error: "Invalid skill name." });
    }

    try {
        const result = await pool.query(
            "SELECT task_index, completed FROM roadmap_progress WHERE user_id = $1 AND skill = $2 ORDER BY task_index",
            [req.user.id, skill]
        );

        const tasks = {};
        for (const row of result.rows) {
            tasks[row.task_index] = row.completed;
        }

        res.json({ skill, tasks });
    } catch (err) {
        console.error("Get progress error:", err.message);
        res.status(500).json({ error: "Could not retrieve progress." });
    }
});

// PUT /api/progress/:skill/:taskIndex — Mark a task complete/incomplete
router.put("/:skill/:taskIndex", async (req, res) => {
    const skill = decodeURIComponent(req.params.skill);
    const taskIndex = parseInt(req.params.taskIndex, 10);

    if (!validateSkill(skill)) {
        return res.status(400).json({ error: "Invalid skill name." });
    }

    if (isNaN(taskIndex) || taskIndex < 0 || taskIndex > 50) {
        return res.status(400).json({ error: "Invalid task index." });
    }

    if (typeof req.body.completed !== "boolean") {
        return res.status(400).json({ error: "completed must be a boolean." });
    }

    try {
        const result = await pool.query(
            `INSERT INTO roadmap_progress (user_id, skill, task_index, completed, completed_at)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (user_id, skill, task_index)
             DO UPDATE SET completed = $4, completed_at = $5
             RETURNING task_index, completed`,
            [
                req.user.id,
                skill,
                taskIndex,
                req.body.completed,
                req.body.completed ? new Date() : null,
            ]
        );

        res.json({
            skill,
            taskIndex: result.rows[0].task_index,
            completed: result.rows[0].completed,
        });
    } catch (err) {
        console.error("Update progress error:", err.message);
        res.status(500).json({ error: "Could not update progress." });
    }
});

module.exports = router;
