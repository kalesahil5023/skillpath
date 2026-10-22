"""
URL configuration for skillpath_backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse, JsonResponse

def loaderio_view(request):
    return HttpResponse("loaderio-a37a474237226bab687033f87649c45e", content_type="text/plain")

def health_check(request):
    return JsonResponse({"status": "healthy", "service": "skillpath-backend"})

urlpatterns = [
    path("", include("django_prometheus.urls")),
    path("healthz", health_check),
    path("api/health/", health_check),
    path("admin/", admin.site.urls),
    path("api/auth/", include("accounts.urls")),
    path("api/plans/", include("plans.urls")),
    path("api/roadmaps/", include("roadmaps.urls")),
    path("api/portfolio/", include("portfolio.urls")),
    path("api/interviews/", include("interviews.urls")),
    path("loaderio-a37a474237226bab687033f87649c45e.txt", loaderio_view),
    path("loaderio-a37a474237226bab687033f87649c45e/", loaderio_view),
    path("loaderio-a37a474237226bab687033f87649c45e", loaderio_view),
]
