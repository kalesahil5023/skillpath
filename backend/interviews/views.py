from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import InterviewPractice
from .serializers import InterviewPracticeSerializer

SAMPLE_QUESTIONS = {
    "hr": [
        {"id": "hr-1", "q": "Tell me about yourself.", "tip": "Use the STAR method. Focus on your journey, key achievements, and why this role excites you.", "category": "Introduction"},
        {"id": "hr-2", "q": "What is your greatest strength?", "tip": "Pick a strength relevant to the role. Back it with a specific example.", "category": "Behavioral"},
        {"id": "hr-3", "q": "Describe a time you faced a major challenge at work.", "tip": "Structure: Situation → Task → Action → Result. Quantify results wherever possible.", "category": "STAR Method"},
        {"id": "hr-4", "q": "Where do you see yourself in 5 years?", "tip": "Show ambition aligned with the company's growth. Mention skill development.", "category": "Career Goals"},
        {"id": "hr-5", "q": "Why do you want to leave your current job?", "tip": "Stay positive. Focus on growth opportunities, not complaints about current role.", "category": "Behavioral"},
        {"id": "hr-6", "q": "How do you handle tight deadlines?", "tip": "Discuss prioritization, communication with stakeholders, and a real example.", "category": "STAR Method"},
    ],
    "technical": [
        {"id": "tech-1", "q": "Reverse a linked list in O(n) time and O(1) space.", "tip": "Use three pointers: prev, curr, next. Iterate and reverse links one by one.", "category": "DSA", "difficulty": "Medium"},
        {"id": "tech-2", "q": "Design a URL shortener like bit.ly.", "tip": "Cover: hashing/encoding, DB schema (URL ↔ hash), redirect API, load balancing, caching.", "category": "System Design", "difficulty": "Hard"},
        {"id": "tech-3", "q": "What is the difference between useEffect and useLayoutEffect in React?", "tip": "useEffect runs after paint. useLayoutEffect runs synchronously after DOM mutations.", "category": "Frontend", "difficulty": "Medium"},
        {"id": "tech-4", "q": "Explain the CAP theorem.", "tip": "Consistency, Availability, Partition Tolerance — distributed system can guarantee only 2 of 3.", "category": "System Design", "difficulty": "Hard"},
        {"id": "tech-5", "q": "Find all subsets of a given set.", "tip": "Use backtracking or bit manipulation. Time complexity O(2^n).", "category": "DSA", "difficulty": "Medium"},
        {"id": "tech-6", "q": "How does React reconciliation work?", "tip": "React uses virtual DOM diffing (Fiber architecture). Compares trees and batches updates.", "category": "Frontend", "difficulty": "Easy"},
    ],
}


class InterviewQuestionsView(APIView):
    """Returns curated interview questions for HR and Technical tracks."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response(SAMPLE_QUESTIONS)


class InterviewPracticeView(APIView):
    """
    Handles fetching and updating user practice completion for interview questions.
    Requires Bearer JWT.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        practices = InterviewPractice.objects.filter(user=request.user)
        serializer = InterviewPracticeSerializer(practices, many=True)
        return Response({"practices": serializer.data})

    def post(self, request):
        question_key = request.data.get("question_key")
        track = request.data.get("track", "hr")
        practiced = request.data.get("practiced", True)
        notes = request.data.get("notes", "")

        if not question_key:
            return Response({"error": "question_key is required."}, status=status.HTTP_400_BAD_REQUEST)

        obj, _ = InterviewPractice.objects.update_or_create(
            user=request.user,
            question_key=question_key,
            defaults={"track": track, "practiced": practiced, "notes": notes}
        )
        serializer = InterviewPracticeSerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)
