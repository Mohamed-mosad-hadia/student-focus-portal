from django.db.models import Avg, Count, Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Group, Student, Attendance, Payment, Grade
from .serializers import (
    GroupSerializer,
    StudentSerializer,
    AttendanceSerializer,
    PaymentSerializer,
    GradeSerializer,
)


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer


class DashboardViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        total_students = Student.objects.count()
        attendance_avg = Attendance.objects.values("student").annotate(
            present_count=Count("id", filter=Q(present=True)),
            total=Count("id")
        )
        avg_attendance = 0
        if attendance_avg:
            avg_attendance = sum(a["present_count"] / a["total"] for a in attendance_avg) / len(attendance_avg)
        avg_grade = Grade.objects.aggregate(avg=Avg("score"))["avg"] or 0
        return Response({
            "total_students": total_students,
            "average_attendance": round(avg_attendance * 100, 2),
            "average_grade": avg_grade,
        })
