from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics

from .models import MenuItem, Order
from .serializers import MenuItemSerializer, OrderSerializer


@extend_schema(
    tags=["canteen"],
    description="List all items on the canteen menu.",
)
class MenuItemListView(generics.ListAPIView):
    queryset = MenuItem.objects.all().order_by("id")
    serializer_class = MenuItemSerializer


@extend_schema(
    tags=["canteen"],
    description="Get a single menu item by id.",
)
class MenuItemDetailView(generics.RetrieveAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    lookup_field = "id"


@extend_schema_view(
    get=extend_schema(tags=["canteen"], description="List the most recent canteen orders."),
    post=extend_schema(tags=["canteen"], description="Place a new canteen order."),
)
class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all().order_by("-id")
    serializer_class = OrderSerializer
