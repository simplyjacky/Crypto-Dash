import React from "react";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  LineElement,
  Chart,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

let pricesData;

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`
        );
        const data = await res.json();

        const prices = data.prices.map((price) => ({
          x: price[0],
          y: price[1],
        }));
        setChartData({
          datasets: [
            {
              label: "Price (USB)",
              data: prices,
              fill: true,
              border: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              pointRadius: 0,
              tensoin: 0.3,
            },
          ],
        });
        setLoading(false);
        pricesData = {
          datasets: [
            {
              labels: "Price (USB)",
              data: prices,
              fill: true,
              border: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              pointRadius: 0,
              tensoin: 0.3,
            },
          ],
        };
      } catch (error) {
        console.log("Huston, we have a problem", error?.message);
      }
    };
    fetchPrices();
  }, [coinId]);

  console.log(pricesData);
  if (loading) return <h1>Loading.... </h1>;

  if (chartData === null) return <h1>Data is not available</h1>;

  return (
    <div style={{ marginTop: "30px" }}>
      <Line
        datasets={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              type: "time",
              time: { unit: "day" },
              ticks: { autoSkip: true, maxTicksLimit: 7 },
            },

            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CoinChart;
