import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ShieldAlert, ShieldCheck, Shield, Activity } from "lucide-react";

export default function ClimateScore({ score = 42 }) {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const numberRef = useRef(null);
  
  // Dynamic styling based on the AI score
  const getScoreData = (val) => {
    if (val >= 75) return { color: "#00FF66", text: "OPTIMAL", icon: ShieldCheck, status: "SYSTEM NOMINAL" };
    if (val >= 50) return { color: "#FFB000", text: "WARNING", icon: Shield, status: "ANOMALY DETECTED" };
    return { color: "#FF5500", text: "CRITICAL", icon: ShieldAlert, status: "SEVERE THERMAL STRESS" };
  };

  const { color, text, icon: Icon, status } = getScoreData(score);
  
  // SVG Circle Math for the Gauge
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the container fading in
      gsap.from(containerRef.current, {
        opacity: 0, scale: 0.95, duration: 0.6, ease: "power2.out", delay: 0.5
      });

      // 2. Animate the SVG ring filling up
      const targetOffset = circumference - (score / 100) * circumference;
      gsap.fromTo(circleRef.current,
        { strokeDashoffset: circumference },
        { strokeDashoffset: targetOffset, duration: 1.5, ease: "power3.out", delay: 0.8 }
      );

      // 3. Animate the number counting up
      gsap.fromTo(numberRef.current, 
        { innerHTML: 0 }, 
        { 
          innerHTML: score, 
          duration: 1.5, 
          ease: "power3.out", 
          delay: 0.8,
          snap: { innerHTML: 1 }, // Snaps to whole numbers during animation
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [score, circumference]);

  return (
    <div ref={containerRef} className="flex h-full flex-col justify-between rounded-xl bg-transparent p-6 relative overflow-hidden group">
      
      {/* Background Warning Glow (Only highly visible if critical) */}
      <div 
        className="absolute inset-0 opacity-10 transition-opacity duration-1000 group-hover:opacity-20"
        style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="flex items-center gap-2 font-[Rajdhani] text-lg font-bold tracking-widest text-white uppercase">
          <Icon size={18} style={{ color }} />
          Regional Stability
        </h2>
        <div className="flex items-center gap-1.5 rounded bg-black/40 px-2 py-1 border border-white/5">
          <Activity size={10} style={{ color }} className="animate-pulse" />
          <span className="font-mono text-[9px] tracking-widest text-slate-400">INDEX</span>
        </div>
      </div>

      {/* Main Circular Gauge */}
      <div className="relative z-10 flex flex-1 items-center justify-center py-6">
        <div className="relative flex items-center justify-center">
          
          {/* Background Track Circle */}
          <svg className="transform -rotate-90 w-40 h-40">
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-white/5"
            />
            {/* Animated Foreground Circle */}
            <circle
              ref={circleRef}
              cx="80"
              cy="80"
              r={radius}
              stroke={color}
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: circumference,
                filter: `drop-shadow(0 0 10px ${color}80)`
              }}
            />
          </svg>

          {/* Center Content */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span 
              ref={numberRef} 
              className="font-[Rajdhani] text-5xl font-black tracking-tighter text-white drop-shadow-md"
            >
              0
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase mt-1" style={{ color }}>
              {text}
            </span>
          </div>

        </div>
      </div>

      {/* Telemetry Footer Readout */}
      <div className="relative z-10 rounded-lg border border-white/5 bg-[#040B16]/60 p-3 backdrop-blur-sm">
        <div className="flex justify-between items-end mb-1">
          <span className="font-mono text-[10px] text-slate-500 tracking-wider">AI DIAGNOSIS</span>
          <span className="font-mono text-[10px] tracking-wider animate-pulse" style={{ color }}>
            {status}
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div 
            className="h-full rounded-full transition-all duration-1000" 
            style={{ width: `${score}%`, backgroundColor: color }} 
          />
        </div>
      </div>

    </div>
  );
}