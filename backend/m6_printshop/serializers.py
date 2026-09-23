from rest_framework import serializers

from .models import PriceListEntry, PrintJob


class DeliveryAddressSerializer(serializers.Serializer):
    hostel = serializers.CharField()
    room = serializers.CharField()


class PrintJobSerializer(serializers.ModelSerializer):
    delivery_address = DeliveryAddressSerializer()

    class Meta:
        model = PrintJob
        fields = [
            "id",
            "file_name",
            "pages",
            "copies",
            "color",
            "cost",
            "description",
            "delivery_address",
        ]
        read_only_fields = ["cost", "description"]

    def create(self, validated_data):
        pages = validated_data["pages"]
        copies = validated_data["copies"]
        color = validated_data["color"]
        validated_data["cost"] = pages * copies * (10 if color else 2)
        return super().create(validated_data)


class PriceListEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceListEntry
        fields = ["id", "category", "price_per_page"]
