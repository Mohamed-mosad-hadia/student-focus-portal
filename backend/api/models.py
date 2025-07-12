from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Student(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50, blank=True)
    group = models.ForeignKey(Group, related_name="students", on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Attendance(models.Model):
    student = models.ForeignKey(Student, related_name="attendance", on_delete=models.CASCADE)
    date = models.DateField()
    present = models.BooleanField(default=True)

    class Meta:
        unique_together = ("student", "date")


class Payment(models.Model):
    student = models.ForeignKey(Student, related_name="payments", on_delete=models.CASCADE)
    month = models.DateField(help_text="First day of month")
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    paid = models.BooleanField(default=False)

    class Meta:
        unique_together = ("student", "month")


class Grade(models.Model):
    student = models.ForeignKey(Student, related_name="grades", on_delete=models.CASCADE)
    subject = models.CharField(max_length=255)
    score = models.DecimalField(max_digits=5, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f"{self.student} - {self.subject}"

