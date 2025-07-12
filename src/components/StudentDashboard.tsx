
import React, { useState } from 'react';
import { Calendar, User, GraduationCap, DollarSign, Moon, Sun, LogOut, Plus, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent';
  grade?: number;
  notes?: string;
}

interface PaymentRecord {
  month: string;
  status: 'paid' | 'unpaid';
  amount?: number;
}

interface StudentData {
  name: string;
  id: string;
  group: string;
  registrationDate: string;
  lastAttendance: string;
  totalClasses: number;
  attendanceRate: number;
  averageGrade: number;
  paymentStatus: string;
  attendance: AttendanceRecord[];
  payments: PaymentRecord[];
}

const StudentDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Sample student data - in a real app this would come from an API
  const studentData: StudentData = {
    name: "أحمد محمد علي",
    id: "ST001",
    group: "المجموعة الأولى",
    registrationDate: "2024-09-01",
    lastAttendance: "2025-01-10",
    totalClasses: 24,
    attendanceRate: 87.5,
    averageGrade: 8.5,
    paymentStatus: "1/1",
    attendance: [
      { date: "2025-01-10", status: "present", grade: 9, notes: "أداء ممتاز" },
      { date: "2025-01-08", status: "present", grade: 8, notes: "تحسن واضح" },
      { date: "2025-01-05", status: "absent", notes: "عذر مقبول" },
      { date: "2025-01-03", status: "present", grade: 7.5, notes: "جيد" },
      { date: "2024-12-30", status: "present", grade: 9.5, notes: "ممتاز جداً" },
    ],
    payments: [
      { month: "يناير 2025", status: "paid", amount: 200 },
      { month: "ديسمبر 2024", status: "paid", amount: 200 },
      { month: "نوفمبر 2024", status: "unpaid", amount: 200 },
    ]
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getStatusBadge = (status: string, type: 'attendance' | 'payment') => {
    if (type === 'attendance') {
      return status === 'present' ? (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">حضر</Badge>
      ) : (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">غاب</Badge>
      );
    } else {
      return status === 'paid' ? (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">مدفوع</Badge>
      ) : (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">غير مدفوع</Badge>
      );
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-300`} dir="rtl">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">لوحة الطالب</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="hover:scale-105 transition-transform"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" className="hover:scale-105 transition-transform">
              <LogOut className="h-4 w-4 mr-2" />
              تسجيل خروج
            </Button>
          </div>
        </div>

        {/* Student Profile Card */}
        <Card className="mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">{studentData.name}</CardTitle>
                <p className="opacity-90">ID: {studentData.id}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">المجموعة</p>
                <p className="font-semibold text-gray-800 dark:text-white">{studentData.group}</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">معدل الحضور</p>
                <p className="font-semibold text-gray-800 dark:text-white">{studentData.attendanceRate}%</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">المعدل العام</p>
                <p className="font-semibold text-gray-800 dark:text-white">{studentData.averageGrade}/10</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <DollarSign className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">حالة الدفع</p>
                <p className="font-semibold text-gray-800 dark:text-white">{studentData.paymentStatus}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            تسجيل جلسة جديدة
          </Button>
          <Button variant="outline" className="hover:scale-105 transition-transform">
            <FileText className="h-4 w-4 mr-2" />
            مراجعة الطالب
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Records */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                سجل الحضور والدرجات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentData.attendance.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(record.date).toLocaleDateString('ar-SA')}
                      </div>
                      {getStatusBadge(record.status, 'attendance')}
                    </div>
                    <div className="text-left">
                      {record.grade && (
                        <div className="font-semibold text-blue-600 dark:text-blue-400">
                          {record.grade}/10
                        </div>
                      )}
                      {record.notes && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {record.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Records */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                سجل المدفوعات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentData.payments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="font-medium text-gray-800 dark:text-white">
                        {payment.month}
                      </div>
                      {getStatusBadge(payment.status, 'payment')}
                    </div>
                    <div className="text-left">
                      {payment.amount && (
                        <div className="font-semibold text-green-600 dark:text-green-400">
                          ${payment.amount}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">تاريخ التسجيل</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {new Date(studentData.registrationDate).toLocaleDateString('ar-SA')}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">آخر حضور</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {new Date(studentData.lastAttendance).toLocaleDateString('ar-SA')}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي الحصص</p>
              <p className="font-semibold text-gray-800 dark:text-white">{studentData.totalClasses}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
