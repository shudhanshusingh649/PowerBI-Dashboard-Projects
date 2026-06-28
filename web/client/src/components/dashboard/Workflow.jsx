import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  MapPin,
  Cpu,
  Brain,
  CloudRain,
  Activity
} from "lucide-react";

// Enhanced descriptions to sound like a true hackathon-winning AI pipeline
const steps = [
  {
    title: "Data Ingestion",
    desc: "Fetching IMD geospatial data & coordinates.",
    icon: MapPin,
    color: "text-[#00F0FF]",
    bg: "bg-[#00F0FF]/10",
    border: "border-[#00F0FF]/30",
  },
  {
    title: "Feature Engineering",
    desc: "Normalizing variables for XGBoost input tensors.",
    icon: Cpu,
    color: "text-[#00FF66]",
    bg: "bg-[#00FF66]/10",
    border: "border-[#00FF66]/30",
  },
  {
    title: "AI Inferencing",
    desc: "Executing predictive models on national datasets.",
    icon: Brain,
    color: "text-[#9D00FF]",
    bg: "bg-[#9D00FF]/10",
    border: "border-[#9D00FF]/30",
  },
  {
    title: "Twin Synchronization",
    desc: "Rendering thermal & rainfall forecasts to 3D map.",
    icon: CloudRain,
    color: "text-[#FF5500]",
    bg: "bg-[#FF5500]/10",
    border: "border-[#FF5500]/30",
  },
];

export default function Workflow() {
  const containerRef = useRef(null);
  const stepsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the glowing pipeline line drawing itself downwards
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: "power3.inOut", transformOrigin: "top" }
      );

      // 2. Stagger the steps sliding in as the line hits them
      gsap.fromTo(
        stepsRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.3, ease: "back.out(1.7)", delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex h-full flex-col justify-between rounded-xl bg-black/20 p-6">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="flex items-center gap-2 font-[Rajdhani] text-xl font-bold tracking-widest text-white uppercase">
            <Activity size={20} className="text-[#00F0FF]" />
            Data Pipeline
          </h2>
          <p className="mt-1 text-[10px] font-mono tracking-wider text-slate-400">
            SEQUENCE: RUNNING
          </p>
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00FF66]/20">
          <div className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative flex-1 py-2">
        
        {/* The Animated Connecting Line */}
        <div className="absolute bottom-0 left-6 top-0 w-[2px] bg-white/10">
          <div 
            ref={lineRef}
            className="h-full w-full bg-gradient-to-b from-[#00F0FF] via-[#00FF66] to-[#FF5500]"
          />
        </div>

        {/* The Steps */}
        <div className="flex flex-col gap-6 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                ref={(el) => (stepsRef.current[index] = el)}
                className="group flex items-start gap-4"
              >
                {/* Node Icon */}
                <div className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${step.border} ${step.bg} transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                  <Icon size={20} className={step.color} />
                  {/* Subtle glowing dot indicator on the left of the box */}
                  <div className={`absolute -left-[1.35rem] h-2 w-2 rounded-full ${step.bg.replace('/10', '')} shadow-[0_0_8px_currentColor] ${step.color}`} />
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center pt-1">
                  <h3 className="font-[Rajdhani] text-lg font-bold tracking-wide text-white group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5 max-w-[200px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}