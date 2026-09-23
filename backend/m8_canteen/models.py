from django.db import models


class MenuItem(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.CharField(max_length=100)
    description = models.TextField(blank=True, default="")

    def __str__(self):
        return self.name


class Order(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    pickup_time = models.CharField(max_length=10)
    notes = models.CharField(max_length=300, blank=True, default="")
    delivery_address = models.JSONField()
    items = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.pickup_time}"
