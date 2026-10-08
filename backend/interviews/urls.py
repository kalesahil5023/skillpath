from django.urls import path
from .views import InterviewQuestionsView, InterviewPracticeView

urlpatterns = [
    path("questions/", InterviewQuestionsView.as_view(), name="interview_questions"),
    path("practice/", InterviewPracticeView.as_view(), name="interview_practice"),
]
