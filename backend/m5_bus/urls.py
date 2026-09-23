from django.urls import path

from .views import (
    AnnouncementListView,
    ReminderCreateView,
    RouteDetailView,
    RouteListView,
)

urlpatterns = [
    path("routes/", RouteListView.as_view(), name="bus-routes"),
    path("routes/<int:id>/", RouteDetailView.as_view(), name="bus-route-detail"),
    path("announcements/", AnnouncementListView.as_view(), name="bus-announcements"),
    path("reminders/", ReminderCreateView.as_view(), name="bus-reminders"),
]
