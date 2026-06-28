import { ArrowUpRight, Activity } from "lucide-react";

export default function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  color, // Now expects a Tailwind text color class (e.g., "text-[#FF5500]")
}) {
  return (
    // The container is transparent because the parent in Analytics.jsx provides the glassmorphism backdrop
    <div className="group relative flex h-full flex-col justify-between rounded-lg bg-transparent p-5 transition-all duration-300 hover:bg-white/5">

      {/* Background Glow Effect on Hover */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-white/10" />

      {/* Top Section: Icon & Live Status */}
      <div className="relative z-10 flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-[#040B16]/50 shadow-inner transition-colors duration-300 group-hover:border-current ${color}`}>
          <Icon size={24} className="drop-shadow-[0_0_8px_currentColor]" />
        </div>
        
        {/* Adds a live telemetry feel to the card */}
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2 py-1">
           <Activity size={12} className="text-[#00FF66] animate-pulse" />
           <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase">LIVE</span>
        </div>
      </div>

      {/* Middle Section: Title & Value */}
      <div className="relative z-10 mt-6">
        <p className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">
          {title}
        </p>
        <div className="mt-1 flex items-baseline gap-1">
          <h2 className="font-[Rajdhani] text-4xl font-bold tracking-wide text-white drop-shadow-md">
            {value}
          </h2>
          {unit && (
            <span className="font-[Rajdhani] text-lg font-medium text-slate-500">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Section: AI Status */}
      <div className="relative z-10 mt-4 flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] font-mono tracking-widest text-[#00FF66]">
        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />[cite: 9]
        <span>AI SYNCHRONIZED</span>
      </div>

    </div>
  );
}