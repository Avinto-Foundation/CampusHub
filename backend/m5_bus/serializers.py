from rest_framework import serializers

from .models import Announcement, Reminder, Route


class RouteSerializer(serializers.ModelSerializer):
    departures = serializers.ListField(child=serializers.CharField())

    class Meta:
        model = Route
        fields = ["id", "route_name", "departures", "description"]


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = ["id", "message"]


class ReminderSerializer(serializers.ModelSerializer):
    route_id = serializers.PrimaryKeyRelatedField(
        source="route", queryset=Route.objects.all()
    )

    class Meta:
        model = Reminder
        fields = [
            "id",
            "route_id",
            "departure",
            "student_name",
            "student_email",
            "phone",
            "minutes_before",
            "channel",
            "repeat_weekdays",
        ]
