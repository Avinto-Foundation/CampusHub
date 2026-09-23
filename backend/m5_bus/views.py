from drf_spectacular.utils import extend_schema
from rest_framework import generics

from .models import Announcement, Reminder, Route
from .serializers import AnnouncementSerializer, ReminderSerializer, RouteSerializer


@extend_schema(
    tags=["bus"],
    description="List all campus bus routes with their departure times.",
)
class RouteListView(generics.ListAPIView):
    queryset = Route.objects.all().order_by("id")
    serializer_class = RouteSerializer


@extend_schema(
    tags=["bus"],
    description="Get a single bus route by id.",
)
class RouteDetailView(generics.RetrieveAPIView):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    lookup_field = "id"


@extend_schema(
    tags=["bus"],
    description="List the latest bus announcements.",
)
class AnnouncementListView(generics.ListAPIView):
    queryset = Announcement.objects.all().order_by("id")
    serializer_class = AnnouncementSerializer


@extend_schema(
    tags=["bus"],
    description="Ask to be reminded by email before a bus route's next departure.",
)
class ReminderCreateView(generics.CreateAPIView):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer
