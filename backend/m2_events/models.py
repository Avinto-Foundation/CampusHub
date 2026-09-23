from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField()
    capacity = models.PositiveIntegerField()
    registered_count = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True, default="")

    def __str__(self):
        return self.title


class Announcement(models.Model):
    message = models.CharField(max_length=300)

    def __str__(self):
        return self.message


class Registration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="registrations")
    name = models.CharField(max_length=200)
    email = models.EmailField()
    roll_number = models.CharField(max_length=50)
    tshirt_size = models.CharField(max_length=10)
    emergency_contact = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.event.title}"
