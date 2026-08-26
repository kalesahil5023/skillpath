from rest_framework import serializers
from .models import UserPlan, PlanChecklistItem

class PlanChecklistItemSerializer(serializers.ModelSerializer):
    day = serializers.IntegerField(source="day_number")

    class Meta:
        model = PlanChecklistItem
        fields = ["day", "task", "completed"]


class UserPlanSerializer(serializers.ModelSerializer):
    checklist = PlanChecklistItemSerializer(many=True, required=False)
    time = serializers.CharField(source="time_commitment")
    recommendedSkill = serializers.CharField(source="recommended_skill")
    roadmapName = serializers.CharField(source="roadmap_name")
    createdAt = serializers.DateTimeField(source="created_at", read_only=True)
    updatedAt = serializers.DateTimeField(source="updated_at", read_only=True)

    class Meta:
        model = UserPlan
        fields = [
            "id",
            "path",
            "recommendedSkill",
            "reason",
            "time",
            "goal",
            "roadmapName",
            "checklist",
            "createdAt",
            "updatedAt",
        ]

    def create(self, validated_data):
        checklist_data = validated_data.pop("checklist", [])
        user = self.context["request"].user

        # Delete existing plan if user already has one (re-run path finder)
        UserPlan.objects.filter(user=user).delete()

        plan = UserPlan.objects.create(user=user, **validated_data)
        for item in checklist_data:
            PlanChecklistItem.objects.create(
                plan=plan,
                day_number=item.get("day_number"),
                task=item.get("task"),
                completed=item.get("completed", False)
            )
        return plan
