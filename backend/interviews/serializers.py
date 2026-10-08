from rest_framework import serializers
from .models import InterviewPractice


class InterviewPracticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewPractice
        fields = ["id", "question_key", "track", "practiced", "notes", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
