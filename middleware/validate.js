/**
 * Input validation helpers for SkillSprint API routes.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/[^\s]+$/i;

const VALID_PATHS = ["Freelancing", "Affiliate Marketing", "Online Jobs"];
const VALID_GOALS = ["Side income", "Long-term income", "Remote job", "Build a business"];
const VALID_TIMES = ["Less than 1 hour", "1–2 hours", "2–4 hours", "4+ hours"];
const VALID_SKILLS = [
    "Web Development", "Graphic Design", "Content Writing",
    "Video Editing", "Excel & Data", "Social Media Management"
];

function validateEmail(email) {
    return typeof email === "string" && EMAIL_REGEX.test(email.trim()) && email.length <= 255;
}

function validatePassword(password) {
    return typeof password === "string" && password.length >= 8 && password.length <= 128;
}

function sanitizeText(text, maxLen = 800) {
    if (typeof text !== "string") return null;
    const trimmed = text.trim();
    if (trimmed.length === 0 || trimmed.length > maxLen) return null;
    return trimmed;
}

function validatePlan(body) {
    const errors = [];

    if (!VALID_PATHS.includes(body.path)) errors.push("Invalid path.");
    if (!sanitizeText(body.recommendedSkill, 160)) errors.push("Invalid recommended skill.");
    if (!sanitizeText(body.reason)) errors.push("Invalid reason.");
    if (!VALID_TIMES.includes(body.time)) errors.push("Invalid time commitment.");
    if (!VALID_GOALS.includes(body.goal)) errors.push("Invalid goal.");
    if (!VALID_SKILLS.includes(body.roadmapName)) errors.push("Invalid roadmap name.");

    if (!Array.isArray(body.checklist) || body.checklist.length !== 7) {
        errors.push("Checklist must have exactly 7 items.");
    } else {
        body.checklist.forEach((item, i) => {
            if (!item || item.day !== i + 1) errors.push(`Invalid day number at index ${i}.`);
            if (!sanitizeText(item.task)) errors.push(`Invalid task at day ${i + 1}.`);
            if (typeof item.completed !== "boolean") errors.push(`Invalid completed flag at day ${i + 1}.`);
        });
    }

    return errors;
}

function validateSkill(skill) {
    return VALID_SKILLS.includes(skill);
}

function validateUrl(url) {
    return typeof url === "string" && URL_REGEX.test(url) && url.length <= 300;
}

module.exports = {
    validateEmail,
    validatePassword,
    sanitizeText,
    validatePlan,
    validateSkill,
    validateUrl,
    VALID_PATHS,
    VALID_GOALS,
    VALID_TIMES,
    VALID_SKILLS,
};
