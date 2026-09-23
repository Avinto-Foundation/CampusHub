from rest_framework import serializers

from .models import Announcement, Event, Registration


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ["id", "title", "date", "capacity", "registered_count", "description"]


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = ["id", "message"]


class EmergencyContactSerializer(serializers.Serializer):
    name = serializers.CharField()
    phone = serializers.CharField()


class RegistrationSerializer(serializers.ModelSerializer):
    emergency_contact = EmergencyContactSerializer()

    class Meta:
        model = Registration
        fields = [
            "id",
            "name",
            "email",
            "roll_number",
            "tshirt_size",
            "emergency_contact",
        ]
