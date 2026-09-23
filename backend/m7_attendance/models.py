from django.db import models


class Subject(models.Model):
    subject = models.CharField(max_length=200)
    attended = models.PositiveIntegerField()
    total = models.PositiveIntegerField()
    description = models.TextField(blank=True, default="")

    def __str__(self):
        return self.subject


class LeaveRequest(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateField()
    reason = models.CharField(max_length=300)

    def __str__(self):
        return f"{self.name} - {self.date}"
