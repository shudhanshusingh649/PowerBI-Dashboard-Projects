import { useMemo, useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Trees,
  Building2,
  Droplets,
  Home,
  Sparkles,
  TrendingDown,
  ShieldCheck,
  SlidersHorizontal,
  Activity,
  Terminal
} from "lucide-react";

export default function Simulator() {
  const containerRef = useRef(null);

  // Initializing state with default simulation parameters
  const [treeCover, setTreeCover] = useState(20);
  const [urbanArea, setUrbanArea] = useState(60);
  const [waterBodies, setWaterBodies] = useState(10);
  const [coolRoof, setCoolRoof] = useState(5);

  // GSAP Mount Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sim-node",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Core Simulation Math (Unchanged from your original logic)
  const result = useMemo(() => {
    const cooling = treeCover * 0.08 + waterBodies * 0.12 + coolRoof * 0.07;
    const heating = urbanArea * 0.05;
    const temperatureReduction = Math.max(0, (cooling - heating)).toFixed(2);

    let risk = "HIGH";
    let riskColor = "text-[#FF5500]"; // Orange/Red for High Risk

    if (temperatureReduction > 2.5) {
      risk = "LOW";
      riskColor = "text-[#00FF66]"; // Green for Low Risk
    } else if (temperatureReduction > 1.5) {
      risk = "MODERATE";
      riskColor = "text-[#FFB000]"; // Yellow for Moderate Risk
    }

    return {
      reduction: temperatureReduction,
      risk,
      riskColor,
      trees: Math.round(treeCover * 1500),
      carbon: Math.round(treeCover * 45)
    };
  }, [treeCover, urbanArea, waterBodies, coolRoof]);

  return (
    <div ref={containerRef} className="h-full w-full text-white space-y-8 pb-10">
      
      {/* Header */}
      <div className="sim-node border-b border-white/10 pb-6">
        <h1 className="font-[Rajdhani] text-4xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00F0FF] uppercase flex items-center gap-3">
          <SlidersHorizontal className="text-[#00F0FF]" size={36} />
          Digital Twin Simulator
        </h1>
        <p className="mt-2 text-sm font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Activity size={14} className="text-[#00FF66]" />
          Manipulate environmental variables to simulate climate mitigation strategies
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls Panel */}
        <div className="sim-node lg:col-span-7 bg-[#0B192C]/40 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none transition-opacity group-hover:bg-[#00F0FF]/10" />
          
          <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-4">
            <Terminal size={20} className="text-[#00F0FF]" />
            <h2 className="font-[Rajdhani] text-xl font-bold tracking-widest uppercase">
              Environmental Parameters
            </h2>
          </div>

          {/* Slider 1: Tree Cover */}
          <div className="bg-black/20 p-5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] shadow-inner">
                  <Trees size={20} />
                </div>
                <h2 className="font-[Rajdhani] text-lg font-bold tracking-wide uppercase">Tree Cover</h2>
              </div>
              <span className="font-mono text-xl font-bold text-[#00FF66]">{treeCover}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={treeCover}
              onChange={(e) => setTreeCover(Number(e.target.value))}
              className="w-full h-2 bg-[#040B16] rounded-lg appearance-none cursor-pointer accent-[#00FF66]"
            />
          </div>

          {/* Slider 2: Urban Area */}
          <div className="bg-black/20 p-5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] shadow-inner">
                  <Building2 size={20} />
                </div>
                <h2 className="font-[Rajdhani] text-lg font-bold tracking-wide uppercase">Urban Area</h2>
              </div>
              <span className="font-mono text-xl font-bold text-[#FF5500]">{urbanArea}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={urbanArea}
              onChange={(e) => setUrbanArea(Number(e.target.value))}
              className="w-full h-2 bg-[#040B16] rounded-lg appearance-none cursor-pointer accent-[#FF5500]"
            />
          </div>

          {/* Slider 3: Water Bodies */}
          <div className="bg-black/20 p-5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] shadow-inner">
                  <Droplets size={20} />
                </div>
                <h2 className="font-[Rajdhani] text-lg font-bold tracking-wide uppercase">Water Bodies</h2>
              </div>
              <span className="font-mono text-xl font-bold text-[#00F0FF]">{waterBodies}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={waterBodies}
              onChange={(e) => setWaterBodies(Number(e.target.value))}
              className="w-full h-2 bg-[#040B16] rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
            />
          </div>

          {/* Slider 4: Cool Roof Adoption */}
          <div className="bg-black/20 p-5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10 border border-white/30 text-white shadow-inner">
                  <Home size={20} />
                </div>
                <h2 className="font-[Rajdhani] text-lg font-bold tracking-wide uppercase">Cool Roof Adoption</h2>
              </div>
              <span className="font-mono text-xl font-bold text-white">{coolRoof}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={coolRoof}
              onChange={(e) => setCoolRoof(Number(e.target.value))}
              className="w-full h-2 bg-[#040B16] rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

        </div>

        {/* RIGHT COLUMN: Results Panel */}
        <div className="sim-node lg:col-span-5 space-y-6 flex flex-col">
          
          {/* Main Output Metric */}
          <div className="bg-[#0B192C]/60 backdrop-blur-lg border border-[#00F0FF]/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,240,255,0.05)] relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-[#00F0FF] animate-pulse" size={24} />
              <h2 className="font-[Rajdhani] text-xl font-bold uppercase tracking-widest text-white">
                Simulation Output
              </h2>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center mt-4">
              <div className="font-[Rajdhani] text-7xl font-black text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                -{result.reduction}°C
              </div>
              <p className="mt-4 font-mono text-xs tracking-widest text-[#00F0FF] uppercase border border-[#00F0FF]/30 bg-[#00F0FF]/10 px-3 py-1.5 rounded-full">
                Estimated Thermal Reduction
              </p>
            </div>
          </div>

          {/* Telemetry Breakdown */}
          <div className="bg-[#0B192C]/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-lg flex-1 flex flex-col justify-center">
            
            <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5 mb-3">
              <div className="flex items-center gap-3">
                <TrendingDown className="text-slate-400" size={18} />
                <span className="font-mono text-sm tracking-wider text-slate-300">HEAT RISK</span>
              </div>
              <strong className={`font-[Rajdhani] text-2xl font-bold tracking-widest ${result.riskColor}`}>
                {result.risk}
              </strong>
            </div>

            <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5 mb-3">
              <div className="flex items-center gap-3">
                <Trees className="text-slate-400" size={18} />
                <span className="font-mono text-sm tracking-wider text-slate-300">TREES REQUIRED</span>
              </div>
              <strong className="font-[Rajdhani] text-xl font-bold text-white">
                {result.trees}
              </strong>
            </div>

            <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <Activity className="text-slate-400" size={18} />
                <span className="font-mono text-sm tracking-wider text-slate-300">CARBON OFFSET</span>
              </div>
              <strong className="font-[Rajdhani] text-xl font-bold text-white">
                {result.carbon} <span className="text-sm text-slate-500">TONS/YR</span>
              </strong>
            </div>

          </div>

          {/* AI Terminal Recommendations */}
          <div className="bg-[#00FF66]/10 border border-[#00FF66]/30 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4 border-b border-[#00FF66]/20 pb-3">
              <ShieldCheck className="text-[#00FF66]" size={20} />
              <h2 className="font-[Rajdhani] text-lg font-bold tracking-widest uppercase text-white">
                Engine Directives
              </h2>
            </div>
            <ul className="space-y-3 font-mono text-xs text-slate-300 tracking-wider">
              <li className="flex gap-3 items-start hover:text-white transition-colors">
                <span className="text-[#00FF66]">{">"}</span> 
                Increase high-density afforestation across urban corridors.
              </li>
              <li className="flex gap-3 items-start hover:text-white transition-colors">
                <span className="text-[#00FF66]">{">"}</span> 
                Mandate high-albedo cool roof technology on industrial structures.
              </li>
              <li className="flex gap-3 items-start hover:text-white transition-colors">
                <span className="text-[#00FF66]">{">"}</span> 
                Restore and protect municipal reservoirs to increase evaporative cooling.
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}