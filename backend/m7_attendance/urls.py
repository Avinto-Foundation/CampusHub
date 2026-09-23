from django.urls import path

from .views import LeaveRequestListCreateView, SubjectDetailView, SubjectListView

urlpatterns = [
    path("subjects/", SubjectListView.as_view(), name="attendance-subjects"),
    path(
        "subjects/<int:id>/",
        SubjectDetailView.as_view(),
        name="attendance-subject-detail",
    ),
    path(
        "leave-requests/",
        LeaveRequestListCreateView.as_view(),
        name="attendance-leave-requests",
    ),
]
