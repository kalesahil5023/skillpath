/**
 * SkillSprint Application Logic
 * Extracted from the monolithic index.html. All bugs fixed:
 * - escapeHtml() moved to top (was defined after first use)
 * - Inline onclick handlers replaced with addEventListener
 * - Auth UI added (login/register modal)
 * - API integration with localStorage fallback
 */

/* ── Utility Functions (must be first) ── */

function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[character]);
}

function isPlanText(value, maximumLength = 800) {
    return typeof value === "string" && value.trim().length > 0 && value.length <= maximumLength;
}

function isValidAffiliateUrl(url) {
    return typeof url === "string" && /^https:\/\/[^\s]+$/i.test(url);
}

/* ── Auth UI ── */

let currentMyPlan = null;
let myPlanNotice = "";

function renderAuthUI() {
    const navAuth = document.getElementById("navAuth");
    if (!navAuth) return;

    if (ApiClient.isLoggedIn()) {
        const user = ApiClient.getCurrentUser();
        navAuth.innerHTML = `
            <span class="nav-auth-user" title="${escapeHtml(user.email)}">${escapeHtml(user.displayName || user.email)}</span>
            <button type="button" id="logoutButton" class="secondary-button">Log out</button>
        `;
        document.getElementById("logoutButton").addEventListener("click", async () => {
            await ApiClient.logout();
            renderAuthUI();
            currentMyPlan = readMyPlan();
            renderMyPlan();
        });
    } else {
        navAuth.innerHTML = `
            <button type="button" id="openAuthButton" class="secondary-button">Log in</button>
        `;
        document.getElementById("openAuthButton").addEventListener("click", () => openAuthModal("login"));
    }
}

function openAuthModal(mode = "login") {
    const modal = document.getElementById("authModal");
    const isLogin = mode === "login";

    modal.innerHTML = `
        <div class="auth-modal-dialog" tabindex="-1" style="position:relative">
            <button type="button" class="auth-modal-close" aria-label="Close">&times;</button>
            <h3>${isLogin ? "Log in to SkillSprint" : "Create your account"}</h3>
            <p>${isLogin ? "Access your saved plans and progress across devices." : "Save your plans and track progress across devices."}</p>
            <form id="authForm" novalidate>
                ${!isLogin ? '<label for="authDisplayName">Name (optional)</label><input id="authDisplayName" type="text" maxlength="100" placeholder="Your name">' : ""}
                <label for="authEmail">Email</label>
                <input id="authEmail" type="email" maxlength="255" required placeholder="you@example.com">
                <label for="authPassword">Password</label>
                <input id="authPassword" type="password" minlength="8" maxlength="128" required placeholder="${isLogin ? "Your password" : "At least 8 characters"}">
                <div class="auth-error" id="authError" aria-live="polite"></div>
                <button type="submit">${isLogin ? "Log in" : "Create account"}</button>
            </form>
            <p class="auth-modal-switch">${isLogin ? 'Don\'t have an account? <a id="switchToRegister">Create one</a>' : 'Already have an account? <a id="switchToLogin">Log in</a>'}</p>
        </div>
    `;

    modal.hidden = false;
    const dialog = modal.querySelector(".auth-modal-dialog");
    dialog.focus();

    const close = () => { modal.hidden = true; modal.innerHTML = ""; };
    modal.querySelector(".auth-modal-close").addEventListener("click", close);
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    dialog.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    const switchLink = modal.querySelector("#switchToRegister, #switchToLogin");
    if (switchLink) {
        switchLink.addEventListener("click", (e) => {
            e.preventDefault();
            openAuthModal(isLogin ? "register" : "login");
        });
    }

    modal.querySelector("#authForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("authEmail").value.trim();
        const password = document.getElementById("authPassword").value;
        const errorEl = document.getElementById("authError");
        errorEl.textContent = "";

        let result;
        if (isLogin) {
            result = await ApiClient.login(email, password);
        } else {
            const displayName = document.getElementById("authDisplayName")?.value.trim() || "";
            result = await ApiClient.register(email, password, displayName);
        }

        if (result.ok) {
            close();
            renderAuthUI();
            // Sync plan from server
            await syncPlanFromServer();
            renderMyPlan();
        } else {
            errorEl.textContent = result.data?.error || "Something went wrong. Please try again.";
        }
    });
}

async function syncPlanFromServer() {
    if (!ApiClient.isLoggedIn()) return;
    try {
        const result = await ApiClient.getPlan();
        if (result.ok && result.data.plan) {
            const plan = result.data.plan;
            plan.version = MY_PLAN_VERSION;
            if (isValidMyPlan(plan)) {
                currentMyPlan = plan;
                writeMyPlan(plan);
            }
        }
    } catch { /* Fallback to localStorage */ }
}

/* ── Resource Helpers ── */

function getConfiguredResources(resourceIds) {
    return resourceIds.map((id) => {
        const resource = RESOURCE_CATALOG[id];
        if (!resource) return null;
        const isAffiliate = resource.affiliateStatus === "active" && isValidAffiliateUrl(resource.affiliateUrl);
        return { ...resource, url: isAffiliate ? resource.affiliateUrl : resource.officialUrl, isAffiliate };
    }).filter(Boolean);
}

function projectResourceIds(skill, projectType) {
    return Object.values(RESOURCE_CATALOG)
        .filter((resource) => resource.relevantSkills.includes(skill) && resource.relevantProjects.includes(projectType))
        .slice(0, 3)
        .map((resource) => resource.id);
}

function renderRecommendedResources(resourceIds, context = {}) {
    if (!resourceIds || resourceIds.length === 0) return "";

    const resources = getConfiguredResources(resourceIds);
    const resourceCards = resources.map((resource) => {
        const labels = [resource.pricingType, ...(resource.isAffiliate ? ["Affiliate link"] : [])]
            .map((label) => `<span class="resource-label ${label.toLowerCase()}">${label}</span>`)
            .join("");

        return `
            <article class="resource-card">
                <p class="resource-category">${resource.category}</p>
                <div class="resource-labels" aria-label="Resource labels">${labels}</div>
                <h5>${resource.name}</h5>
                <p>${resource.description}</p>
                <p class="resource-why"><strong>Why we recommend it:</strong> ${resource.whyRecommended}</p>
                <p class="builder-note"><strong>For:</strong> ${resource.recommendedFor}<br><strong>Free alternative:</strong> ${resource.freeAlternative}<br><strong>Limitations:</strong> ${resource.limitations}<br>Affiliate status: ${resource.isAffiliate ? "active" : resource.affiliateStatus} · Checked: ${resource.dateChecked}</p>
                ${resource.isAffiliate ? `<p class="builder-note">SkillSprint may earn a commission if you purchase through this link, at no additional cost to you. <a href="affiliate-disclosure.html">Affiliate Disclosure</a></p>` : ""}
                <a class="resource-button" data-resource-id="${resource.id}" data-resource-category="${escapeHtml(resource.category)}" data-resource-context="${escapeHtml(context.skill || "")}" data-resource-placement="${escapeHtml(context.placement || "general")}" href="${resource.url}" target="_blank" rel="noopener noreferrer">Visit Resource</a>
            </article>
        `;
    }).join("");

    const disclosure = resources.some((resource) => resource.isAffiliate)
        ? `<aside class="affiliate-disclosure" aria-label="Affiliate disclosure"><h5>Affiliate Disclosure</h5><p>Some links in this section are affiliate links. SkillSprint may earn a commission at no additional cost to you. <a href="affiliate-disclosure.html">Read the full Affiliate Disclosure.</a></p></aside>`
        : "";

    return `
        <section class="recommended-resources" aria-label="Recommended Tools and Resources">
            <h4>Recommended Tools &amp; Resources</h4>
            <p class="resources-intro">These are direct links to official resources. Availability and pricing can change; review each provider's current terms before using it.</p>
            <div class="resource-grid">${resourceCards}</div>
            ${disclosure}
        </section>
    `;
}

/* ── Roadmap Progress ── */

function roadmapProgressKey(skill) { return `${ROADMAP_PROGRESS_STORAGE_PREFIX}${skill}`; }
function roadmapTaskCount(skill) { return roadmapActionPlans[skill].stages.reduce((total, [, tasks]) => total + tasks.length, 0); }

function readRoadmapProgress(skill) {
    try {
        const saved = JSON.parse(window.localStorage.getItem(roadmapProgressKey(skill)));
        return Array.isArray(saved) && saved.length === roadmapTaskCount(skill) && saved.every((v) => typeof v === "boolean") ? saved : Array(roadmapTaskCount(skill)).fill(false);
    } catch { return Array(roadmapTaskCount(skill)).fill(false); }
}

function writeRoadmapProgress(skill, progress) {
    try { window.localStorage.setItem(roadmapProgressKey(skill), JSON.stringify(progress)); return true; } catch { return false; }
}

function getRoadmapProgress(skill) {
    const tasks = readRoadmapProgress(skill);
    const total = tasks.length;
    const completed = tasks.filter(Boolean).length;
    return { tasks, total, completed, percent: total ? Math.round((completed / total) * 100) : 0 };
}

function getRoadmapTaskDetail(skill, stage, task, taskIndex) {
    const guide = roadmapStageDetailGuidance[stage];
    return {
        title: task,
        objective: `${task} This is a focused ${stage.toLowerCase()} milestone in your ${skill} roadmap.`,
        why: guide.why,
        steps: guide.steps(task),
        outcome: guide.outcome(task),
        taskIndex
    };
}

function setRoadmapTaskCompletion(skill, taskIndex, completed) {
    const updated = readRoadmapProgress(skill);
    updated[taskIndex] = completed;
    const localSaved = writeRoadmapProgress(skill, updated);

    // Also save to server if logged in
    if (ApiClient.isLoggedIn()) {
        ApiClient.setTaskCompletion(skill, taskIndex, completed).catch(() => {});
    }

    return localSaved;
}

/* ── Task Modal ── */

let lastRoadmapTaskTrigger = null;

function openRoadmapTaskModal(skill, taskIndex, trigger) {
    const actionPlan = roadmapActionPlans[skill];
    let currentIndex = 0;
    let selected;
    actionPlan.stages.some(([stage, tasks]) => tasks.some((task) => {
        if (currentIndex++ === taskIndex) { selected = { stage, task }; return true; }
        return false;
    }));
    if (!selected) return;
    const detail = getRoadmapTaskDetail(skill, selected.stage, selected.task, taskIndex);
    const modal = document.getElementById("roadmapTaskModal");
    const completed = readRoadmapProgress(skill)[taskIndex];
    lastRoadmapTaskTrigger = trigger;
    modal.innerHTML = `<div class="task-modal-dialog" tabindex="-1"><div class="task-modal-header"><div><p class="eyebrow">${escapeHtml(selected.stage)} task · ${escapeHtml(skill)}</p><h3 id="roadmapTaskModalTitle">${escapeHtml(detail.title)}</h3></div><button type="button" class="task-modal-close" aria-label="Close task details">×</button></div><h4>Objective</h4><p>${escapeHtml(detail.objective)}</p><h4>Why this matters</h4><p>${escapeHtml(detail.why)}</p><h4>Step-by-step instructions</h4><ol>${detail.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol><h4>Expected outcome</h4><p>${escapeHtml(detail.outcome)}</p>${renderRecommendedResources(roadmapResources[skill].slice(0, 2), { skill, placement: "roadmap_task" })}<div class="task-modal-actions"><button type="button" class="secondary-button" data-close-task>Continue working</button><button type="button" ${completed ? "disabled" : ""} data-complete-task>${completed ? "Task completed" : "Mark as Complete"}</button></div></div>`;
    modal.hidden = false;
    const dialog = modal.querySelector(".task-modal-dialog");
    const close = () => { modal.hidden = true; modal.innerHTML = ""; lastRoadmapTaskTrigger?.focus(); };
    modal.querySelectorAll("[data-close-task], .task-modal-close").forEach((button) => button.addEventListener("click", close));
    modal.addEventListener("click", (event) => { if (event.target === modal) close(); }, { once: true });
    dialog.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
    modal.querySelector("[data-complete-task]")?.addEventListener("click", () => {
        if (!setRoadmapTaskCompletion(skill, taskIndex, true)) return;
        close();
        showRoadmap(skill);
        if (currentMyPlan && currentMyPlan.roadmapName === skill) renderMyPlan();
    });
    dialog.focus();
}

/* ── Show Roadmap ── */

function showRoadmap(skill) {
    const roadmap = skillRoadmaps[skill];
    const actionPlan = roadmapActionPlans[skill];
    const result = document.getElementById("roadmapResult");
    const list = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    const progress = getRoadmapProgress(skill);
    let taskIndex = 0;

    const stages = actionPlan.stages.map(([stage, tasks], stageIndex) => {
        const taskMarkup = tasks.map((task) => {
            const index = taskIndex++;
            const actionLabel = stage === "Build" ? "Build this project" : stage === "Portfolio" ? "Add to Portfolio" : stage === "Find Work" ? "Prepare to apply" : "Start this task";
            return `<div class="roadmap-task ${progress.tasks[index] ? "is-complete" : ""}"><div class="roadmap-task-copy"><input type="checkbox" tabindex="-1" aria-hidden="true" ${progress.tasks[index] ? "checked" : ""} disabled><span>${escapeHtml(task)}</span></div><button type="button" class="secondary-button" data-roadmap-task-detail="${index}">${progress.tasks[index] ? "Review task" : actionLabel}</button></div>`;
        }).join("");
        return `<section class="roadmap-stage" aria-labelledby="${skill.replace(/[^a-z0-9]/gi, "").toLowerCase()}-stage-${stageIndex}"><div class="roadmap-stage-heading"><span>0${stageIndex + 1}</span><div><h4 id="${skill.replace(/[^a-z0-9]/gi, "").toLowerCase()}-stage-${stageIndex}">${stage}</h4><p>${stage === "Find Work" ? "Prepare carefully, apply honestly, and keep expectations realistic." : "Open a task for clear instructions, then mark it complete only after you finish the work."}</p></div></div><div class="roadmap-task-list">${taskMarkup}</div></section>`;
    }).join("");

    const projects = actionPlan.projects.map(([title, build, demonstrates, portfolio], index) => `<article class="roadmap-project"><span>Project ${index + 1}</span><h4>${escapeHtml(title)}</h4><p><strong>Build:</strong> ${escapeHtml(build)}</p><p><strong>Demonstrates:</strong> ${escapeHtml(demonstrates)}</p><p><strong>Add to your portfolio:</strong> ${escapeHtml(portfolio)}</p><button type="button" class="secondary-button" data-portfolio-project="${index}">Add this project to Portfolio Builder</button></article>`).join("");

    result.innerHTML = `
        <div class="roadmap-header"><h3>${skill} Roadmap</h3><p>${roadmap.description}</p></div>
        <div class="roadmap-body">
            <section class="roadmap-progress" aria-live="polite"><div><p class="eyebrow">Your learning-to-earning journey</p><h4>Roadmap progress: <span id="roadmapProgressPercent">${progress.percent}%</span></h4><p id="roadmapProgressCount">${progress.completed} of ${progress.total} tasks completed</p></div><div class="roadmap-progress-track" aria-hidden="true"><span id="roadmapProgressBar" style="width:${progress.percent}%"></span></div></section>
            <section class="roadmap-actions" aria-label="${skill} action stages"><div class="roadmap-actions-intro"><h4>Learn → Practice → Build → Portfolio → Find Work</h4><p>Work through one small, practical task at a time. Your progress is saved ${ApiClient.isLoggedIn() ? "to your account" : "only in this browser"}.</p></div>${stages}</section>
            <section class="roadmap-projects"><h4>Beginner project outputs</h4><div class="roadmap-project-grid">${projects}</div></section>
            <div class="roadmap-overview">
                <div class="roadmap-info-card"><h4>Who it is suitable for</h4><p>${roadmap.suitable}</p></div>
                <div class="roadmap-info-card"><h4>Beginner difficulty</h4><p>${roadmap.difficulty}</p></div>
            </div>
            <div class="roadmap-content-grid">
                <section class="roadmap-panel"><h4>What to learn first</h4>${list(roadmap.learn)}</section>
                <section class="roadmap-panel"><h4>What to practice</h4>${list(roadmap.practice)}</section>
                <section class="roadmap-panel"><h4>Three beginner project ideas</h4><ol>${roadmap.projects.map((item) => `<li>${item}</li>`).join("")}</ol></section>
                <section class="roadmap-panel"><h4>How to build a portfolio</h4><p>${roadmap.portfolio}</p></section>
                <section class="roadmap-panel"><h4>Where to look for legitimate work</h4><p>${roadmap.work}</p></section>
                <section class="roadmap-panel"><h4>Realistic beginner expectation</h4><p>${roadmap.expectation}</p></section>
            </div>
            <h4>Common mistakes to avoid</h4>
            <section class="roadmap-panel">${list(roadmap.mistakes)}</section>
            <h4>Your 30-day beginner roadmap</h4>
            <div class="roadmap-steps">${roadmap.plan.map((item, index) => `<section class="roadmap-step"><h4>Step ${index + 1}</h4><p>${item}</p></section>`).join("")}</div>
            ${renderRecommendedResources(roadmapResources[skill], { skill, placement: "roadmap" })}
        </div>
    `;
    result.hidden = false;

    result.querySelectorAll("[data-roadmap-task-detail]").forEach((button) => {
        button.addEventListener("click", function () { openRoadmapTaskModal(skill, Number(this.dataset.roadmapTaskDetail), this); });
    });
    result.querySelectorAll("[data-portfolio-project]").forEach((button) => {
        button.addEventListener("click", function () {
            const [title, build, demonstrates, portfolio] = actionPlan.projects[Number(this.dataset.portfolioProject)];
            document.getElementById("portfolioTitle").value = title;
            document.getElementById("portfolioDescription").value = build;
            document.getElementById("portfolioSkills").value = demonstrates;
            document.getElementById("portfolioTools").value = "Add the tools you actually used";
            document.getElementById("portfolioOutcome").value = portfolio;
            const builder = document.getElementById("portfolioBuilderForm");
            builder.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
            document.getElementById("portfolioTitle").focus({ preventScroll: true });
        });
    });
    result.scrollIntoView({ behavior: "smooth", block: "start" });
    result.focus();
    trackProductEvent("roadmap_opened", { skill });
}

// Wire up roadmap buttons (replaces inline onclick)
document.querySelectorAll("[data-roadmap]").forEach((button) => {
    button.addEventListener("click", function () { showRoadmap(this.dataset.roadmap); });
});

/* ── My Plan ── */

function isValidMyPlan(plan) {
    return Boolean(
        plan &&
        plan.version === MY_PLAN_VERSION &&
        Object.prototype.hasOwnProperty.call(pathDetails, plan.path) &&
        Object.prototype.hasOwnProperty.call(skillRoadmaps, plan.roadmapName) &&
        isPlanText(plan.recommendedSkill, 160) &&
        isPlanText(plan.reason) &&
        Object.prototype.hasOwnProperty.call(weeklyTime, plan.time) &&
        myPlanGoals.has(plan.goal) &&
        Array.isArray(plan.checklist) &&
        plan.checklist.length === 7 &&
        plan.checklist.every((item, index) => item && item.day === index + 1 && isPlanText(item.task) && typeof item.completed === "boolean")
    );
}

function readMyPlan() {
    try {
        const savedPlan = JSON.parse(window.localStorage.getItem(MY_PLAN_STORAGE_KEY));
        return isValidMyPlan(savedPlan) ? savedPlan : null;
    } catch { return null; }
}

function writeMyPlan(plan) {
    try { window.localStorage.setItem(MY_PLAN_STORAGE_KEY, JSON.stringify(plan)); return true; } catch { return false; }
}

function scrollToMyPlan() {
    const section = document.getElementById("my-plan");
    section.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    section.focus({ preventScroll: true });
}

function getPlanProgress(plan) {
    return plan.checklist.filter((item) => item.completed).length;
}

function renderMyPlan() {
    const container = document.getElementById("myPlanContent");
    const plan = currentMyPlan;

    if (!plan) {
        container.innerHTML = `
            <div class="my-plan-card my-plan-empty">
                <h3>Your personalized plan will appear here.</h3>
                <p>Complete Path Finder to get a practical seven-day starter plan you can save on this device.</p>
                <button type="button" id="completePathFinderButton">Complete Path Finder</button>
                ${myPlanNotice ? `<p class="plan-status" role="status">${escapeHtml(myPlanNotice)}</p>` : ""}
            </div>
        `;
        document.getElementById("completePathFinderButton").addEventListener("click", function () {
            const finder = document.getElementById("path-finder-title");
            finder.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
            finder.focus({ preventScroll: true });
        });
        return;
    }

    const completed = getPlanProgress(plan);
    const percent = (completed / plan.checklist.length) * 100;
    const roadmapJourney = getRoadmapProgress(plan.roadmapName);
    const syncBadge = ApiClient.isLoggedIn() ? ' <span class="sync-badge">Synced</span>' : "";

    const checklist = plan.checklist.map((item, index) => `
        <label class="plan-day">
            <input type="checkbox" data-plan-day="${index}" ${item.completed ? "checked" : ""} aria-label="Mark Day ${item.day} as complete">
            <span class="plan-day-content"><span class="plan-day-number">Day ${item.day}</span><span class="plan-day-task">${escapeHtml(item.task)}</span></span>
        </label>
    `).join("");

    container.innerHTML = `
        <div class="my-plan-card">
            <h3>Your saved starter plan${syncBadge}</h3>
            <div class="my-plan-summary">
                <div><span>Recommended path</span><strong>${escapeHtml(plan.path)}</strong></div>
                <div><span>Recommended skill</span><strong>${escapeHtml(plan.recommendedSkill)}</strong></div>
                <div><span>Your focus</span><strong>${escapeHtml(plan.goal)}</strong></div>
            </div>
            <p class="my-plan-reason">${escapeHtml(plan.reason)}</p>
            <div class="plan-progress-row" aria-live="polite"><div class="plan-progress-track" aria-hidden="true"><span id="myPlanProgressBar" style="width:${percent}%"></span></div><strong id="myPlanProgressCount">Progress: ${completed}/7 completed</strong></div>
            <div class="my-plan-roadmap"><div><span>Roadmap journey</span><strong>${escapeHtml(plan.roadmapName)}: ${roadmapJourney.percent}%</strong><p>${roadmapJourney.completed} of ${roadmapJourney.total} action tasks completed.</p></div><button type="button" id="continueRoadmapButton" class="secondary-button">Continue Roadmap</button></div>
            <h3>7-Day Starter Plan</h3>
            <div class="plan-checklist">${checklist}</div>
            ${renderRecommendedResources(roadmapResources[plan.roadmapName].slice(0, 2), { skill: plan.roadmapName, placement: "my_plan" }).replace("Recommended Tools &amp; Resources", "Resources that may help with your path")}
            <div class="my-plan-actions">
                <button type="button" id="continuePlanButton">Continue Plan</button>
                <button type="button" id="viewSavedRoadmapButton" class="secondary-button">View Skill Roadmap</button>
                <button type="button" id="resetPlanButton" class="secondary-button">Reset Plan</button>
            </div>
            ${myPlanNotice ? `<p class="plan-status" role="status">${escapeHtml(myPlanNotice)}</p>` : ""}
        </div>
    `;

    container.querySelectorAll("[data-plan-day]").forEach((input) => {
        input.addEventListener("change", function () {
            const item = currentMyPlan.checklist[Number(this.dataset.planDay)];
            const previousState = item.completed;
            item.completed = this.checked;
            if (!writeMyPlan(currentMyPlan)) {
                item.completed = previousState;
                myPlanNotice = "Your progress could not be saved in this browser.";
                renderMyPlan();
                return;
            }

            // Also save to server
            if (ApiClient.isLoggedIn()) {
                ApiClient.toggleChecklistDay(item.day, item.completed).catch(() => {});
            }

            const newCompleted = getPlanProgress(currentMyPlan);
            container.querySelector("#myPlanProgressBar").style.width = `${(newCompleted / 7) * 100}%`;
            container.querySelector("#myPlanProgressCount").textContent = `Progress: ${newCompleted}/7 completed`;
            trackProductEvent("plan_task_completed", { day: item.day, completed: item.completed });
        });
    });

    document.getElementById("continuePlanButton").addEventListener("click", scrollToMyPlan);
    document.getElementById("continueRoadmapButton").addEventListener("click", () => showRoadmap(currentMyPlan.roadmapName));
    document.getElementById("viewSavedRoadmapButton").addEventListener("click", () => showRoadmap(currentMyPlan.roadmapName));
    document.getElementById("resetPlanButton").addEventListener("click", function () {
        if (!window.confirm("Reset your saved SkillSprint plan? Your completed checklist items will be cleared from this device.")) return;
        try {
            window.localStorage.removeItem(MY_PLAN_STORAGE_KEY);
            if (ApiClient.isLoggedIn()) ApiClient.deletePlan().catch(() => {});
            currentMyPlan = null;
            myPlanNotice = "Your saved plan has been reset.";
            renderMyPlan();
            document.getElementById("completePathFinderButton").focus();
        } catch {
            myPlanNotice = "Your plan could not be reset in this browser.";
            renderMyPlan();
        }
    });
}

function saveMyPlan(plan) {
    if (!isValidMyPlan(plan) || !writeMyPlan(plan)) return false;
    currentMyPlan = plan;
    myPlanNotice = "Your plan has been saved on this device.";

    // Also save to server
    if (ApiClient.isLoggedIn()) {
        ApiClient.savePlan(plan).then((result) => {
            if (result.ok) {
                myPlanNotice = "Your plan has been saved and synced to your account.";
                renderMyPlan();
            }
        }).catch(() => {});
    }

    renderMyPlan();
    return true;
}

// Load plan
currentMyPlan = readMyPlan();
renderMyPlan();

/* ── Path Finder Recommendation Engine ── */

function getRecommendation(skills, time, goal) {
    const scores = { "Freelancing": 0, "Affiliate Marketing": 0, "Online Jobs": 0 };
    const skillScores = {
        "Technology": { "Freelancing": 3, "Online Jobs": 3 },
        "Design": { "Freelancing": 3, "Affiliate Marketing": 1, "Online Jobs": 1 },
        "Writing": { "Freelancing": 2, "Affiliate Marketing": 3, "Online Jobs": 1 },
        "Social Media": { "Freelancing": 2, "Affiliate Marketing": 3 },
        "Data/Excel": { "Freelancing": 2, "Online Jobs": 3 },
        "Video": { "Freelancing": 3, "Affiliate Marketing": 2 }
    };
    skills.forEach((skill) => {
        Object.entries(skillScores[skill]).forEach(([path, points]) => { scores[path] += points; });
    });
    const goalScores = {
        "Side income": { "Freelancing": 2, "Affiliate Marketing": 2 },
        "Long-term income": { "Freelancing": 1, "Affiliate Marketing": 3 },
        "Remote job": { "Freelancing": 1, "Online Jobs": 4 },
        "Build a business": { "Freelancing": 1, "Affiliate Marketing": 4 }
    };
    const timeScores = {
        "Less than 1 hour": { "Affiliate Marketing": 2, "Online Jobs": 1 },
        "1–2 hours": { "Freelancing": 1, "Affiliate Marketing": 2 },
        "2–4 hours": { "Freelancing": 2, "Online Jobs": 2, "Affiliate Marketing": 1 },
        "4+ hours": { "Freelancing": 2, "Online Jobs": 2, "Affiliate Marketing": 1 }
    };
    [goalScores[goal], timeScores[time]].forEach((scoreGroup) => {
        Object.entries(scoreGroup).forEach(([path, points]) => { scores[path] += points; });
    });
    const ranked = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    return { primary: ranked[0], runnerUp: ranked[1], scores };
}

/* ── Path Finder Form ── */

document.getElementById("pathFinderForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const selectedSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map((input) => input.value);
    const time = document.querySelector('input[name="time"]:checked');
    const goal = document.querySelector('input[name="goal"]:checked');
    const skillsError = document.getElementById("skills-error");

    skillsError.textContent = "";
    if (selectedSkills.length === 0) {
        skillsError.textContent = "Please choose at least one skill or interest.";
        document.querySelector('input[name="skills"]').focus();
        return;
    }
    if (!time || !goal) { this.reportValidity(); return; }

    const recommendationResult = getRecommendation(selectedSkills, time.value, goal.value);
    const recommendation = recommendationResult.primary;
    const details = pathDetails[recommendation];
    const result = document.getElementById("pathResult");
    const skillList = selectedSkills.join(", ");
    const recommendedSkill = skillRecommendations[recommendation][selectedSkills[0]];
    const roadmapName = roadmapLinks[recommendation][selectedSkills[0]];
    const reason = `Your selected interests in ${skillList}, your ${time.value.toLowerCase()} availability, and your goal of ${goal.value.toLowerCase()} make ${recommendation.toLowerCase()} the most suitable place to begin.`;
    const planChecklist = details.checklist.map((item, index) => {
        const firstDayNote = index === 0 ? ` Start with ${recommendedSkill.toLowerCase()} where possible.` : "";
        return { day: index + 1, task: `${item}${firstDayNote}`, completed: false };
    });
    const starterPlan = planChecklist.map((item) => `<li><strong>Day ${item.day}:</strong> ${item.task}</li>`).join("");

    result.innerHTML = `
        <div class="result-header">
            <p class="result-eyebrow">Your personalized recommendation</p>
            <h3>Start with ${recommendation}</h3>
            <p>${reason}</p>
        </div>
        <div class="result-body">
            <div class="recommendation-details">
                <div class="detail-card"><h4>Skill to start with</h4><p>${recommendedSkill}</p></div>
                <div class="detail-card"><h4>Beginner difficulty</h4><p>${pathDifficulty[recommendation]}</p></div>
                <div class="detail-card"><h4>Weekly time commitment</h4><p>${weeklyTime[time.value]}</p></div>
            </div>
            <h4>Suitable skills</h4><p>${details.suitableSkills}</p>
            <h4>Also worth considering</h4><p>${recommendationResult.runnerUp} is a reasonable runner-up based on your answers. This is a starting suggestion, not a guarantee or an authoritative assessment.</p>
            <h4>A realistic beginner expectation</h4><p>${details.expectation}</p>
            <h4>Your personalized 7-day starter plan</h4><ol>${starterPlan}</ol>
            <div class="result-actions">
                <button type="button" id="startPathButton">Start This Path</button>
                <button type="button" id="savePlanButton">Save My Plan</button>
                <button type="button" id="viewRoadmapButton" class="secondary-button">View ${roadmapName} Roadmap</button>
                <button type="button" id="tryAgainButton" class="secondary-button">Try Again</button>
            </div>
            <p id="savePlanStatus" class="plan-status" role="status"></p>
        </div>
    `;
    result.hidden = false;
    result.focus();
    trackProductEvent("path_finder_completed", { recommended_path: recommendation });

    document.getElementById("startPathButton").addEventListener("click", () => { showRoadmap(roadmapName); showMessage(recommendation); });
    document.getElementById("viewRoadmapButton").addEventListener("click", () => showRoadmap(roadmapName));
    document.getElementById("savePlanButton").addEventListener("click", function () {
        const saved = saveMyPlan({
            version: MY_PLAN_VERSION, path: recommendation, recommendedSkill, reason, time: time.value, goal: goal.value, roadmapName,
            checklist: planChecklist.map((item) => ({ ...item }))
        });
        if (saved) trackProductEvent("plan_saved", { path: recommendation });
        const status = document.getElementById("savePlanStatus");
        status.textContent = saved ? "Plan saved. Opening My Plan…" : "Your plan could not be saved in this browser.";
        if (saved) scrollToMyPlan();
    });
    document.getElementById("tryAgainButton").addEventListener("click", function () {
        document.getElementById("pathFinderForm").reset();
        updatePathProgress();
        result.hidden = true;
        document.getElementById("pathFinderForm").scrollIntoView({ behavior: "smooth", block: "start" });
        document.querySelector('input[name="skills"]').focus();
    });
});

/* ── Earning Path Content (replaces inline onclick) ── */

function showMessage(option) {
    const message = document.getElementById("message");
    const path = earningPathContent[option];
    if (!path) { message.innerHTML = ""; return; }

    const sections = path.sections.map(([title, content, extraClass = ""]) => `
        <section class="path-detail-card ${extraClass}">
            <h3>${title}</h3>
            ${content.startsWith("<") ? content : `<p>${content}</p>`}
        </section>
    `).join("");

    message.innerHTML = `
        <article class="path-content">
            <header class="path-content-header"><h2>${path.title}</h2><p>${path.intro}</p></header>
            <div class="path-content-body">
                <div class="path-detail-grid">${sections}</div>
                ${renderRecommendedResources(path.resources, { placement: "earning_path" })}
                <div class="path-actions">
                    <button type="button" data-scroll-to="path-finder">Use the Path Finder</button>
                    ${path.roadmaps.map((roadmap) => `<button type="button" class="secondary-button" data-path-roadmap="${roadmap}">View ${roadmap} Roadmap</button>`).join("")}
                </div>
            </div>
        </article>
    `;

    message.querySelector('[data-scroll-to="path-finder"]').addEventListener("click", () => {
        document.getElementById("path-finder-title").scrollIntoView({ behavior: "smooth", block: "start" });
        document.querySelector('input[name="skills"]').focus();
    });
    message.querySelectorAll("[data-path-roadmap]").forEach((button) => {
        button.addEventListener("click", function () { showRoadmap(this.dataset.pathRoadmap); });
    });
    message.scrollIntoView({ behavior: "smooth", block: "start" });
    message.focus();
}

// BUG FIX: Replace inline onclick with data attributes and addEventListener
document.querySelectorAll("[data-earning-path]").forEach((button) => {
    button.addEventListener("click", function () {
        showMessage(this.dataset.earningPath);
    });
});

/* ── Project & Portfolio Builders ── */

function setProjectTypes() {
    const skill = document.getElementById("projectSkill");
    const type = document.getElementById("projectType");
    type.innerHTML = `<option value="${projectTemplates[skill.value].type}">${projectTemplates[skill.value].type}</option>`;
}

function initialiseBuilders() {
    const skillSelect = document.getElementById("projectSkill");
    skillSelect.innerHTML = Object.keys(projectTemplates).map((skill) => `<option value="${skill}">${skill}</option>`).join("");
    setProjectTypes();
    skillSelect.addEventListener("change", setProjectTypes);

    document.getElementById("projectBuilderForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const skill = skillSelect.value;
        const title = document.getElementById("projectTitle").value.trim();
        const project = projectTemplates[skill];
        const list = (items) => `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
        const output = document.getElementById("projectBuilderOutput");
        output.innerHTML = `<h3>${escapeHtml(title)}</h3><p><strong>Objective:</strong> ${project.objective}</p><h4>Requirements</h4>${list(project.requirements)}<h4>Steps</h4><ol>${project.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol><h4>Deliverables</h4>${list(project.deliverables)}<h4>Skills demonstrated</h4>${list(project.skills)}<h4>Portfolio description starter</h4><p>Created ${escapeHtml(title)}, a ${project.type.toLowerCase()} that demonstrates ${project.skills.join(", ")}. The project was developed as a practice brief and documents the approach and completed deliverables.</p>${renderRecommendedResources(projectResourceIds(skill, project.type), { skill, placement: "project_builder" }).replace("Recommended Tools &amp; Resources", "Recommended resources for this project")}<div class="builder-actions"><button type="button" data-project-roadmap="${skill}">View roadmap</button></div>`;
        output.hidden = false;
        output.querySelector("[data-project-roadmap]").addEventListener("click", () => showRoadmap(skill));
        trackProductEvent("project_builder_used", { skill });
    });

    document.getElementById("portfolioBuilderForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const value = (id) => document.getElementById(id).value.trim();
        const link = value("portfolioLink");
        const safeLink = /^https?:\/\/[^\s]+$/i.test(link) ? link : "";
        const output = document.getElementById("portfolioBuilderOutput");
        output.innerHTML = `<h3>${escapeHtml(value("portfolioTitle"))}</h3><p>${escapeHtml(value("portfolioDescription"))}</p><h4>Skills used</h4><p>${escapeHtml(value("portfolioSkills"))}</p><h4>Tools used</h4><p>${escapeHtml(value("portfolioTools"))}</p><h4>Outcome</h4><p>${escapeHtml(value("portfolioOutcome"))}</p>${safeLink ? `<p><a class="resource-button" href="${escapeHtml(safeLink)}" target="_blank" rel="noopener noreferrer">View project</a></p>` : ""}<p class="builder-note">Use this entry only for work you completed. It does not represent employment history or client work unless that is true.</p>${renderRecommendedResources(["googleDocs"], { placement: "portfolio_builder" }).replace("Recommended Tools &amp; Resources", "Helpful resources for presenting your work")}<div class="builder-actions"><button type="button" id="downloadPortfolioEntry">Download text</button></div>`;
        output.hidden = false;
        output.querySelector("#downloadPortfolioEntry").addEventListener("click", () => {
            const blob = new Blob([output.innerText], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url; anchor.download = "skillsprint-portfolio-entry.txt"; anchor.click(); URL.revokeObjectURL(url);
        });

        // Also save to server if logged in
        if (ApiClient.isLoggedIn()) {
            ApiClient.savePortfolio({
                title: value("portfolioTitle"),
                description: value("portfolioDescription"),
                skillsUsed: value("portfolioSkills"),
                toolsUsed: value("portfolioTools"),
                outcome: value("portfolioOutcome"),
                projectUrl: safeLink || null,
            }).catch(() => {});
        }

        trackProductEvent("portfolio_builder_used");
    });
}
initialiseBuilders();

/* ── Resource Click Tracking ── */

document.addEventListener("click", (event) => {
    const resourceLink = event.target.closest("[data-resource-id]");
    if (!resourceLink) return;
    trackProductEvent("resource_outbound_click", {
        resource_id: resourceLink.dataset.resourceId,
        resource_category: resourceLink.dataset.resourceCategory,
        skill_context: resourceLink.dataset.resourceContext,
        placement: resourceLink.dataset.resourcePlacement
    });
});

/* ── Navigation Toggle ── */

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

/* ── Path Progress Bar ── */

const pathInputs = document.querySelectorAll("#pathFinderForm input");

function updatePathProgress() {
    const completed = [
        document.querySelectorAll('input[name="skills"]:checked').length > 0,
        Boolean(document.querySelector('input[name="time"]:checked')),
        Boolean(document.querySelector('input[name="goal"]:checked'))
    ].filter(Boolean).length;
    document.getElementById("pathProgress").style.width = `${(completed / 3) * 100}%`;
    document.getElementById("progressCount").textContent = `${completed} of 3`;
}
pathInputs.forEach((input) => input.addEventListener("change", updatePathProgress));
pathInputs.forEach((input) => input.addEventListener("change", function () {
    const form = document.getElementById("pathFinderForm");
    if (!form.dataset.started) { form.dataset.started = "true"; trackProductEvent("path_finder_started"); }
}));

/* ── Scroll Reveal ── */

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

/* ── 3D Tilt & Magnetic Effects ── */

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (!reducedMotion && finePointer) {
    const heroVisual = document.querySelector(".hero-visual");
    let heroFrame = 0;
    let heroPointer;

    heroVisual.addEventListener("pointermove", function (event) {
        heroPointer = { x: event.clientX, y: event.clientY };
        if (heroFrame) return;
        heroFrame = requestAnimationFrame(function () {
            const bounds = heroVisual.getBoundingClientRect();
            const x = (heroPointer.x - bounds.left) / bounds.width - 0.5;
            const y = (heroPointer.y - bounds.top) / bounds.height - 0.5;
            heroVisual.style.transform = `rotateY(${x * 7}deg) rotateX(${y * -6}deg)`;
            heroFrame = 0;
        });
    }, { passive: true });
    heroVisual.addEventListener("pointerleave", function () {
        cancelAnimationFrame(heroFrame); heroFrame = 0; heroVisual.style.transform = "";
    }, { passive: true });

    document.querySelectorAll(".tilt-card").forEach((card) => {
        let frame = 0; let pointer;
        card.addEventListener("pointermove", function (event) {
            pointer = { x: event.clientX, y: event.clientY };
            if (frame) return;
            frame = requestAnimationFrame(function () {
                const bounds = card.getBoundingClientRect();
                const x = (pointer.x - bounds.left) / bounds.width - 0.5;
                const y = (pointer.y - bounds.top) / bounds.height - 0.5;
                card.style.transform = `perspective(800px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-5px)`;
                frame = 0;
            });
        }, { passive: true });
        card.addEventListener("pointerleave", function () {
            cancelAnimationFrame(frame); frame = 0; card.style.transform = "";
        }, { passive: true });
    });

    document.querySelectorAll(".magnetic").forEach((button) => {
        let frame = 0; let pointer;
        button.addEventListener("pointermove", function (event) {
            pointer = { x: event.clientX, y: event.clientY };
            if (frame) return;
            frame = requestAnimationFrame(function () {
                const bounds = button.getBoundingClientRect();
                const x = pointer.x - bounds.left - bounds.width / 2;
                const y = pointer.y - bounds.top - bounds.height / 2;
                button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
                frame = 0;
            });
        }, { passive: true });
        button.addEventListener("pointerleave", function () {
            cancelAnimationFrame(frame); frame = 0; button.style.transform = "";
        }, { passive: true });
    });
}

/* ── Initial Auth Check ── */

(async function initAuth() {
    await ApiClient.getMe();
    renderAuthUI();
    if (ApiClient.isLoggedIn()) {
        await syncPlanFromServer();
        renderMyPlan();
    }
})();
