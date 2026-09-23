from django.db import models


class Complaint(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=50, default="Open")
    location = models.JSONField()

    def __str__(self):
        return f"{self.category} - {self.name}"


class Notice(models.Model):
    message = models.CharField(max_length=300)

    def __str__(self):
        return self.message
