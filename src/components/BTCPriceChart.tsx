import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TrendingUp } from "lucide-react";
import { getBTCPriceHistory } from "../services/priceApi";
import { useChartTheme } from "../hooks/useChartTheme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function BTCPriceChart() {
  const [priceData, setPriceData] = useState<{
    labels: string[];
    prices: number[];
  }>({
    labels: [],
    prices: [],
  });
  const [loading, setLoading] = useState(true);
  const { gridColor, textColor } = useChartTheme();

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        setLoading(true);
        const data = await getBTCPriceHistory(7);
        setPriceData(data);
      } catch (error) {
        console.error("Failed to fetch BTC price history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceHistory();
  }, []);

  const chartData = {
    labels: priceData.labels,
    datasets: [
      {
        label: "BTC Price (USD)",
        data: priceData.prices,
        fill: true,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: any) {
            return "$" + value.toLocaleString();
          },
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-blue-500/5 hover:shadow-xl dark:hover:shadow-blue-500/10 transition-all duration-300">
      <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-4">
        <TrendingUp className="w-6 h-6" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          BTC Price History (7 Days)
        </h3>
      </div>
      <div className="h-[300px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 dark:border-blue-400 border-t-transparent" />
          </div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}
