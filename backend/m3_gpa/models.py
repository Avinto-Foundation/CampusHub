from django.db import models


class Course(models.Model):
    code = models.CharField(max_length=20)
    name = models.CharField(max_length=200)
    credits = models.PositiveIntegerField()
    description = models.TextField(blank=True, default="")

    def __str__(self):
        return f"{self.code} - {self.name}"


class GPARecord(models.Model):
    student_name = models.CharField(max_length=200)
    gpa = models.DecimalField(max_digits=3, decimal_places=2)

    def __str__(self):
        return f"{self.student_name} - {self.gpa}"
