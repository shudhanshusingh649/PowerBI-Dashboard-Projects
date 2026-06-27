import { useEffect, useState } from "react";
import { ShieldCheck, AlertCircle, Sparkles } from "lucide-react";
import api from "../services/api";
import RecommendationCard from "../components/RecommendationCard";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await api.get("/stats/recommendations");
        // Ensure it always sets an array, even if the API returns undefined
        setRecommendations(response.data || []);
      } catch (err) {
        setError("Unable to load the cooling playbook. Please check the backend connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-500">
      {/* Premium Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-10 text-white shadow-xl shadow-slate-200/50">
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck size={20} className="text-cyan-400" />
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Action Items
              </p>
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              Cooling Playbook
            </h1>
            <p className="mt-2 max-w-2xl text-slate-300 text-sm leading-relaxed">
              The backend ML pipeline turns current heat conditions into strategic action items for urban planning and mitigation operations.
            </p>
          </div>

          {/* Quick Stat Pill */}
          {!loading && !error && (
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur border border-white/5">
              <Sparkles size={16} className="text-cyan-300" />
              <span>{recommendations.length} Strategies active</span>
            </div>
          )}
        </div>
      </section>

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-800 shadow-sm">
          <AlertCircle size={20} className="text-red-500" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Recommendations Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          // Premium Skeleton Loaders
          [...Array(6)].map((_, i) => (
            <div key={i} className="h-40 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 h-10 w-10 rounded-xl bg-slate-100 animate-pulse"></div>
              <div className="mb-2 h-5 w-3/4 rounded-lg bg-slate-100 animate-pulse"></div>
              <div className="h-4 w-full rounded-lg bg-slate-50 animate-pulse"></div>
              <div className="mt-1 h-4 w-5/6 rounded-lg bg-slate-50 animate-pulse"></div>
            </div>
          ))
        ) : recommendations.length > 0 ? (
          recommendations.map((item, index) => (
            <RecommendationCard 
              key={item.title || index} 
              title={item.title} 
              detail={item.detail} 
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center">
            <ShieldCheck size={48} className="mb-4 text-slate-300" />
            <h3 className="text-base font-bold text-slate-700">No active recommendations</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm">
              Current telemetry indicates safe temperature levels across all monitored wards. No immediate interventions are required.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}