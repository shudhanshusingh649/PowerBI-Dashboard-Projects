import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Brain,
  Satellite,
  CloudRain,
  ThermometerSun,
  ChevronRight
} from "lucide-react";

const features = [
  {
    title: "Thermal AI Prediction",
    desc: "XGBoost forecasting for max/min surface temperatures.",
    icon: ThermometerSun,
    color: "text-[#FF5500]",
    bg: "bg-[#FF5500]/10",
    border: "hover:border-[#FF5500]/50",
    shadow: "hover:shadow-[0_0_20px_rgba(255,85,0,0.15)]"
  },
  {
    title: "Rainfall Forecasting",
    desc: "Spatial precipitation mapping using IMD datasets.",
    icon: CloudRain,
    color: "text-[#00F0FF]",
    bg: "bg-[#00F0FF]/10",
    border: "hover:border-[#00F0FF]/50",
    shadow: "hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
  },
  {
    title: "Geospatial Twin",
    desc: "Interactive 3D rendering of India's climate topography.",
    icon: Satellite,
    color: "text-[#00FF66]",
    bg: "bg-[#00FF66]/10",
    border: "hover:border-[#00FF66]/50",
    shadow: "hover:shadow-[0_0_20px_rgba(0,255,102,0.15)]"
  },
  {
    title: "Neural Engine",
    desc: "Continuous learning loop optimizing predictive accuracy.",
    icon: Brain,
    color: "text-[#9D00FF]",
    bg: "bg-[#9D00FF]/10",
    border: "hover:border-[#9D00FF]/50",
    shadow: "hover:shadow-[0_0_20px_rgba(157,0,255,0.15)]"
  }
];

export default function Features() {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.8 // Delays slightly so the top of the dashboard loads first
      }
    );
  }, []);

  return (
    <div className="w-full rounded-2xl bg-black/20 p-6 backdrop-blur-sm border border-white/5">
      
      {/* Header */}
      <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="h-2 w-2 bg-[#00F0FF] rounded-full animate-pulse" />
        <h2 className="text-xl font-[Rajdhani] font-bold text-white tracking-widest uppercase">
          System Capabilities
        </h2>
      </div>

      {/* Feature Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#040B16]/50 p-5 transition-all duration-300 ${feature.border} ${feature.shadow}`}
            >
              {/* Background Glow on Hover */}
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-all group-hover:scale-150 group-hover:bg-white/10" />

              {/* Icon */}
              <div className={`mb-4 inline-flex rounded-lg p-3 ${feature.bg}`}>
                <Icon size={24} className={feature.color} />
              </div>

              {/* Text */}
              <h3 className="mb-2 font-[Rajdhani] text-lg font-bold text-white tracking-wide">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.desc}
              </p>

              {/* Arrow Indicator */}
              <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors group-hover:text-white">
                Initialize <ChevronRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}