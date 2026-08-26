/**
 * SkillSprint API Client
 * Handles all communication with the server API.
 * Falls back to localStorage when the user is not authenticated.
 */

const ApiClient = (function () {
    const BASE = "/api";
    let _currentUser = null;

    async function request(method, path, body = null) {
        const options = {
            method,
            credentials: "same-origin",
            headers: {},
        };

        if (body !== null) {
            options.headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(body);
        }

        let res = await fetch(`${BASE}${path}`, options);

        // If token expired, try refreshing
        if (res.status === 401) {
            const data = await res.json().catch(() => ({}));
            if (data.code === "TOKEN_EXPIRED") {
                const refreshed = await refreshToken();
                if (refreshed) {
                    res = await fetch(`${BASE}${path}`, options);
                } else {
                    _currentUser = null;
                    return { ok: false, status: 401, data: { error: "Session expired. Please log in again." } };
                }
            } else {
                _currentUser = null;
                return { ok: false, status: 401, data };
            }
        }

        const responseData = await res.json().catch(() => ({}));
        return { ok: res.ok, status: res.status, data: responseData };
    }

    async function refreshToken() {
        try {
            const res = await fetch(`${BASE}/auth/refresh`, {
                method: "POST",
                credentials: "same-origin",
            });
            if (res.ok) {
                const data = await res.json();
                _currentUser = data.user;
                return true;
            }
            return false;
        } catch {
            return false;
        }
    }

    // ── Auth ──

    async function register(email, password, displayName) {
        const result = await request("POST", "/auth/register", { email, password, displayName });
        if (result.ok) _currentUser = result.data.user;
        return result;
    }

    async function login(email, password) {
        const result = await request("POST", "/auth/login", { email, password });
        if (result.ok) _currentUser = result.data.user;
        return result;
    }

    async function logout() {
        const result = await request("POST", "/auth/logout");
        _currentUser = null;
        return result;
    }

    async function getMe() {
        const result = await request("GET", "/auth/me");
        if (result.ok) {
            _currentUser = result.data.user;
        } else {
            _currentUser = null;
        }
        return result;
    }

    function getCurrentUser() {
        return _currentUser;
    }

    function isLoggedIn() {
        return _currentUser !== null;
    }

    // ── Plans ──

    async function getPlan() {
        return request("GET", "/plans");
    }

    async function savePlan(plan) {
        return request("POST", "/plans", plan);
    }

    async function toggleChecklistDay(day, completed) {
        return request("PATCH", `/plans/checklist/${day}`, { completed });
    }

    async function deletePlan() {
        return request("DELETE", "/plans");
    }

    // ── Roadmap Progress ──

    async function getProgress(skill) {
        return request("GET", `/progress/${encodeURIComponent(skill)}`);
    }

    async function getAllProgress() {
        return request("GET", "/progress");
    }

    async function setTaskCompletion(skill, taskIndex, completed) {
        return request("PUT", `/progress/${encodeURIComponent(skill)}/${taskIndex}`, { completed });
    }

    // ── Portfolio ──

    async function getPortfolios() {
        return request("GET", "/portfolio");
    }

    async function savePortfolio(entry) {
        return request("POST", "/portfolio", entry);
    }

    async function updatePortfolio(id, entry) {
        return request("PUT", `/portfolio/${id}`, entry);
    }

    async function deletePortfolio(id) {
        return request("DELETE", `/portfolio/${id}`);
    }

    // ── Projects ──

    async function getProjects() {
        return request("GET", "/projects");
    }

    async function saveProject(project) {
        return request("POST", "/projects", project);
    }

    async function deleteProject(id) {
        return request("DELETE", `/projects/${id}`);
    }

    return {
        register,
        login,
        logout,
        getMe,
        getCurrentUser,
        isLoggedIn,
        getPlan,
        savePlan,
        toggleChecklistDay,
        deletePlan,
        getProgress,
        getAllProgress,
        setTaskCompletion,
        getPortfolios,
        savePortfolio,
        updatePortfolio,
        deletePortfolio,
        getProjects,
        saveProject,
        deleteProject,
    };
})();
