from rest_framework import serializers

from .models import LeaveRequest, Subject


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ["id", "subject", "attended", "total", "description"]


class LeaveRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = [
            "id",
            "name",
            "roll_number",
            "email",
            "subject",
            "leave_type",
            "date",
            "days",
            "reason",
            "informed_teacher",
        ]
