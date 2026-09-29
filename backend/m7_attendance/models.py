from django.db import models


class Subject(models.Model):
    subject = models.CharField(max_length=200)
    attended = models.PositiveIntegerField()
    total = models.PositiveIntegerField()
    description = models.TextField(blank=True, default="")

    def __str__(self):
        return self.subject


class LeaveRequest(models.Model):
    LEAVE_TYPE_CHOICES = [
        ("medical", "Medical"),
        ("family", "Family"),
        ("event", "College event"),
        ("other", "Other"),
    ]

    name = models.CharField(max_length=200)
    roll_number = models.CharField(max_length=50)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    leave_type = models.CharField(max_length=20, choices=LEAVE_TYPE_CHOICES)
    date = models.DateField()
    days = models.PositiveIntegerField()
    reason = models.CharField(max_length=300)
    informed_teacher = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.date}"
