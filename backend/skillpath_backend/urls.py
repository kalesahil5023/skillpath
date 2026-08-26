"""
URL configuration for skillpath_backend project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("accounts.urls")),
    path("api/plans/", include("plans.urls")),
    path("api/roadmaps/", include("roadmaps.urls")),
    path("api/portfolio/", include("portfolio.urls")),
]
