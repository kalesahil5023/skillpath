const express = require("express");
const { pool } = require("../db/pool");
const { requireAuth } = require("../middleware/auth");
const { validatePlan } = require("../middleware/validate");

const router = express.Router();

// All plan routes require authentication
router.use(requireAuth);

// GET /api/plans — Get the user's active plan + checklist
router.get("/", async (req, res) => {
    try {
        const planResult = await pool.query(
            "SELECT id, path, recommended_skill, reason, time_commitment, goal, roadmap_name, created_at, updated_at FROM user_plans WHERE user_id = $1",
            [req.user.id]
        );

        if (planResult.rows.length === 0) {
            return res.json({ plan: null });
        }

        const plan = planResult.rows[0];

        const checklistResult = await pool.query(
            "SELECT day_number, task, completed FROM plan_checklist WHERE plan_id = $1 ORDER BY day_number",
            [plan.id]
        );

        res.json({
            plan: {
                path: plan.path,
                recommendedSkill: plan.recommended_skill,
                reason: plan.reason,
                time: plan.time_commitment,
                goal: plan.goal,
                roadmapName: plan.roadmap_name,
                checklist: checklistResult.rows.map((row) => ({
                    day: row.day_number,
                    task: row.task,
                    completed: row.completed,
                })),
                createdAt: plan.created_at,
                updatedAt: plan.updated_at,
            },
        });
    } catch (err) {
        console.error("Get plan error:", err.message);
        res.status(500).json({ error: "Could not retrieve plan." });
    }
});

// POST /api/plans — Save a new plan (replaces existing)
router.post("/", async (req, res) => {
    const errors = validatePlan(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ error: "Invalid plan data.", details: errors });
    }

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        // Delete existing plan (cascade deletes checklist)
        await client.query("DELETE FROM user_plans WHERE user_id = $1", [req.user.id]);

        // Insert new plan
        const planResult = await client.query(
            `INSERT INTO user_plans (user_id, path, recommended_skill, reason, time_commitment, goal, roadmap_name)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
            [req.user.id, req.body.path, req.body.recommendedSkill, req.body.reason, req.body.time, req.body.goal, req.body.roadmapName]
        );

        const planId = planResult.rows[0].id;

        // Insert checklist items
        for (const item of req.body.checklist) {
            await client.query(
                "INSERT INTO plan_checklist (plan_id, day_number, task, completed) VALUES ($1, $2, $3, $4)",
                [planId, item.day, item.task, item.completed]
            );
        }

        await client.query("COMMIT");

        res.status(201).json({ message: "Plan saved successfully." });
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Save plan error:", err.message);
        res.status(500).json({ error: "Could not save plan." });
    } finally {
        client.release();
    }
});

// PATCH /api/plans/checklist/:day — Toggle a checklist day
router.patch("/checklist/:day", async (req, res) => {
    const day = parseInt(req.params.day, 10);
    if (isNaN(day) || day < 1 || day > 7) {
        return res.status(400).json({ error: "Invalid day number (1-7)." });
    }

    if (typeof req.body.completed !== "boolean") {
        return res.status(400).json({ error: "completed must be a boolean." });
    }

    try {
        const planResult = await pool.query(
            "SELECT id FROM user_plans WHERE user_id = $1",
            [req.user.id]
        );

        if (planResult.rows.length === 0) {
            return res.status(404).json({ error: "No plan found." });
        }

        const result = await pool.query(
            "UPDATE plan_checklist SET completed = $1 WHERE plan_id = $2 AND day_number = $3 RETURNING day_number, completed",
            [req.body.completed, planResult.rows[0].id, day]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Checklist item not found." });
        }

        // Update plan's updated_at timestamp
        await pool.query("UPDATE user_plans SET updated_at = NOW() WHERE id = $1", [planResult.rows[0].id]);

        res.json({ day: result.rows[0].day_number, completed: result.rows[0].completed });
    } catch (err) {
        console.error("Update checklist error:", err.message);
        res.status(500).json({ error: "Could not update checklist." });
    }
});

// DELETE /api/plans — Reset/delete the user's plan
router.delete("/", async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM user_plans WHERE user_id = $1 RETURNING id",
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No plan found to delete." });
        }

        res.json({ message: "Plan deleted successfully." });
    } catch (err) {
        console.error("Delete plan error:", err.message);
        res.status(500).json({ error: "Could not delete plan." });
    }
});

module.exports = router;
