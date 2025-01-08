"use client";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#FAE27C" },
];
const PerformancePieChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          fill="#8884d8"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PerformancePieChart;
