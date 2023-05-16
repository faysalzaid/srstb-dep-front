import React from "react";
import { data } from "./data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Bar_Chart2 = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 60,
          right: 15,
          left: 15,
          bottom: 0,
        }}
        barSize={25}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 20 }} />
        {/* <YAxis /> */}
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" className=" bg-orange-400" />
        <Bar dataKey="Last_Year" fill="#9761f5cd" />
        {/* <Bar dataKey="now" fill="#9761f5cd" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Bar_Chart2;
