"""
=============================================================================
Portfolio & Practice Projects Database Models (PostgreSQL via Django ORM)
=============================================================================
Defines:
  1. PortfolioEntry: User case studies (title, problem/solution, tools, measurable outcomes).
  2. ProjectPlan: Practice briefs saved from the ProjectBuilder component.
"""

from django.db import models
from django.contrib.auth.models import User


class PortfolioEntry(models.Model):
    """
    Stores structured case studies demonstrating professional competence.
    Includes technical tools used, measurable results achieved, and live project link.
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="portfolio_entries",
        help_text="The creator and owner of this portfolio entry."
    )
    title = models.CharField(max_length=120, help_text="Case study title")
    description = models.TextField(help_text="Problem statement and technical solution")
    skills_used = models.CharField(max_length=200, help_text="Comma-separated skill tags (e.g. React, Django)")
    tools_used = models.CharField(max_length=200, help_text="Software or tools used (e.g. Figma, VS Code, Git)")
    outcome = models.TextField(help_text="Measurable business or learning result (e.g. 40% speedup)")
    project_url = models.URLField(blank=True, null=True, max_length=500, help_text="Live URL or GitHub repository")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} - {self.title}"


class ProjectPlan(models.Model):
    """
    Stores practice project briefs generated in the ProjectBuilder component.
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="saved_projects",
        help_text="User who saved this practice project brief."
    )
    skill = models.CharField(max_length=80, help_text="Skill category (e.g. Web Development)")
    project_type = models.CharField(max_length=100, help_text="Project archetype (e.g. Landing Page)")
    title = models.CharField(max_length=120, help_text="Generated project title")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} - {self.skill}: {self.title}"
