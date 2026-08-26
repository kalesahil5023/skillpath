from rest_framework import serializers
from .models import RoadmapTaskProgress

class RoadmapTaskProgressSerializer(serializers.ModelSerializer):
    taskIndex = serializers.IntegerField(source="task_index")
    completedAt = serializers.DateTimeField(source="completed_at", read_only=True)

    class Meta:
        model = RoadmapTaskProgress
        fields = ["skill", "taskIndex", "completed", "completedAt"]
