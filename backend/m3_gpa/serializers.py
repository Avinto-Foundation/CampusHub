from rest_framework import serializers

from .models import Course, GPARecord


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "code", "name", "credits", "description"]


class GPARecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = GPARecord
        fields = ["id", "student_name", "gpa"]
