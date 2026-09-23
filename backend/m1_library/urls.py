from django.urls import path

from .views import BookDetailView, BookListView, ReservationListCreateView

urlpatterns = [
    path("books/", BookListView.as_view(), name="library-books"),
    path("books/<int:id>/", BookDetailView.as_view(), name="library-book-detail"),
    path("reservations/", ReservationListCreateView.as_view(), name="library-reservations"),
]
