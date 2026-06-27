import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const fallbackData = [
  { month: "Jan", temp: 30 },
  { month: "Feb", temp: 32 },
  { month: "Mar", temp: 35 },
  { month: "Apr", temp: 39 },
  { month: "May", temp: 43 },
  { month: "Jun", temp: 42 },
];

function TemperatureChart({ data = fallbackData }) {
  // Custom premium tooltip matching our dashboard theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-slate-100 bg-white/95 p-3 shadow-xl backdrop-blur">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Timeline
          </p>
          <p className="text-lg font-black text-slate-800 mt-0.5">
            {payload[0].value}°C
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
        >
          <defs>
            {/* Smooth glowing gradient fill definition */}
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          
          {/* Subtle horizontal grid guide lines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          
          <XAxis 
            dataKey="month" 
            stroke="#94a3b8" 
            fontSize={12}
            fontWeight={500}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          
          <YAxis 
            stroke="#94a3b8" 
            fontSize={12}
            fontWeight={500}
            tickLine={false}
            axisLine={false}
            dx={-10}
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }} />
          
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6" // Vibrant operational blue
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#tempGradient)"
            // Enhances the interaction circle when hovering over coordinate points
            activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;