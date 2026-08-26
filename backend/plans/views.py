from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import UserPlan, PlanChecklistItem
from .serializers import UserPlanSerializer

class PlanDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            plan = UserPlan.objects.get(user=request.user)
            serializer = UserPlanSerializer(plan)
            return Response({"plan": serializer.data})
        except UserPlan.DoesNotExist:
            return Response({"plan": None})

    def post(self, request):
        serializer = UserPlanSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            plan = serializer.save()
            return Response(
                {"message": "Plan saved successfully.", "plan": UserPlanSerializer(plan).data},
                status=status.HTTP_201_CREATED
            )
        return Response({"error": "Invalid plan data.", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        deleted_count, _ = UserPlan.objects.filter(user=request.user).delete()
        if deleted_count:
            return Response({"message": "Plan deleted successfully."})
        return Response({"error": "No plan found to delete."}, status=status.HTTP_404_NOT_FOUND)


class PlanChecklistToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, day):
        try:
            plan = UserPlan.objects.get(user=request.user)
            item = PlanChecklistItem.objects.get(plan=plan, day_number=day)
        except (UserPlan.DoesNotExist, PlanChecklistItem.DoesNotExist):
            return Response({"error": f"Checklist item for Day {day} not found."}, status=status.HTTP_404_NOT_FOUND)

        completed = request.data.get("completed")
        if completed is None or not isinstance(completed, bool):
            return Response({"error": "'completed' boolean is required."}, status=status.HTTP_400_BAD_REQUEST)

        item.completed = completed
        item.save()
        return Response({"day": item.day_number, "completed": item.completed})
