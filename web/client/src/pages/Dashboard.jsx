import { useEffect, useState } from "react";
import { Activity, RefreshCcw, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import api from "../services/api";

// Components
import StatCard from "../components/StatCard";
import TemperatureChart from "../components/TemperatureChart";
import AlertCard from "../components/AlertCard";
import RecommendationCard from "../components/RecommendationCard";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/stats");
      setStats(res.data);
    } catch (fetchError) {
      setError("Unable to load live dashboard metrics. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-500">
      {/* Hero / Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-10 text-white shadow-xl shadow-slate-200/50">
        {/* Abstract background decorative element */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                System Live
              </p>
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              Urban Heat Operations
            </h1>
            <p className="mt-2 max-w-xl text-slate-300 text-sm leading-relaxed">
              Monitor hotspots, validate cooling actions, and steer interventions with real-time ML-driven pipeline data.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchStats}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium backdrop-blur transition hover:bg-white/20 disabled:opacity-50"
            >
              <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            {stats && (
              <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm backdrop-blur">
                <div className="text-slate-400 text-xs font-medium mb-0.5">Active Zones</div>
                <div className="text-xl font-bold">{stats.totalZones}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-800 shadow-sm">
          <AlertTriangle size={20} className="text-red-500" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          // Skeleton Loaders for premium feel
          [...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-200 animate-pulse"></div>
          ))
        ) : (
          <>
            <StatCard title="Average Temp" value={`${stats?.avgTemp ?? "--"}°C`} trend="-1.2%" />
            <StatCard title="Active Hotspots" value={stats?.hotspots ?? "--"} trend="+2" />
            <StatCard title="Population at Risk" value={(stats?.population ?? 0).toLocaleString()} />
            <StatCard title="Cooling Impact" value={stats?.impact ?? "--"} />
          </>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Chart Section */}
        <section className="flex flex-col rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-500" />
            <h2 className="text-lg font-bold text-slate-800">Temperature Trends</h2>
          </div>
          <div className="flex-1 min-h-[300px]">
            {loading ? (
              <div className="h-full w-full rounded-xl bg-slate-100 animate-pulse"></div>
            ) : (
              <TemperatureChart data={stats?.trend} />
            )}
          </div>
        </section>

        {/* Insights Section */}
        <section className="flex flex-col rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center gap-2">
            <Activity size={20} className="text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-800">AI Insights</h2>
          </div>
          
          <div className="flex-1 space-y-3 overflow-y-auto">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-slate-100 animate-pulse"></div>
              ))
            ) : stats?.insights?.length ? (
              stats.insights.map((insight, idx) => (
                <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600 leading-relaxed shadow-sm">
                  {insight}
                </div>
              ))
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                No new insights available.
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Bottom Grids */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Alerts */}
        <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={20} className="text-orange-500" />
              <h2 className="text-lg font-bold text-slate-800">High Risk Zones</h2>
            </div>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
              Action Required
            </span>
          </div>
          
          <div className="grid gap-4">
            {loading ? (
               <div className="h-20 rounded-xl bg-slate-100 animate-pulse"></div>
            ) : stats?.highRiskZones?.length ? (
              stats.highRiskZones.map((zone) => (
                <AlertCard
                  key={zone.city}
                  zone={zone.city}
                  risk="High"
                  temperature={zone.temperature}
                  population={zone.population}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-6 text-center text-sm font-medium text-emerald-700">
                All zones operating within safe temperature thresholds.
              </div>
            )}
          </div>
        </section>

        {/* Recommendations */}
        <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center gap-2">
            <Lightbulb size={20} className="text-amber-500" />
            <h2 className="text-lg font-bold text-slate-800">Smart Interventions</h2>
          </div>
          
          <div className="grid gap-4">
            {[
              {
                title: "Increase tree cover",
                detail: "Prioritize wards with high temperature and low NDVI for shade-first interventions.",
              },
              {
                title: "Cool roofs and reflective surfaces",
                detail: "Use low-cost surface cooling where dense impervious cover is amplifying heat.",
              },
              {
                title: "Water-sensitive public spaces",
                detail: "Focus on markets, schools, and parks to produce visible comfort gains quickly.",
              },
            ].map((item) => (
              <RecommendationCard key={item.title} title={item.title} detail={item.detail} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;