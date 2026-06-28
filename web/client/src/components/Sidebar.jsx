import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import {
  LayoutDashboard,
  ChartColumn,
  Brain,
  Map,
  Satellite,
  MessageSquareText,
  Sparkles,
  Activity
} from "lucide-react";

const menus = [
  { title: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
  { title: "Analytics", path: "/analytics", icon: <ChartColumn size={20} /> },
  { title: "Prediction", path: "/prediction", icon: <Brain size={20} /> },
  { title: "Heat Map", path: "/heatmap", icon: <Map size={20} /> },
  { title: "Recommendations", path: "/recommendations", icon: <Sparkles size={20} /> },
  { title: "Assistant", path: "/assistant", icon: <MessageSquareText size={20} /> },
  { title: "Digital Twin", path: "/simulator", icon: <Satellite size={20} /> }
];

export default function Sidebar() {
  const sidebarRef = useRef(null);
  const menuItemsRef = useRef([]);

  // GSAP Staggered Animation on Mount
  useEffect(() => {
    gsap.fromTo(
      menuItemsRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    // Glassmorphism wrapper with a subtle border to separate it from the 3D map
    <aside 
      ref={sidebarRef}
      className="w-72 h-full bg-[#040B16]/60 backdrop-blur-xl border-r border-white/10 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)]"
    >
      {/* Header section with glowing text */}
      <div className="p-8 border-b border-white/10">
        <h1 className="text-3xl font-[Rajdhani] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00F0FF] tracking-wider flex items-center gap-2">
          <Activity size={28} className="text-[#00F0FF]" />
          CLIMATETWIN
        </h1>
        <p className="text-slate-400 font-[Rajdhani] text-sm tracking-[0.2em] mt-2 uppercase">
          AI Digital Twin
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
        {menus.map((menu, index) => (
          <NavLink
            key={menu.title}
            to={menu.path}
            ref={(el) => (menuItemsRef.current[index] = el)}
            className={({ isActive }) =>
              `group relative flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 overflow-hidden font-medium ${
                isActive
                  ? "text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`
            }
          >
            {/* Active state glowing indicator bar */}
            {({ isActive }) => (
              <>
                <div 
                  className={`absolute left-0 top-0 h-full w-1 bg-[#00F0FF] transition-transform duration-300 ${
                    isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50"
                  }`} 
                />
                <span className={`relative z-10 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                  {menu.icon}
                </span>
                <span className="relative z-10 font-[Rajdhani] text-lg tracking-wide">
                  {menu.title}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Server Status Footer */}
      <div className="p-6 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-2 text-[#00FF66] font-[Rajdhani] tracking-widest text-sm uppercase">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF66] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF66]"></span>
          </span>
          Uplink Active
        </div>
        <div className="text-xs text-slate-500 font-mono mt-2 flex justify-between">
          <span>FastAPI</span>
          <span>XGBoost</span>
        </div>
      </div>
    </aside>
  );
}