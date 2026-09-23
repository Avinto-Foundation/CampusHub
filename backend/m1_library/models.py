from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    available = models.BooleanField(default=True)
    description = models.TextField(blank=True, default="")

    def __str__(self):
        return self.title


class Reservation(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="reservations")
    student_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_name} - {self.book.title}"
