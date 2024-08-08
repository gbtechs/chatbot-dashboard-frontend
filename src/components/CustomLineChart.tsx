// components/LineChart.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  key: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  stroke: string;
}

const CustomLineChart: React.FC<LineChartProps> = ({ data, stroke }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="key" />
        <YAxis width={42} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke={stroke}
          strokeWidth="2"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
