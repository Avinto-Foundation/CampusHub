from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics

from .models import Course, GPARecord
from .serializers import CourseSerializer, GPARecordSerializer


@extend_schema(
    tags=["gpa"],
    description="List all courses that can be included in the GPA calculation.",
)
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all().order_by("id")
    serializer_class = CourseSerializer


@extend_schema(
    tags=["gpa"],
    description="Get a single course by id.",
)
class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = "id"


@extend_schema_view(
    get=extend_schema(tags=["gpa"], description="List previously saved GPA records."),
    post=extend_schema(tags=["gpa"], description="Save a student's calculated GPA."),
)
class GPARecordListCreateView(generics.ListCreateAPIView):
    queryset = GPARecord.objects.all().order_by("-id")
    serializer_class = GPARecordSerializer
