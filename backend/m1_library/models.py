from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    available = models.BooleanField(default=True)
    description = models.TextField(blank=True, default="")

    def __str__(self):
        return self.title


class Reservation(models.Model):
    LOAN_DAYS_CHOICES = [(7, "7 days"), (14, "14 days"), (21, "21 days")]
    PICKUP_LOCATION_CHOICES = [
        ("main", "Main Library"),
        ("engineering", "Engineering Library"),
        ("hostel", "Hostel Reading Room"),
    ]

    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="reservations")
    student_name = models.CharField(max_length=200)
    email = models.EmailField()
    roll_number = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    loan_days = models.PositiveIntegerField(choices=LOAN_DAYS_CHOICES)
    pickup_location = models.CharField(max_length=20, choices=PICKUP_LOCATION_CHOICES)
    due_date_reminder = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_name} - {self.book.title}"
