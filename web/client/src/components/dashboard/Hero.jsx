import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Satellite,
  Brain,
  CloudRain,
  ThermometerSun,
  Activity,
  Radio
} from "lucide-react";

export default function Hero() {
  // Adding a live clock makes the dashboard feel like a real-time system
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-full w-full overflow-hidden rounded-xl p-8 flex flex-col justify-between">
      
      {/* Background ambient glows (subtle, doesn't overpower the main grid) */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#00F0FF]/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-600/10 blur-[80px] pointer-events-none"></div>

      {/* TOP: Status Bar & Clock */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 px-3 py-1.5 shadow-[0_0_10px_rgba(0,240,255,0.1)]">
          <Satellite size={14} className="text-[#00F0FF] animate-pulse" />
          <span className="text-xs font-[Rajdhani] font-semibold tracking-widest text-[#00F0FF] uppercase">
            BAH 2026 // PS-05
          </span>
        </div>
        
        {/* Live System Time */}
        <div className="flex items-center gap-2 text-slate-400 font-[Rajdhani] tracking-widest">
          <Radio size={14} className="animate-pulse text-[#00FF66]" />
          <span>SYS.TIME:</span>
          <span className="text-white font-medium">
            {time.toLocaleTimeString('en-US', { hour12: false })} IST
          </span>
        </div>
      </div>

      {/* MIDDLE: Main Typography & Calls to Action */}
      <div className="relative z-10 mt-6 flex-1">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-none font-[Rajdhani] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#00F0FF]">
          AI-POWERED <br />
          DIGITAL TWIN
        </h1>
        <p className="mt-4 max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed">
          High-fidelity climate simulation engine. Predicting spatial rainfall patterns and thermal anomalies across India using XGBoost models and National Climate datasets.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/prediction"
            className="group flex items-center gap-3 rounded-lg bg-[#00F0FF] px-6 py-3 font-[Rajdhani] font-bold text-black text-lg transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]"
          >
            INITIALIZE PREDICTION
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/analytics"
            className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-[Rajdhani] font-semibold text-white transition-all hover:bg-white/10 hover:border-[#00F0FF]/50"
          >
            <Activity size={18} className="text-[#00F0FF]" />
            DATA ANALYTICS
          </Link>
        </div>
      </div>

      {/* BOTTOM: Telemetry Cards */}
      <div className="relative z-10 mt-10 grid gap-4 md:grid-cols-3">
        {/* Card 1 */}
        <div className="group rounded-lg border border-white/10 bg-black/40 p-4 transition-colors hover:border-[#00F0FF]/40 hover:bg-white/5">
          <div className="flex items-center justify-between mb-3 text-slate-400 group-hover:text-[#00F0FF] transition-colors">
            <CloudRain size={20} />
            <span className="text-[10px] font-mono tracking-wider opacity-50">MOD.01</span>
          </div>
          <h3 className="font-[Rajdhani] text-2xl font-bold text-white">Hydrological</h3>
          <p className="text-xs text-slate-400 mt-1">Next-Gen Rainfall Maps</p>
        </div>

        {/* Card 2 */}
        <div className="group rounded-lg border border-white/10 bg-black/40 p-4 transition-colors hover:border-[#FF5500]/40 hover:bg-white/5">
          <div className="flex items-center justify-between mb-3 text-slate-400 group-hover:text-[#FF5500] transition-colors">
            <ThermometerSun size={20} />
            <span className="text-[10px] font-mono tracking-wider opacity-50">MOD.02</span>
          </div>
          <h3 className="font-[Rajdhani] text-2xl font-bold text-white">Thermal</h3>
          <p className="text-xs text-slate-400 mt-1">Extreme Heat Forecasts</p>
        </div>

        {/* Card 3 */}
        <div className="group rounded-lg border border-white/10 bg-black/40 p-4 transition-colors hover:border-[#9D00FF]/40 hover:bg-white/5">
          <div className="flex items-center justify-between mb-3 text-slate-400 group-hover:text-[#9D00FF] transition-colors">
            <Brain size={20} />
            <span className="text-[10px] font-mono tracking-wider opacity-50">CORE</span>
          </div>
          <h3 className="font-[Rajdhani] text-2xl font-bold text-white">XGBoost Engine</h3>
          <p className="text-xs text-slate-400 mt-1">Model Accuracy: 94.2%</p>
        </div>
      </div>

    </section>
  );
}