from django.db import models


class PrintJob(models.Model):
    file_name = models.CharField(max_length=200)
    pages = models.PositiveIntegerField()
    copies = models.PositiveIntegerField()
    color = models.BooleanField(default=False)
    cost = models.PositiveIntegerField()
    description = models.TextField(blank=True, default="")
    delivery_address = models.JSONField()

    def __str__(self):
        return self.file_name


class PriceListEntry(models.Model):
    category = models.CharField(max_length=100)
    price_per_page = models.PositiveIntegerField()

    def __str__(self):
        return self.category
