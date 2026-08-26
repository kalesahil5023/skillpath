from django.urls import path
from .views import RoadmapProgressView

urlpatterns = [
    path("progress/", RoadmapProgressView.as_view(), name="roadmap_progress"),
]
