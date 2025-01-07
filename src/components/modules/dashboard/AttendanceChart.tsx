import AttendanceBarChart from "@/components/ui/chart/AttendanceBarChart";
import Image from "next/image";

const AttendanceChart = () => {
  return (
    <div className="bg-white p-4 rounded-xl w-full h-full ">
      {/* Title  */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART  */}
      <AttendanceBarChart />
    </div>
  );
};

export default AttendanceChart;
