from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics

from .models import PriceListEntry, PrintJob
from .serializers import PriceListEntrySerializer, PrintJobSerializer


@extend_schema_view(
    get=extend_schema(tags=["print"], description="List all submitted print jobs."),
    post=extend_schema(
        tags=["print"],
        description="Submit a new print job. The cost is calculated by the server.",
    ),
)
class PrintJobListCreateView(generics.ListCreateAPIView):
    queryset = PrintJob.objects.all().order_by("-id")
    serializer_class = PrintJobSerializer


@extend_schema(
    tags=["print"],
    description="Get a single print job by id.",
)
class PrintJobDetailView(generics.RetrieveAPIView):
    queryset = PrintJob.objects.all()
    serializer_class = PrintJobSerializer
    lookup_field = "id"


@extend_schema(
    tags=["print"],
    description="List the price per page for each print category.",
)
class PriceListView(generics.ListAPIView):
    queryset = PriceListEntry.objects.all().order_by("id")
    serializer_class = PriceListEntrySerializer
