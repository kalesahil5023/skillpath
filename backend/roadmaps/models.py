"""
=============================================================================
Roadmap Milestone Task Progress Database Model (PostgreSQL via Django ORM)
=============================================================================
Tracks individual user completion of discrete tasks within the 6 core skill roadmaps.
Enforces uniqueness: a user can only have one completion status per (skill, task_index).
"""

from django.db import models
from django.contrib.auth.models import User


class RoadmapTaskProgress(models.Model):
    """
    Records whether an authenticated user completed a specific milestone task
    within a skill roadmap (e.g. Web Development -> Task 0).
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="roadmap_tasks",
        help_text="The learner who completed or toggled this task."
    )
    skill = models.CharField(
        max_length=80,
        help_text="Skill discipline name (e.g. 'Web Development', 'Graphic Design')"
    )
    task_index = models.PositiveSmallIntegerField(
        help_text="Zero-based index of the task across the 5 stages of this roadmap"
    )
    completed = models.BooleanField(
        default=False,
        help_text="True if marked complete; False if pending"
    )
    completed_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Timestamp when task was marked complete"
    )

    class Meta:
        # Prevent duplicate entries for the same user, skill, and task
        unique_together = ("user", "skill", "task_index")

    def __str__(self):
        status = "Done" if self.completed else "Pending"
        return f"{self.user.username} - {self.skill} task {self.task_index}: {status}"
