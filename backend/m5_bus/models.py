from django.db import models


class Route(models.Model):
    route_name = models.CharField(max_length=200)
    departures = models.JSONField()
    description = models.TextField(blank=True, default="")

    def __str__(self):
        return self.route_name


class Announcement(models.Model):
    message = models.CharField(max_length=300)

    def __str__(self):
        return self.message


class Reminder(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name="reminders")
    student_email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_email} - {self.route.route_name}"
