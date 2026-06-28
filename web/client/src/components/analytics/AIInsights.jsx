import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Terminal, BrainCircuit, TriangleAlert, Info, Zap } from "lucide-react";

// Upgraded Data Structure: Simulates real AI engine outputs
const insights = [
  {
    id: "LOG_01",
    type: "CRITICAL",
    icon: TriangleAlert,
    color: "text-[#FF5500]",
    bg: "bg-[#FF5500]/10",
    border: "border-[#FF5500]/30",
    confidence: "98.4%",
    text: "Sustained thermal anomaly detected. Surface temperatures projected to exceed 42.5°C over the next 48 hours in the central grid.",
  },
  {
    id: "LOG_02",
    type: "PREDICTION",
    icon: Zap,
    color: "text-[#00F0FF]",
    bg: "bg-[#00F0FF]/10",
    border: "border-[#00F0FF]/30",
    confidence: "94.1%",
    text: "Precipitation probability dropping to 0%. Severe soil moisture depletion expected in surrounding agricultural perimeters.",
  },
  {
    id: "LOG_03",
    type: "ACTIONABLE",
    icon: Info,
    color: "text-[#00FF66]",
    bg: "bg-[#00FF66]/10",
    border: "border-[#00FF66]/30",
    confidence: "89.7%",
    text: "Initiate emergency heatwave protocols. Recommend immediate deployment of cool-roof countermeasures in dense urban sectors.",
  }
];

export default function AIInsights() {
  const containerRef = useRef(null);
  const logsRef = useRef([]);
  const [time, setTime] = useState("");

  // Set initial time for the logs
  useEffect(() => {
    const now = new Date();
    setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Terminal slide-up effect for each log entry
      gsap.fromTo(
        logsRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.3, ease: "power2.out", delay: 1.2 } // Delayed to run after the main charts load
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex h-full w-full flex-col rounded-xl bg-transparent p-6">
      
      {/* Terminal Header */}
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <Terminal size={20} className="text-[#9D00FF]" />
          <h2 className="font-[Rajdhani] text-xl font-bold tracking-widest text-white uppercase flex items-center gap-2">
            Neural Engine Readout
            <span className="h-4 w-2 bg-[#9D00FF] animate-[pulse_1s_step-end_infinite]" /> {/* Blinking Cursor */}
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded bg-black/40 px-3 py-1 border border-white/5">
          <BrainCircuit size={14} className="text-[#9D00FF] animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-slate-400">
            XGBOOST CORE ONLINE
          </span>
        </div>
      </div>

      {/* Terminal Console Output */}
      <div className="flex flex-col gap-3 font-mono">
        {insights.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              ref={(el) => (logsRef.current[index] = el)}
              className={`group flex items-start gap-4 rounded-lg border border-transparent bg-black/40 p-4 transition-all hover:border-white/10 hover:bg-[#040B16]`}
            >
              {/* Type Indicator */}
              <div className={`mt-0.5 flex items-center justify-center rounded p-1.5 ${item.bg} ${item.color}`}>
                <Icon size={16} />
              </div>

              {/* Log Content */}
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-3 text-xs tracking-wider opacity-80">
                  <span className="text-slate-500">[{time}]</span>
                  <span className={`${item.color} font-bold`}>[ {item.type} ]</span>
                  <span className="text-[#9D00FF]">CONFIDENCE: {item.confidence}</span>
                  <span className="text-slate-600 hidden md:inline">ID: {item.id}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-300 group-hover:text-white transition-colors">
                  <span className="text-slate-500 mr-2">{">"}</span>
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}