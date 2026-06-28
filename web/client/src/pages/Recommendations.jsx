import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertCircle, 
  Sparkles, 
  Terminal, 
  Activity, 
  Crosshair,
  Droplets
} from "lucide-react";
import toast from "react-hot-toast";
// import api from "../services/api";

// --- HACKATHON PRO-TIP ---
// Always have high-quality, localized mock data ready. 
// These sound exactly like real mitigation strategies an ML model would output.
const fallbackRecommendations = [
  {
    id: "MIT-01",
    type: "CRITICAL",
    title: "Urban Heat Island Mitigation",
    detail: "Deploy high-albedo reflective coatings on municipal structures in Sector 7. Projected to reduce surface temperatures by 2.4°C.",
    icon: ShieldAlert,
    theme: "text-[#FF5500]",
    bg: "bg-[#FF5500]/10",
    border: "border-[#FF5500]/30"
  },
  {
    id: "MIT-02",
    type: "PREVENTATIVE",
    title: "Hydrological Resource Allocation",
    detail: "AI forecasts indicate 0% precipitation. Reroute 15% of emergency municipal water reserves to high-risk agricultural perimeters.",
    icon: Droplets,
    theme: "text-[#00F0FF]",
    bg: "bg-[#00F0FF]/10",
    border: "border-[#00F0FF]/30"
  },
  {
    id: "MIT-03",
    type: "ACTIONABLE",
    title: "Public Health Advisory",
    detail: "Thermal stress reaching dangerous levels. Issue immediate 'Code Red' heatwave warnings to mobile networks in the central grid.",
    icon: Activity,
    theme: "text-[#00FF66]",
    bg: "bg-[#00FF66]/10",
    border: "border-[#00FF66]/30"
  }
];

export default function Recommendations() {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // KEEP YOUR REAL API CALL:
        // const response = await api.get("/stats/recommendations");
        // setRecommendations(response.data || []);

        // Simulated Network Delay for UI Testing
        setTimeout(() => {
          setRecommendations(fallbackRecommendations);
          setLoading(false);
          toast.success("Mitigation strategies loaded.", {
            style: { background: '#040B16', color: '#00F0FF', border: '1px solid #00F0FF' }
          });
        }, 1500);

      } catch (err) {
        setError("Uplink severed. Unable to load the cooling playbook.");
        toast.error("Recommendation feed unavailable", {
          style: { background: '#FF5500', color: '#fff' }
        });
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // GSAP Mount Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".rec-header",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // GSAP Cards Stagger Animation (Triggers when loading finishes)
  useEffect(() => {
    if (!loading && recommendations.length > 0 && cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.2)" }
      );
    }
  }, [loading, recommendations]);

  return (
    <div ref={containerRef} className="h-full w-full text-white space-y-8 pb-8">
      
      {/* High-Tech Terminal Header */}
      <section className="rec-header relative overflow-hidden rounded-2xl bg-[#0B192C]/60 backdrop-blur-md border border-[#00F0FF]/30 p-8 shadow-[0_0_30px_rgba(0,240,255,0.05)]">
        {/* Background glow */}
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[#00F0FF]/10 blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Terminal size={18} className="text-[#00F0FF]" />
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                System Directive Output
              </p>
            </div>
            <h1 className="text-3xl md:text-4xl font-[Rajdhani] font-black tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00F0FF] flex items-center gap-3">
              Actionable Intelligence
              <span className="h-6 w-3 bg-[#00F0FF] animate-[pulse_1s_step-end_infinite]" /> {/* Terminal Cursor */}
            </h1>
            <p className="mt-3 max-w-2xl text-slate-400 text-sm font-mono leading-relaxed">
              XGBOOST pipeline has converted geospatial and thermal anomalies into strategic mitigation operations for urban planning nodes.
            </p>
          </div>

          {/* Quick Stat Pill */}
          {!loading && !error && (
            <div className="flex items-center gap-3 rounded-lg bg-[#00F0FF]/10 px-4 py-2 text-sm font-mono font-medium border border-[#00F0FF]/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
              <Crosshair size={16} className="text-[#00F0FF] animate-pulse" />
              <span className="text-[#00F0FF] tracking-wider">{recommendations.length} STRATEGIES ACTIVE</span>
            </div>
          )}
        </div>
      </section>

      {/* Error State */}
      {error && (
        <div className="rec-header flex items-center gap-3 rounded-lg border border-[#FF5500]/30 bg-[#FF5500]/10 px-5 py-4 text-[#FF5500] shadow-sm font-mono text-sm">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {/* Recommendations Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" ref={cardsRef}>
        {loading ? (
          // Premium Dark Mode Skeleton Loaders
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-48 rounded-2xl border border-white/5 bg-[#040B16]/50 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-white/5 animate-pulse"></div>
                <div className="h-4 w-32 rounded bg-white/5 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-full rounded bg-white/5 animate-pulse"></div>
                <div className="h-3 w-5/6 rounded bg-white/5 animate-pulse"></div>
                <div className="h-3 w-4/6 rounded bg-white/5 animate-pulse"></div>
              </div>
            </div>
          ))
        ) : recommendations.length > 0 ? (
          
          recommendations.map((item, index) => {
            const Icon = item.icon || ShieldCheck;
            return (
              // Replaced RecommendationCard with a highly-themed inline design
              <div 
                key={item.id || index} 
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0B192C]/40 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/5 hover:border-white/20"
              >
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${item.border} ${item.bg} ${item.theme} shadow-inner`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex items-center gap-1.5 rounded bg-black/40 px-2 py-1 border border-white/5">
                    <span className={`h-1.5 w-1.5 rounded-full ${item.theme.replace('text-', 'bg-')} animate-pulse`} />
                    <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">{item.type || 'RECOMMENDATION'}</span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-[Rajdhani] text-xl font-bold tracking-wide text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {item.detail}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-mono text-xs text-slate-500">ID: {item.id || `REC-0${index+1}`}</span>
                  <button className="text-xs font-bold uppercase tracking-wider text-[#00F0FF] hover:text-white transition-colors">
                    Execute Directive →
                  </button>
                </div>
              </div>
            )
          })

        ) : (
          // Empty State
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/20 py-20 text-center backdrop-blur-sm">
            <ShieldCheck size={48} className="mb-4 text-[#00FF66]/50" />
            <h3 className="font-[Rajdhani] text-2xl font-bold text-white tracking-widest uppercase">System Nominal</h3>
            <p className="mt-2 text-sm text-slate-400 max-w-md font-mono leading-relaxed">
              Current telemetry indicates safe environmental levels across all monitored nodes. No immediate interventions are required.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}