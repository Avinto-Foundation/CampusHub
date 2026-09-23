from rest_framework import serializers

from .models import MenuItem, Order


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ["id", "name", "price", "category", "description"]


class DeliveryAddressSerializer(serializers.Serializer):
    hostel = serializers.CharField()
    room = serializers.CharField()


class OrderItemSerializer(serializers.Serializer):
    menu_item_id = serializers.IntegerField()
    qty = serializers.IntegerField()


class OrderSerializer(serializers.ModelSerializer):
    delivery_address = DeliveryAddressSerializer()
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "name",
            "phone",
            "pickup_time",
            "notes",
            "delivery_address",
            "items",
        ]
