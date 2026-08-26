import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, "") : "") + "/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const TOKEN_KEY = "skillpath_access_token";
const REFRESH_KEY = "skillpath_refresh_token";
const USER_KEY = "skillpath_user_cache";

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY),
  getUser: () => {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setTokens: (access, refresh, user) => {
    if (access) localStorage.setItem(TOKEN_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

// Request Interceptor: Attach Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Auto-refresh expired access tokens
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login/") &&
      !originalRequest.url.includes("/auth/token/refresh/")
    ) {
      originalRequest._retry = true;
      const refreshToken = tokenStorage.getRefreshToken();
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          const newAccess = res.data.access;
          tokenStorage.setTokens(newAccess, res.data.refresh || refreshToken);
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return apiClient(originalRequest);
        } catch {
          tokenStorage.clear();
        }
      }
    }
    return Promise.reject(error);
  }
);

// Auth API Endpoints
export const authApi = {
  register: (payload) => apiClient.post("/auth/register/", payload),
  login: (payload) => apiClient.post("/auth/login/", payload),
  getMe: () => apiClient.get("/auth/me/"),
};

// Plans API Endpoints
export const plansApi = {
  getPlan: () => apiClient.get("/plans/"),
  savePlan: (payload) => apiClient.post("/plans/", payload),
  toggleChecklist: (day, completed) => apiClient.patch(`/plans/checklist/${day}/`, { completed }),
  deletePlan: () => apiClient.delete("/plans/"),
};

// Roadmaps API Endpoints
export const roadmapsApi = {
  getProgress: () => apiClient.get("/roadmaps/progress/"),
  updateProgress: (skill, taskIndex, completed) =>
    apiClient.post("/roadmaps/progress/", { skill, taskIndex, completed }),
};

// Portfolio & Projects API Endpoints
export const portfolioApi = {
  getEntries: () => apiClient.get("/portfolio/"),
  createEntry: (payload) => apiClient.post("/portfolio/", payload),
  updateEntry: (id, payload) => apiClient.put(`/portfolio/${id}/`, payload),
  deleteEntry: (id) => apiClient.delete(`/portfolio/${id}/`),
  getProjects: () => apiClient.get("/portfolio/projects/"),
  createProject: (payload) => apiClient.post("/portfolio/projects/", payload),
  deleteProject: (id) => apiClient.delete(`/portfolio/projects/${id}/`),
};

export default apiClient;
