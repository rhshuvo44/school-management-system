import FinanceLineChart from "@/components/ui/chart/FinanceLineChart";
import Image from "next/image";

const FinanceChart = () => {
  return (
    <div className="bg-white p-4 rounded-xl w-full h-full ">
      {/* Title  */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART  */}
      <FinanceLineChart />
    </div>
  );
};

export default FinanceChart;
