import { useEffect, useState } from "react";
import { 
  PieChart as PieChartIcon, 
  BarChart3, 
  AlertCircle, 
  Activity,
  ShieldAlert
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import api from "../services/api";

export default function Analytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await api.get("/stats");
        setData(response.data.riskBreakdown || []);
      } catch (err) {
        setError("Failed to load analytics data. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getRiskColor = (name) => {
    const lowerName = name?.toLowerCase();
    if (lowerName?.includes("high")) return "#ef4444";
    if (lowerName?.includes("medium")) return "#f97316";
    if (lowerName?.includes("low")) return "#10b981";
    return "#94a3b8";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-xl border border-slate-100 bg-white/90 p-4 shadow-xl backdrop-blur">
          <p className="mb-1 text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Level</p>
          <div className="flex items-center gap-2">
            <span 
              className="h-3 w-3 rounded-full shadow-sm" 
              style={{ backgroundColor: getRiskColor(data.name) }} 
            />
            <p className="text-lg font-black text-slate-800">
              {data.name}: {data.value} zones
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const totalZones = data.reduce((sum, item) => sum + (item.value || 0), 0);
  const highRiskCount = data.find(d => d.name?.toLowerCase().includes("high"))?.value || 0;

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-500">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-10 text-white shadow-xl shadow-slate-200/50">
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 size={20} className="text-cyan-400" />
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Data & Analytics
              </p>
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              Risk Distribution
            </h1>
            <p className="mt-2 max-w-2xl text-slate-300 text-sm leading-relaxed">
              Track the current distribution of high, medium, and low risk areas pulled directly from the live telemetry pipeline.
            </p>
          </div>
        </div>
      </section>

      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-800 shadow-sm">
          <AlertCircle size={20} className="text-red-500" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
            <div className="mb-4 flex items-center gap-2">
              <Activity size={20} className="text-blue-500" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Total Coverage</h2>
            </div>
            {loading ? (
              <div className="h-12 w-24 rounded-lg bg-slate-100 animate-pulse"></div>
            ) : (
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black text-slate-900">{totalZones}</span>
                <span className="text-slate-500 font-medium mb-1.5">zones active</span>
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-red-50 p-6 shadow-sm border border-red-100">
            <div className="mb-4 flex items-center gap-2">
              <ShieldAlert size={20} className="text-red-500" />
              <h2 className="text-sm font-bold text-red-800 uppercase tracking-wider">Critical Action</h2>
            </div>
            {loading ? (
              <div className="h-12 w-24 rounded-lg bg-red-200/50 animate-pulse"></div>
            ) : (
              <div className="flex flex-col">
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-red-600">{highRiskCount}</span>
                  <span className="text-red-700/80 font-medium mb-1.5">zones</span>
                </div>
                <p className="text-xs text-red-600 mt-2 font-medium">
                  Require immediate mitigation review.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Updated minimum height for better flex display */}
        <div className="flex flex-col rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-100 min-h-[450px]">
          <div className="mb-6 flex items-center gap-2">
            <PieChartIcon size={20} className="text-slate-500" />
            <h2 className="text-lg font-bold text-slate-800">Zone Risk Breakdown</h2>
          </div>

          <div className="flex-1 relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-48 w-48 rounded-full border-8 border-slate-50 border-t-blue-500 animate-spin"></div>
              </div>
            ) : data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                {/* Added margin to give the legend space at the bottom */}
                <PieChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}  // Reduced to stop it from hitting edges
                    outerRadius={120} // Reduced to stop it from hitting edges
                    paddingAngle={5}
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getRiskColor(entry.name)} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    iconType="circle"
                    // Added wrapper style to push the legend text down away from the chart
                    wrapperStyle={{ paddingTop: "20px" }}
                    // Added margin-left/right to the span so items don't overlap
                    formatter={(value) => <span className="text-slate-700 font-medium ml-2 mr-4">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 font-medium">
                No analytics data available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}