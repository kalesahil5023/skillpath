"""
=============================================================================
User Plans & Checklist API Views (Django REST Framework)
=============================================================================
Provides endpoints for:
 1. GET /api/plans/ — Retrieve authenticated user's active plan and checklist
 2. POST /api/plans/ — Save, generate, or overwrite active plan with 7 checklist days
 3. DELETE /api/plans/ — Reset / remove active plan
 4. PATCH /api/plans/checklist/<day>/ — Toggle completion status of an individual day
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import UserPlan, PlanChecklistItem
from .serializers import UserPlanSerializer


class PlanDetailView(APIView):
    """
    Handles plan operations for the authenticated user.
    Enforces user isolation: users can only read, write, or delete their own plan.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """Fetch current user's active plan with its nested 7-day checklist."""
        try:
            plan = UserPlan.objects.get(user=request.user)
            serializer = UserPlanSerializer(plan)
            return Response({"plan": serializer.data})
        except UserPlan.DoesNotExist:
            return Response({"plan": None})

    def post(self, request):
        """
        Create or replace the user's active plan.
        Accepts: { path, recommendedSkill, reason, time, goal, roadmapName, checklist: [...] }
        """
        serializer = UserPlanSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            plan = serializer.save()
            return Response(
                {"message": "Plan saved successfully.", "plan": UserPlanSerializer(plan).data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"error": "Invalid plan data.", "details": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request):
        """Reset and delete the user's active plan."""
        deleted_count, _ = UserPlan.objects.filter(user=request.user).delete()
        if deleted_count:
            return Response({"message": "Plan deleted successfully."})
        return Response({"error": "No plan found to delete."}, status=status.HTTP_404_NOT_FOUND)


class PlanChecklistToggleView(APIView):
    """
    Handles toggling individual days (1 to 7) in the user's active plan checklist.
    Endpoint: PATCH /api/plans/checklist/<int:day>/
    Accepts: { "completed": true | false }
    """
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, day):
        try:
            plan = UserPlan.objects.get(user=request.user)
            item = PlanChecklistItem.objects.get(plan=plan, day_number=day)
        except (UserPlan.DoesNotExist, PlanChecklistItem.DoesNotExist):
            return Response(
                {"error": f"Checklist item for Day {day} not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        completed = request.data.get("completed")
        if completed is None or not isinstance(completed, bool):
            return Response(
                {"error": "'completed' boolean is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        item.completed = completed
        item.save()
        return Response({"day": item.day_number, "completed": item.completed})
