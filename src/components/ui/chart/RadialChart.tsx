"use client";

import Image from "next/image";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
const data = [
  {
    name: "Total",
    count: 106,
    fill: "#fff",
  },
  {
    name: "Girls",
    count: 50,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 50,
    fill: "#83C3EBFA",
  },
];

const RadialChart = () => {
  return (
    <div className="relative w-full h-[75%]">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={32}
          data={data}
        >
          <RadialBar background dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>
      <Image
        src="/maleFemale.png"
        alt=""
        width={50}
        height={50}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default RadialChart;
