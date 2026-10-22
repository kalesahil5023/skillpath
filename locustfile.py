"""
=============================================================================
SkillSprint — High-Concurrency Locust Load Testing Suite
=============================================================================
Simulates realistic student and visitor interactions:
 1. Public browsing of React SPA landing page and assets
 2. Healthcheck probes (/api/health/ and /healthz)
 3. Public catalog reads (/api/interviews/questions/)
 4. Authenticated student journey:
    - User registration (/api/auth/register/)
    - User login & JWT issuance (/api/auth/login/)
    - Career plan creation & checklist retrieval (/api/plans/)
    - Roadmap progress updates (/api/roadmaps/progress/)
    - Portfolio case studies listing (/api/portfolio/)
=============================================================================
Usage:
  locust -f locustfile.py --host https://skillsprint.online
  (or test locally against http://localhost:80)

Web Dashboard:
  Open http://localhost:8089 in your browser.
=============================================================================
"""

import uuid
from locust import HttpUser, task, between, tag


class SkillSprintUser(HttpUser):
    """
    Simulates high-concurrency users interacting with the platform.
    Fast wait time (0.05s to 0.2s) enables reaching 500 - 2,000+ RPS.
    """
    wait_time = between(0.05, 0.2)
    shared_token = None

    def on_start(self):
        """
        Initializes user session with shared cached JWT token.
        Prevents DB write bottlenecks and CPU starvation from 1,000 simultaneous PBKDF2 hashes.
        """
        if SkillSprintUser.shared_token:
            self.access_token = SkillSprintUser.shared_token
            return

        self.access_token = None
        test_username = "locust_load_user"
        test_password = "TestPass123!#"
        test_email = "locust_load_user@test.com"

        try:
            login_res = self.client.post(
                "/api/auth/login/",
                json={"username": test_username, "password": test_password},
                name="[Auth] Login (Cached)",
                timeout=5,
            )
            if login_res.status_code == 200:
                SkillSprintUser.shared_token = login_res.json().get("access")
                self.access_token = SkillSprintUser.shared_token
                return

            reg_res = self.client.post(
                "/api/auth/register/",
                json={
                    "username": test_username,
                    "email": test_email,
                    "password": test_password,
                    "displayName": "Locust Benchmark User",
                },
                name="[Auth] Register (Initial)",
                timeout=5,
            )
            if reg_res.status_code == 201:
                SkillSprintUser.shared_token = reg_res.json().get("access")
                self.access_token = SkillSprintUser.shared_token
        except Exception:
            self.access_token = None

    def auth_headers(self):
        """Helper to attach JWT Authorization Bearer header if logged in."""
        if self.access_token:
            return {"Authorization": f"Bearer {self.access_token}"}
        return {}

    # ── Task 1: Browse Frontend (Weight: 5 — Most Frequent) ──────────────────
    @task(5)
    @tag("frontend")
    def browse_homepage(self):
        """Simulates visitors browsing the React SPA frontend (Cloudflare edge cached)."""
        self.client.get("/", name="[Frontend] Homepage SPA")

    # ── Task 2: Check System Health (Weight: 4) ──────────────────────────────
    @task(4)
    @tag("api", "health")
    def check_health(self):
        """Simulates monitoring/health probes hitting the backend."""
        self.client.get("/api/health/", name="[API] Health Check")

    # ── Task 3: Read Interview Prep Questions (Weight: 3) ────────────────────
    @task(3)
    @tag("api", "interviews")
    def fetch_interview_questions(self):
        """Simulates students exploring curated HR and Technical interview prompts."""
        self.client.get("/api/interviews/questions/", name="[API] Curated Interview Questions")

    # ── Task 4: View Active Career Plan (Weight: 2 — Authenticated) ───────────
    @task(2)
    @tag("api", "plans")
    def view_user_plan(self):
        """Simulates authenticated students checking their active 7-day checklist."""
        if not self.access_token:
            return
        self.client.get(
            "/api/plans/",
            headers=self.auth_headers(),
            name="[API] View Career Plan & Checklist",
        )

    # ── Task 5: Update Roadmap Milestone Progress (Weight: 2) ─────────────────
    @task(2)
    @tag("api", "roadmaps")
    def update_roadmap_progress(self):
        """Simulates checking off a milestone task on the skill roadmap."""
        if not self.access_token:
            return
        self.client.post(
            "/api/roadmaps/progress/",
            json={"skill": "Web Development", "taskIndex": 1, "completed": True},
            headers=self.auth_headers(),
            name="[API] Update Roadmap Task",
        )

    # ── Task 6: List Portfolio Case Studies (Weight: 1) ──────────────────────
    @task(1)
    @tag("api", "portfolio")
    def list_portfolio(self):
        """Simulates loading saved portfolio entries."""
        if not self.access_token:
            return
        self.client.get(
            "/api/portfolio/",
            headers=self.auth_headers(),
            name="[API] List Portfolio Entries",
        )


class HighThroughputBenchmarkUser(HttpUser):
    """
    Max-Throughput Stress Test User.
    Zero wait time designed to drive thousands of requests per second (500 - 3,000+ RPS)
    directly into backend API endpoints.
    """
    wait_time = between(0.001, 0.01)

    @task(5)
    def test_health(self):
        self.client.get("/api/health/", name="[Stress] API Health Check")

    @task(3)
    def test_interviews(self):
        self.client.get("/api/interviews/questions/", name="[Stress] Interview Questions")

    @task(2)
    def test_frontend(self):
        self.client.get("/", name="[Stress] Frontend Root")
