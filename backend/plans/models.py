from django.db import models
from django.contrib.auth.models import User

class UserPlan(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="plan")
    path = models.CharField(max_length=50)  # e.g. "Freelancing", "Affiliate Marketing", "Online Jobs"
    recommended_skill = models.CharField(max_length=160)
    reason = models.TextField()
    time_commitment = models.CharField(max_length=50)
    goal = models.CharField(max_length=50)
    roadmap_name = models.CharField(max_length=80)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Plan ({self.path} - {self.roadmap_name})"


class PlanChecklistItem(models.Model):
    plan = models.ForeignKey(UserPlan, on_delete=models.CASCADE, related_name="checklist")
    day_number = models.PositiveSmallIntegerField()
    task = models.TextField()
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ["day_number"]
        unique_together = ("plan", "day_number")

    def __str__(self):
        return f"Day {self.day_number}: {'✓' if self.completed else '○'} ({self.plan_id})"
