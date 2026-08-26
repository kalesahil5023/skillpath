from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import RoadmapTaskProgress

class RoadmapProgressView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        progress_records = RoadmapTaskProgress.objects.filter(user=request.user)
        # Group completed task indices by skill: { "Web Development": [0, 1], ... }
        skills_progress = {}
        for item in progress_records:
            if item.skill not in skills_progress:
                skills_progress[item.skill] = {}
            skills_progress[item.skill][item.task_index] = item.completed

        return Response({"progress": skills_progress})

    def post(self, request):
        skill = request.data.get("skill")
        task_index = request.data.get("taskIndex")
        completed = request.data.get("completed", True)

        if not skill or task_index is None:
            return Response({"error": "Skill and taskIndex are required."}, status=status.HTTP_400_BAD_REQUEST)

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
