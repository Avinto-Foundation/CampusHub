from django.urls import path

from .views import (
    AnnouncementListView,
    EventDetailView,
    EventListView,
    EventRegisterView,
)

urlpatterns = [
    path("", EventListView.as_view(), name="events-list"),
    path("announcements/", AnnouncementListView.as_view(), name="events-announcements"),
    path("<int:pk>/register/", EventRegisterView.as_view(), name="events-register"),
    path("<int:id>/", EventDetailView.as_view(), name="events-detail"),
]
