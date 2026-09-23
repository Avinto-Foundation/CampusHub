from rest_framework import serializers

from .models import Complaint, Notice


class LocationSerializer(serializers.Serializer):
    block = serializers.CharField()
    room = serializers.CharField()


class ComplaintSerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = Complaint
        fields = ["id", "name", "category", "description", "status", "location"]
        read_only_fields = ["status"]


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = ["id", "message"]
