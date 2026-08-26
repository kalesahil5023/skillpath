from django.urls import path
from .views import (
    PortfolioListCreateView,
    PortfolioDetailView,
    ProjectPlanListCreateView,
    ProjectPlanDetailView,
)

urlpatterns = [
    path("", PortfolioListCreateView.as_view(), name="portfolio_list_create"),
    path("<int:pk>/", PortfolioDetailView.as_view(), name="portfolio_detail"),
    path("projects/", ProjectPlanListCreateView.as_view(), name="project_list_create"),
    path("projects/<int:pk>/", ProjectPlanDetailView.as_view(), name="project_detail"),
]
