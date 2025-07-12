from django.contrib import admin

from .models import Group, Student, Attendance, Payment, Grade


admin.site.register(Group)
admin.site.register(Student)
admin.site.register(Attendance)
admin.site.register(Payment)
admin.site.register(Grade)
