from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics

from .models import Book, Reservation
from .serializers import BookSerializer, ReservationSerializer


@extend_schema(
    tags=["library"],
    description="List every book in the library catalogue, including whether it is available.",
)
class BookListView(generics.ListAPIView):
    queryset = Book.objects.all().order_by("id")
    serializer_class = BookSerializer


@extend_schema(
    tags=["library"],
    description="Get a single book by id.",
)
class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = "id"


@extend_schema_view(
    get=extend_schema(
        tags=["library"],
        description="List the most recent book reservations.",
    ),
    post=extend_schema(
        tags=["library"],
        description="Reserve a book for a student.",
    ),
)
class ReservationListCreateView(generics.ListCreateAPIView):
    queryset = Reservation.objects.all().order_by("-id")
    serializer_class = ReservationSerializer
