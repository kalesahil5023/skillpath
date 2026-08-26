from rest_framework import generics, permissions
from .models import PortfolioEntry, ProjectPlan
from .serializers import PortfolioEntrySerializer, ProjectPlanSerializer

class PortfolioListCreateView(generics.ListCreateAPIView):
    serializer_class = PortfolioEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PortfolioEntry.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PortfolioDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PortfolioEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PortfolioEntry.objects.filter(user=self.request.user)


class ProjectPlanListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ProjectPlan.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProjectPlanDetailView(generics.DestroyAPIView):
    serializer_class = ProjectPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ProjectPlan.objects.filter(user=self.request.user)
