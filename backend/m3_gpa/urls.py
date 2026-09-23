from django.urls import path

from .views import CourseDetailView, CourseListView, GPARecordListCreateView

urlpatterns = [
    path("courses/", CourseListView.as_view(), name="gpa-courses"),
    path("courses/<int:id>/", CourseDetailView.as_view(), name="gpa-course-detail"),
    path("records/", GPARecordListCreateView.as_view(), name="gpa-records"),
]
