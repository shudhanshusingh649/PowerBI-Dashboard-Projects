import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ComposedChart,
  Line,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Activity, Download } from "lucide-react";

// AI Simulated Multi-Variable Forecast Data
const data = [
  { day: "MON", temp: 34, rain: 12 },
  { day: "TUE", temp: 36, rain: 5 },
  { day: "WED", temp: 35, rain: 28 },
  { day: "THU", temp: 38, rain: 0 },
  { day: "FRI", temp: 39, rain: 0 },
  { day: "SAT", temp: 41, rain: 2 },
  { day: "SUN", temp: 40, rain: 15 },
];

// Custom High-Tech Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-white/20 bg-[#040B16]/95 p-4 shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <p className="mb-3 border-b border-white/10 pb-2 font-[Rajdhani] text-lg font-bold text-white tracking-widest uppercase">
          {label} FORECAST
        </p>
        <div className="space-y-2 font-mono text-sm">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-6">
              <span style={{ color: entry.color }} className="opacity-80">
                {entry.name === "temp" ? "THERMAL (MAX):" : "PRECIPITATION:"}
              </span>
              <span className="font-bold text-white">
                {entry.value} {entry.name === "temp" ? "°C" : "mm"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function ForecastChart() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
    );
  }, []);

  return (
    <div ref={containerRef} className="flex h-full flex-col justify-between rounded-xl bg-transparent p-6">
      
      {/* Telemetry Header */}
      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="flex items-center gap-2 font-[Rajdhani] text-2xl font-bold tracking-widest text-white uppercase drop-shadow-sm">
            <Activity size={24} className="text-[#00F0FF]" />
            Multi-Variable AI Forecast
          </h2>
          <div className="mt-1 flex gap-3 text-[10px] font-mono tracking-wider text-slate-400 uppercase">
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#FF5500]" /> MODEL: XGBOOST-THERMAL</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF]" /> MODEL: IMD-PRECIP</span>
          </div>
        </div>
        
        {/* Export Button (Great for Hackathon UX) */}
        <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white">
          <Download size={14} />
          EXPORT CSV
        </button>
      </div>

      {/* Recharts Container */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {/* SVG Gradients for high-tech styling */}
            <defs>
              <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#00F0FF" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            
            <XAxis 
              dataKey="day" 
              stroke="#ffffff50" 
              tick={{ fill: "#94a3b8", fontSize: 12, fontFamily: 'monospace' }} 
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            
            {/* LEFT Axis: Temperature */}
            <YAxis 
              yAxisId="left"
              stroke="#ffffff50" 
              tick={{ fill: "#94a3b8", fontSize: 12, fontFamily: 'monospace' }} 
              tickLine={false}
              axisLine={false}
              dx={-10}
            />

            {/* RIGHT Axis: Rainfall */}
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#ffffff50" 
              tick={{ fill: "#94a3b8", fontSize: 12, fontFamily: 'monospace' }} 
              tickLine={false}
              axisLine={false}
              dx={10}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
            
            {/* Rainfall represented as glowing bars on the Right Axis */}
            <Bar 
              yAxisId="right"
              dataKey="rain" 
              fill="url(#rainGradient)" 
              radius={[4, 4, 0, 0]}
              barSize={30}
            />

            {/* Temperature represented as a line on the Left Axis */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temp"
              stroke="#FF5500"
              strokeWidth={3}
              dot={{ fill: '#040B16', stroke: '#FF5500', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#FF5500', shadow: '0 0 15px #FF5500' }}
            />

          </ComposedChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}