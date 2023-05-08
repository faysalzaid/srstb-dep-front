import React from "react";
import { data } from "./data";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { name: "Jan", now: 4000, previous: 2400 },
//   { name: "Feb", now: 3000, previous: 1398 },
//   { name: "Mar", now: 2000, previous: 4000 },
//   { name: "Apr", now: 2780, previous: 3908 },
//   { name: "May", now: 1890, previous: 4800 },
//   { name: "Jun", now: 2390, previous: 3800 },
//   { name: "Jul", now: 3490, previous: 4300 },
//   { name: "Aug", now: 3000, previous: 1398 },
//   { name: "Sep", now: 2000, previous: 4000 },
//   { name: "Oct", now: 2780, previous: 3908 },
//   { name: "Nov", now: 1890, previous: 4800 },
//   { name: "Dec", now: 4000, previous: 2400 },
// ];

const Area_Chart = () => {
  return (
    <section className=" w-[full] h-full ">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 0,
            right: 15,
            left: 15,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Last_Year"
            stroke="#7e3af2"
            fill=" #7e3af2"
          />
          <Area
            type="monotone"
            dataKey="now"
            stroke="rgb(59 130 246)"
            fill=" rgb(59 130 246)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Area_Chart;
