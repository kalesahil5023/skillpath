"""
=============================================================================
SkillSprint Backend API End-to-End Automated Test Suite
=============================================================================
Validates:
 1. User Registration (POST /api/auth/register/)
 2. User Authentication & JWT Issuance (POST /api/auth/login/)
 3. Personalized Career Plan Creation (POST /api/plans/)
 4. Active Plan Retrieval (GET /api/plans/)
 5. 7-Day Starter Checklist Progress Toggle (PATCH /api/plans/checklist/<day>/)
 6. Roadmap Milestone Task Progress (POST /api/roadmaps/progress/)
 7. Portfolio Case Study Management (POST & GET /api/portfolio/)
=============================================================================
"""

import os
import django

if not os.environ.get("DJANGO_SETTINGS_MODULE"):
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "skillpath_backend.settings")
    django.setup()

from rest_framework.test import APITestCase
from rest_framework import status


class SkillSprintAPITests(APITestCase):
    """
    Integration tests covering user onboarding, authentication, career plan persistence,
    roadmap progress tracking, and portfolio entries.
    """

    def setUp(self):
        """Set up test payloads before each test method runs."""
        self.user_credentials = {
            "username": "tester_alex",
            "email": "alex.river@example.com",
            "password": "SecurePassword123!",
            "displayName": "Alex River",
        }

    def test_complete_user_workflow(self):
        """
        Tests the entire end-to-end user journey:
        Register -> Login -> Create Plan -> Toggle Checklist -> Update Roadmap -> Add Portfolio
        """

        # ── 1. User Registration ─────────────────────────────────────────────
        register_response = self.client.post(
            "/api/auth/register/",
            self.user_credentials,
            format="json",
        )
        self.assertEqual(
            register_response.status_code,
            status.HTTP_201_CREATED,
            f"Registration failed: {register_response.data}",
        )
        self.assertIn("access", register_response.data)
        self.assertEqual(register_response.data["user"]["displayName"], "Alex River")

        # ── 2. User Login & Token Verification ───────────────────────────────
        login_response = self.client.post(
            "/api/auth/login/",
            {
                "username": self.user_credentials["username"],
                "password": self.user_credentials["password"],
            },
            format="json",
        )
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertIn("access", login_response.data)
        access_token = login_response.data["access"]

        # Authenticate all subsequent requests with Bearer JWT
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        # ── 3. Create Career Plan & 7-Day Checklist ──────────────────────────
        plan_payload = {
            "path": "Freelancing",
            "recommendedSkill": "Web Development",
            "reason": "Technical aptitude and goal for remote client contracts.",
            "time": "1–2 hours",
            "goal": "Side income",
            "roadmapName": "Web Development",
            "checklist": [
                {"day": 1, "task": "Learn semantic HTML5.", "completed": False},
                {"day": 2, "task": "Build responsive CSS layout.", "completed": False},
                {"day": 3, "task": "Master flexbox & modern grid.", "completed": False},
                {"day": 4, "task": "Add form validation with JS.", "completed": False},
                {"day": 5, "task": "Deploy project to public host.", "completed": False},
                {"day": 6, "task": "Write structured case study.", "completed": False},
                {"day": 7, "task": "Draft client proposal template.", "completed": False},
            ],
        }

        create_plan_res = self.client.post("/api/plans/", plan_payload, format="json")
        self.assertEqual(create_plan_res.status_code, status.HTTP_201_CREATED)

        # ── 4. Retrieve Active Plan ──────────────────────────────────────────
        get_plan_res = self.client.get("/api/plans/")
        self.assertEqual(get_plan_res.status_code, status.HTTP_200_OK)
        self.assertEqual(get_plan_res.data["plan"]["recommendedSkill"], "Web Development")
        self.assertEqual(len(get_plan_res.data["plan"]["checklist"]), 7)

        # ── 5. Toggle Checklist Day 1 Item ───────────────────────────────────
        toggle_res = self.client.patch(
            "/api/plans/checklist/1/",
            {"completed": True},
            format="json",
        )
        self.assertEqual(toggle_res.status_code, status.HTTP_200_OK)
        self.assertTrue(toggle_res.data["completed"])

        # ── 6. Update Skill Roadmap Milestone Progress ───────────────────────
        roadmap_res = self.client.post(
            "/api/roadmaps/progress/",
            {"skill": "Web Development", "taskIndex": 0, "completed": True},
            format="json",
        )
        self.assertEqual(roadmap_res.status_code, status.HTTP_200_OK)
        self.assertTrue(roadmap_res.data["completed"])

        # ── 7. Portfolio Case Study Management ───────────────────────────────
        portfolio_payload = {
            "title": "Responsive Artisan Bakery Showcase",
            "description": "Mobile-first accessible storefront with 100% Lighthouse audit.",
            "skillsUsed": "HTML5, CSS3, JavaScript, Responsive Design",
            "toolsUsed": "VS Code, Chrome DevTools, GitHub Pages",
            "outcome": "Completed prototype and delivered within 48 hours.",
            "projectUrl": "https://example.com/artisan-bakery",
        }
        create_portfolio_res = self.client.post(
            "/api/portfolio/",
            portfolio_payload,
            format="json",
        )
        self.assertEqual(create_portfolio_res.status_code, status.HTTP_201_CREATED)

        list_portfolio_res = self.client.get("/api/portfolio/")
        self.assertEqual(list_portfolio_res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(list_portfolio_res.data), 1)
        self.assertEqual(list_portfolio_res.data[0]["title"], portfolio_payload["title"])


if __name__ == "__main__":
    # Allows running directly via `python test_api.py`
    import django
    from django.test.runner import DiscoverRunner

    django.setup()
    runner = DiscoverRunner(verbosity=2)
    failures = runner.run_tests(["test_api"])
    exit(failures)
