from django.db import models
from django.contrib.auth.models import User

class RoadmapTaskProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="roadmap_tasks")
    skill = models.CharField(max_length=80)
    task_index = models.PositiveSmallIntegerField()
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ("user", "skill", "task_index")

    def __str__(self):
        return f"{self.user.username} - {self.skill} task {self.task_index}: {'Done' if self.completed else 'Pending'}"
