import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "skillpath_backend.settings")
django.setup()

from rest_framework.test import APIClient
from django.contrib.auth.models import User

client = APIClient()

print("--- Testing API Endpoints ---")

# 1. Test Registration
reg_data = {
    "username": "testuser",
    "email": "test@example.com",
    "password": "Password123!",
    "displayName": "Alex River"
}
response = client.post("/api/auth/register/", reg_data, format="json")
print(f"Register status: {response.status_code}")
assert response.status_code == 201, f"Failed: {response.data}"
access_token = response.data["access"]
print(f"User created: {response.data['user']['displayName']} (Token received)")

# 2. Test Login
login_data = {
    "username": "testuser",
    "password": "Password123!"
}
response = client.post("/api/auth/login/", login_data, format="json")
print(f"Login status: {response.status_code}")
assert response.status_code == 200
assert "access" in response.data

# 3. Test Authenticated Plan Creation
client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

plan_payload = {
    "path": "Freelancing",
    "recommendedSkill": "Web Development",
    "reason": "Your skills in technology and goal for side income align with freelancing.",
    "time": "1–2 hours",
    "goal": "Side income",
    "roadmapName": "Web Development",
    "checklist": [
        {"day": 1, "task": "Learn HTML foundations.", "completed": False},
        {"day": 2, "task": "Build responsive CSS page.", "completed": False},
        {"day": 3, "task": "Practice flexbox & grid.", "completed": False},
        {"day": 4, "task": "Add interactive form validation.", "completed": False},
        {"day": 5, "task": "Publish project on GitHub Pages.", "completed": False},
        {"day": 6, "task": "Write project case study.", "completed": False},
        {"day": 7, "task": "Prepare proposal template.", "completed": False},
    ]
}

response = client.post("/api/plans/", plan_payload, format="json")
print(f"Create plan status: {response.status_code}")
assert response.status_code == 201, f"Failed: {response.data}"

# 4. Test Get Plan
response = client.get("/api/plans/")
print(f"Get plan status: {response.status_code}")
assert response.status_code == 200
assert response.data["plan"]["recommendedSkill"] == "Web Development"
assert len(response.data["plan"]["checklist"]) == 7

# 5. Test Toggle Checklist
response = client.patch("/api/plans/checklist/1/", {"completed": True}, format="json")
print(f"Toggle checklist status: {response.status_code}")
assert response.status_code == 200
assert response.data["completed"] is True

# 6. Test Roadmap Progress
response = client.post("/api/roadmaps/progress/", {"skill": "Web Development", "taskIndex": 0, "completed": True}, format="json")
print(f"Roadmap progress status: {response.status_code}")
assert response.status_code == 200
assert response.data["completed"] is True

# 7. Test Portfolio
portfolio_payload = {
    "title": "Responsive Bakery Landing Page",
    "description": "Built a mobile-first accessible landing page for a fictional local bakery.",
    "skillsUsed": "HTML, CSS, Responsive Design",
    "toolsUsed": "VS Code, Chrome DevTools",
    "outcome": "Three-section responsive site with 100% Lighthouse score.",
    "projectUrl": "https://example.com/bakery"
}
response = client.post("/api/portfolio/", portfolio_payload, format="json")
print(f"Create portfolio status: {response.status_code}")
assert response.status_code == 201

response = client.get("/api/portfolio/")
print(f"List portfolio count: {len(response.data)}")
assert len(response.data) == 1

print("\n ALL BACKEND API TESTS PASSED SUCCESSFULLY! ")
