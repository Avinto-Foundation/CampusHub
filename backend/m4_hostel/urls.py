from django.urls import path

from .views import ComplaintDetailView, ComplaintListCreateView, NoticeListView

urlpatterns = [
    path("complaints/", ComplaintListCreateView.as_view(), name="hostel-complaints"),
    path(
        "complaints/<int:id>/",
        ComplaintDetailView.as_view(),
        name="hostel-complaint-detail",
    ),
    path("notices/", NoticeListView.as_view(), name="hostel-notices"),
]
