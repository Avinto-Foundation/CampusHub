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
    MINUTES_BEFORE_CHOICES = [(5, "5 minutes"), (10, "10 minutes"), (15, "15 minutes"), (30, "30 minutes")]
    CHANNEL_CHOICES = [("email", "Email"), ("sms", "SMS")]

    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name="reminders")
    departure = models.CharField(max_length=5)
    student_name = models.CharField(max_length=200)
    student_email = models.EmailField()
    phone = models.CharField(max_length=20)
    minutes_before = models.PositiveIntegerField(choices=MINUTES_BEFORE_CHOICES)
    channel = models.CharField(max_length=10, choices=CHANNEL_CHOICES)
    repeat_weekdays = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_email} - {self.route.route_name}"
