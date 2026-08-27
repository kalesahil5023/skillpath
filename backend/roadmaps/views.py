"""
=============================================================================
Roadmap Progress API Views (Django REST Framework)
=============================================================================
Provides endpoints for:
 1. GET /api/roadmaps/progress/ — Retrieve user's completed task indices grouped by skill
 2. POST /api/roadmaps/progress/ — Update/toggle task completion state for a skill discipline
"""

from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import RoadmapTaskProgress


class RoadmapProgressView(APIView):
    """
    Handles fetching and updating roadmap milestone task completions.
    Requires authentication via SimpleJWT Bearer token.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Returns a dictionary grouping task completion booleans by skill:
        {
          "progress": {
            "Web Development": { "0": true, "1": false },
            "Graphic Design": { "0": true }
          }
        }
        """
        progress_records = RoadmapTaskProgress.objects.filter(user=request.user)
        skills_progress = {}
        for item in progress_records:
            if item.skill not in skills_progress:
                skills_progress[item.skill] = {}
            skills_progress[item.skill][item.task_index] = item.completed

        return Response({"progress": skills_progress})

    def post(self, request):
        """
        Creates or updates task status.
        Accepts: { "skill": "Web Development", "taskIndex": 0, "completed": true }
        Returns: { "skill": "Web Development", "taskIndex": 0, "completed": true }
        """
        skill = request.data.get("skill")
        task_index = request.data.get("taskIndex")
        completed = request.data.get("completed", True)

        if not skill or task_index is None:
            return Response(
                {"error": "Skill and taskIndex are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Atomic create or update based on (user, skill, task_index)
        obj, created = RoadmapTaskProgress.objects.update_or_create(
            user=request.user,
            skill=skill,
            task_index=int(task_index),
            defaults={
                "completed": completed,
                "completed_at": timezone.now() if completed else None
            }
        )

        return Response({
            "skill": obj.skill,
            "taskIndex": obj.task_index,
            "completed": obj.completed
        })
