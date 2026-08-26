from rest_framework import serializers
from .models import PortfolioEntry, ProjectPlan

class PortfolioEntrySerializer(serializers.ModelSerializer):
    skillsUsed = serializers.CharField(source="skills_used", required=False, allow_blank=True)
    toolsUsed = serializers.CharField(source="tools_used", required=False, allow_blank=True)
    projectUrl = serializers.URLField(source="project_url", required=False, allow_null=True, allow_blank=True)
    createdAt = serializers.DateTimeField(source="created_at", read_only=True)
    updatedAt = serializers.DateTimeField(source="updated_at", read_only=True)

    class Meta:
        model = PortfolioEntry
        fields = [
            "id",
            "title",
            "description",
            "skillsUsed",
            "toolsUsed",
            "outcome",
            "projectUrl",
            "createdAt",
            "updatedAt"
        ]


class ProjectPlanSerializer(serializers.ModelSerializer):
    projectType = serializers.CharField(source="project_type")
    createdAt = serializers.DateTimeField(source="created_at", read_only=True)

    class Meta:
        model = ProjectPlan
        fields = ["id", "skill", "projectType", "title", "createdAt"]
