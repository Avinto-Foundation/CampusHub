from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import generics

from .models import Announcement, Event, Registration
from .serializers import AnnouncementSerializer, EventSerializer, RegistrationSerializer


@extend_schema(
    tags=["events"],
    description="List all campus events, including how many seats are already registered.",
)
class EventListView(generics.ListAPIView):
    queryset = Event.objects.all().order_by("date")
    serializer_class = EventSerializer


@extend_schema(
    tags=["events"],
    description="Get a single event by id.",
)
class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = "id"


@extend_schema(
    tags=["events"],
    description="List the latest announcements about upcoming events.",
)
class AnnouncementListView(generics.ListAPIView):
    queryset = Announcement.objects.all().order_by("id")
    serializer_class = AnnouncementSerializer


@extend_schema(
    tags=["events"],
    description="Register a student for a specific event.",
)
class EventRegisterView(generics.CreateAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

    def perform_create(self, serializer):
        event = get_object_or_404(Event, pk=self.kwargs["pk"])
        serializer.save(event=event)
        event.registered_count += 1
        event.save()
