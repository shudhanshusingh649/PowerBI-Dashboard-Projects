import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import gsap from "gsap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { ThermometerSun, Maximize2 } from "lucide-react";


// Custom Recharts Tooltip for Dark Mode
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-white/20 bg-[#040B16]/90 p-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <p className="mb-2 font-[Rajdhani] text-lg font-bold text-white">{label} FORECAST</p>
        <div className="space-y-1 text-sm font-mono">
          <p className="text-[#00F0FF]">
            ACTUAL: <span className="font-bold">{payload[0].value}°C</span>
          </p>
          <p className="text-[#FF5500]">
            AI PREDICT: <span className="font-bold">{payload[1].value}°C</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function TemperatureTrend() {
  const containerRef = useRef(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadForecast() {
      try {
        const payload = {
          Latitude: 25.62,
          Longitude: 85.12,
          Date: "2024-06-01",
          Max_Temperature: 36.5,
          Min_Temperature: 27.1,
          Rainfall: 12.3
        };

        const res = await api.post("/forecast/7-days", payload);

        const chartData = res.data.forecast.map((item) => ({
          day: new Date(item.date)
            .toLocaleDateString("en-US", {
              weekday: "short",
            })
            .toUpperCase(),

          actual: item.min_temp,
          forecast: item.max_temp,
        }));

        setData(chartData);

      } catch (err) {
        console.error(err);
      }
    }

    loadForecast();
  }, []);

  return (
    <div ref={containerRef} className="flex h-full flex-col justify-between rounded-xl bg-black/20 p-6">

      {/* High-Tech Header */}
      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="flex items-center gap-2 font-[Rajdhani] text-xl font-bold tracking-widest text-white uppercase">
            <ThermometerSun size={20} className="text-[#FF5500]" />
            Thermal Trend Analysis
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-wider text-slate-400">
              NODE_LOCK: PATNA, BIHAR
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
          </div>
        </div>
        <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white">
          <Maximize2 size={18} />
        </button>
      </div>

      {/* Recharts Container */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />

            <XAxis
              dataKey="day"
              stroke="#ffffff50"
              tick={{ fill: "#94a3b8", fontSize: 12, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />

            <YAxis
              stroke="#ffffff50"
              tick={{ fill: "#94a3b8", fontSize: 12, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={false}
              dx={-10}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff30', strokeWidth: 1, strokeDasharray: '5 5' }} />

            {/* Actual Temp Line */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#00F0FF"
              strokeWidth={3}
              dot={{ fill: '#040B16', stroke: '#00F0FF', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#00F0FF', shadow: '0 0 10px #00F0FF' }}
            />

            {/* XGBoost Forecast Line */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#FF5500"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#040B16', stroke: '#FF5500', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#FF5500' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6 border-t border-white/5 pt-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#00F0FF]" />
          <span className="font-mono text-xs text-slate-400">MIN TEMP</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#FF5500] border border-dashed border-[#FF5500] bg-opacity-20" />
          <span className="font-mono text-xs text-slate-400">MAX TEMP</span>
        </div>
      </div>

    </div>
  );
}