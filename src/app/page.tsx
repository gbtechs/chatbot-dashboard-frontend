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
import { formatChartData, formatSeconds } from "@/utils";

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

    const data = formatChartData(res, "#FB8500");
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
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="">
            <Card title="Total Conversations">
              <h2 className="color-blue mt-2 pb-0">
                {stats?.total_conversations || 0}
              </h2>
            </Card>
          </div>

          <div className="">
            <Card title="Average time of conversation">
              <h2 className="color-blue mt-2 pb-0">
                {stats?.average_conversation_time
                  ? formatSeconds(stats.average_conversation_time)
                  : 0}
              </h2>
            </Card>
          </div>

          <div className="">
            <Card title="New Leads">
              <h2 className="color-blue mt-2 pb-0">
                {stats?.total_leads || 0}
              </h2>
            </Card>
          </div>
        </div>
      </div>

      <div className="relative mt-4">
        <div className="absolute top-4 right-3">
          <Dropdown
            options={timeOptions}
            onSelect={(option) => fetchChartData1(option.value)}
          />
        </div>
        <Card
          title="Conversations / Date"
          desc="Data is sorted based on the date when the conversations were created."
        >
          <div className="h-[450px] bg-white rounded mt-3">
            {chartData1 && <Line data={chartData1} />}
          </div>
        </Card>
      </div>

      <div className="mt-4">
        <Card
          title="Conversations / Time"
          desc="Data is sorted based on the time when the conversations were created."
        >
          <div className="h-[450px] bg-white rounded mt-3">
            {chartData2 && <Line data={chartData2} />}
          </div>
        </Card>
      </div>
    </div>
  );
}
