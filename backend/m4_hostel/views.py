from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics

from .models import Complaint, Notice
from .serializers import ComplaintSerializer, NoticeSerializer


@extend_schema_view(
    get=extend_schema(tags=["hostel"], description="List all hostel complaints."),
    post=extend_schema(tags=["hostel"], description="File a new hostel complaint."),
)
class ComplaintListCreateView(generics.ListCreateAPIView):
    queryset = Complaint.objects.all().order_by("-id")
    serializer_class = ComplaintSerializer


@extend_schema(
    tags=["hostel"],
    description="Get a single complaint by id.",
)
class ComplaintDetailView(generics.RetrieveAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    lookup_field = "id"


@extend_schema(
    tags=["hostel"],
    description="List the latest notices posted by the hostel administration.",
)
class NoticeListView(generics.ListAPIView):
    queryset = Notice.objects.all().order_by("id")
    serializer_class = NoticeSerializer
