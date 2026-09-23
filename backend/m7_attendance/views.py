from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics

from .models import LeaveRequest, Subject
from .serializers import LeaveRequestSerializer, SubjectSerializer


@extend_schema(
    tags=["attendance"],
    description="List all subjects with attended and total class counts.",
)
class SubjectListView(generics.ListAPIView):
    queryset = Subject.objects.all().order_by("id")
    serializer_class = SubjectSerializer


@extend_schema(
    tags=["attendance"],
    description="Get a single subject by id.",
)
class SubjectDetailView(generics.RetrieveAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    lookup_field = "id"


@extend_schema_view(
    get=extend_schema(
        tags=["attendance"], description="List all leave requests."
    ),
    post=extend_schema(
        tags=["attendance"], description="Submit a new leave request."
    ),
)
class LeaveRequestListCreateView(generics.ListCreateAPIView):
    queryset = LeaveRequest.objects.all().order_by("-id")
    serializer_class = LeaveRequestSerializer
