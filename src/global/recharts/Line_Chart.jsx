import React from "react";
// import { data_1 } from '../../components/charts/Chart_Data';
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


const Line_Chart = ({project}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={project}
        margin={{
          top: 10,
          right: 20,
          left: 20,
          bottom: 0,
        }}
      >
        <Tooltip />
        {/* <Legend /> */}
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        {/* <YAxis  /> */}
        <Line
          connectNulls
          type="monotone"
          dataKey='remainingCost'
          stroke="rgb(59 130 246)"
          strokeWidth={2}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey='totalCost[0]'
          stroke="orange"
          strokeWidth={2}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="d_3"
          stroke="green"
          strokeWidth={2}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Line_Chart;
