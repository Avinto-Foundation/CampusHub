from django.urls import path

from .views import MenuItemDetailView, MenuItemListView, OrderListCreateView

urlpatterns = [
    path("menu/", MenuItemListView.as_view(), name="canteen-menu"),
    path("menu/<int:id>/", MenuItemDetailView.as_view(), name="canteen-menu-detail"),
    path("orders/", OrderListCreateView.as_view(), name="canteen-orders"),
]
