"use client";

import { Card } from "@/components/Card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import useApiRequest from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";
import { Dropdown } from "@/components/Dropdown";
import { formatChartData, formatDataForRecharts, formatSeconds } from "@/utils";
import CustomLineChart from "@/components/LineChart";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function Home() {
  const [chartData1, setChartData1] = useState<any>(null);
  const [chartData2, setChartData2] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const { loading, error, makeRequest } = useApiRequest();

  const timeOptions = [
    { key: "Week", value: 6 },
    { key: "Month", value: 30 },
    { key: "3 Months", value: 90 },
    { key: "6 Months", value: 180 },
    { key: "Year", value: 364 },
  ];

  useEffect(() => {
    fetchStats();
    fetchChartData1(timeOptions[0].value);
    fetchChartData2();
  }, []);

  const fetchChartData1 = async (days: number) => {
    const res: any = await makeRequest(
      `/conversations_over_time?days=${days}`,
      "GET"
    );

    // const data = formatChartData(res, "#FB8500");
    const data = formatDataForRecharts(res);
    setChartData1(data);
  };

  const fetchChartData2 = async () => {
    const res: any = await makeRequest(`/conversations_by_hour`, "GET");

    const data = formatChartData(res, "#219EBC");
    setChartData2(data);
  };

  const fetchStats = async () => {
    const res: any = await makeRequest(`/stats`, "GET");
    setStats(res.stats);
  };

  return (
    <div className="main-content flex flex-col flex-grow p-4">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Total Conversations">
            <h2 className="color-blue mt-2 pb-0">
              {stats?.total_conversations || 0}
            </h2>
          </Card>

          <Card title="Average time of conversation">
            <h2 className="color-blue mt-2 pb-0">
              {stats?.average_conversation_time
                ? formatSeconds(stats.average_conversation_time)
                : 0}
            </h2>
          </Card>

          <Card title="New Leads">
            <h2 className="color-blue mt-2 pb-0">{stats?.total_leads || 0}</h2>
          </Card>
        </div>
      </div>

      <div className="relative mt-4">
        <div className="absolute top-4 right-4">
          <Dropdown
            options={timeOptions}
            onSelect={(option) => fetchChartData1(option.value)}
          />
        </div>
        <Card
          title="Conversations / Date"
          desc="Data is sorted based on the date when the conversations were created."
        >
          <div className="w-full aspect-w-3 aspect-h-2 bg-white rounded mt-3">
            {/* {chartData1 && <Line data={chartData1} />} */}
            {chartData1 && (
              <CustomLineChart data={chartData1} stroke="#FB8500" />
            )}
          </div>
        </Card>
      </div>

      <div className="mt-4">
        <Card
          title="Conversations / Time"
          desc="Data is sorted based on the time when the conversations were created."
        >
          <div className="w-full aspect-w-5 aspect-h-1 bg-white rounded mt-3">
            {chartData2 && <Line data={chartData2} />}
          </div>
        </Card>
      </div>
    </div>
  );
}
