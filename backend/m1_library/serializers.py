from rest_framework import serializers

from .models import Book, Reservation


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id", "title", "author", "available", "description"]


class ReservationSerializer(serializers.ModelSerializer):
    book_id = serializers.PrimaryKeyRelatedField(
        source="book", queryset=Book.objects.all()
    )
    book_title = serializers.CharField(source="book.title", read_only=True)

    class Meta:
        model = Reservation
        fields = [
            "id",
            "book_id",
            "book_title",
            "student_name",
            "email",
            "roll_number",
            "phone",
            "loan_days",
            "pickup_location",
            "due_date_reminder",
        ]
