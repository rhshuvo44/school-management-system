import AttendanceBarChart from "@/components/ui/chart/AttendanceBarChart";
import prisma from "@/lib/prisma";
import Image from "next/image";

const AttendanceChart = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);
  const resData = await prisma.attendance.findMany({
    where: {
      date: { gte: lastMonday },
    },
    select: {
      date: true,
      present: true,
    },
  });
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Sun: { present: 0, absent: 0 },
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
    };
  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1];
      if (item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });
  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));
  return (
    <div className="bg-white p-4 rounded-xl w-full h-full ">
      {/* Title  */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART  */}
      <AttendanceBarChart data={data} />
    </div>
  );
};

export default AttendanceChart;
