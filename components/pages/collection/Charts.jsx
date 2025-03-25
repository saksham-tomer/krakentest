"use client";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  LineController,
} from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  LineController
);
import { Bar } from "react-chartjs-2";
const options = [
  { value: "7-days", label: "Last 7 Days" },
  { value: "14-days", label: "Last 14 Days" },
  { value: "30-days", label: "Last 30 Days" },
  { value: "60-days", label: "Last 60 Days" },
  { value: "90-days", label: "Last 90 Days", selected: true },
  { value: "last-year", label: "Last Year" },
  { value: "all-time", label: "All Time" },
];
const footer = (tooltipItems) => {
  let sum = 1;
  tooltipItems.forEach(function (tooltipItem) {
    sum *= tooltipItem.parsed.y;
  });
  return (
    "Volume: " + Intl.NumberFormat("en-US", { notation: "compact" }).format(sum)
  );
};
const chartsOptions = {
  maintainAspectRatio: false,
  responsive: true,
  interaction: {
    intersect: false,
    mode: "index",
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        stepSize: 50,
      },
    },
  },
  plugins: {
    legend: { display: false },
    decimation: {
      enabled: true,
    },
    tooltip: {
      usePointStyle: true,
      position: "nearest",
      backgroundColor: "#131740",
      titleAlign: "center",
      bodyAlign: "center",
      footerAlign: "center",
      padding: 12,
      displayColors: false,
      yAlign: "bottom",
      callbacks: {
        footer: footer,
      },
    },
  },
  animation: false,
};
const chartData = {
  labels: [
    "Jan 23",
    "Jan 24",
    "Jan 25",
    "Jan 26",
    "Jan 27",
    "Jan 28",
    "Jan 29",
  ],
  datasets: [
    {
      type: "line",
      label: "Avg. price",
      backgroundColor: "#10B981",
      borderColor: "#10B981",
      data: [54.73, 64, 53, 96, 130, 100, 102.88],
    },
    {
      type: "bar",
      label: "Sales",
      backgroundColor: "#E7E8EC",
      data: [25, 20, 40, 130, 75, 48, 12],
    },
  ],
};

export default function Charts() {
  return (
    <>
      {/* Period / Stats */}
      <div className="mb-16 flex flex-wrap items-center">
        <select className="mr-8 min-w-[12rem] rounded-lg border-jacarta-100 py-3.5 text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white">
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              defaultValue={option.selected ? "selected" : null}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="py-2">
          <span className="mr-4 inline-block align-middle">
            <span className="block text-sm font-bold dark:text-white">
              90 Day Avg. Price:
            </span>
            <span className="block text-sm font-bold text-green">Ξ7.0633</span>
          </span>

          <span className="inline-block align-middle">
            <span className="block text-sm font-bold dark:text-white">
              90 Day Volume:
            </span>
            <span className="block text-sm font-bold text-green">
              Ξ24,085.6957
            </span>
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container relative mb-24 h-80 w-full">
        <Bar options={chartsOptions} data={chartData} />
      </div>
    </>
  );
}
