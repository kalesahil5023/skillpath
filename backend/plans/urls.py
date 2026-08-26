from django.urls import path
from .views import PlanDetailView, PlanChecklistToggleView

urlpatterns = [
    path("", PlanDetailView.as_view(), name="plan_detail"),
    path("checklist/<int:day>/", PlanChecklistToggleView.as_view(), name="plan_checklist_toggle"),
]
