from django.db import models
from django.contrib.auth.models import User


class InterviewPractice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="interview_practices")
    question_key = models.CharField(max_length=255)
    track = models.CharField(max_length=50, default="hr")  # 'hr' or 'technical'
    practiced = models.BooleanField(default=True)
    notes = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "question_key")
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.user.username} - {self.track}:{self.question_key}"
