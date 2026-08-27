"""
=============================================================================
User Plans & Checklist Database Models (PostgreSQL via Django ORM)
=============================================================================
Defines:
  1. UserPlan: Stores personalized Path Finder recommendations (one-to-one with User).
  2. PlanChecklistItem: Stores the 7 daily starter checklist tasks for each plan.
"""

from django.db import models
from django.contrib.auth.models import User


class UserPlan(models.Model):
    """
    Represents an authenticated user's active personalized learning/earning trajectory.
    Enforces a One-to-One relationship: each user has one active customized plan.
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="plan",
        help_text="The user who owns this personalized roadmap plan."
    )
    # Earning path selected by the recommendation algorithm (e.g. "Freelancing")
    path = models.CharField(max_length=50)
    
    # Starting skill recommended based on user interests (e.g. "Web Development")
    recommended_skill = models.CharField(max_length=160)
    
    # Tailored rationale generated from quiz answers
    reason = models.TextField()
    
    # User's daily time investment (e.g. "1–2 hours")
    time_commitment = models.CharField(max_length=50)
    
    # Target career goal (e.g. "Side income")
    goal = models.CharField(max_length=50)
    
    # Associated 30-day skill roadmap name (e.g. "Web Development")
    roadmap_name = models.CharField(max_length=80)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Plan ({self.path} - {self.roadmap_name})"


class PlanChecklistItem(models.Model):
    """
    Represents a single day (1 through 7) task within a UserPlan.
    Maintains ordering by day_number and ensures uniqueness per plan.
    """
    plan = models.ForeignKey(
        UserPlan,
        on_delete=models.CASCADE,
        related_name="checklist",
        help_text="The parent UserPlan this checklist task belongs to."
    )
    day_number = models.PositiveSmallIntegerField(help_text="Day index (1 to 7)")
    task = models.TextField(help_text="Actionable starter instructions for this day")
    completed = models.BooleanField(default=False, help_text="Whether the user marked this day complete")

    class Meta:
        ordering = ["day_number"]
        unique_together = ("plan", "day_number")

    def __str__(self):
        return f"Day {self.day_number}: {'✓' if self.completed else '○'} ({self.plan_id})"
