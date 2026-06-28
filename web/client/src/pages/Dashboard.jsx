import { useEffect, useRef } from "react";
import gsap from "gsap";

import Hero from "../components/dashboard/Hero";
import ClimateOverview from "../components/dashboard/ClimateOverview";
import BackendStatus from "../components/dashboard/BackendStatus";
import Workflow from "../components/dashboard/Workflow";
import TemperatureTrend from "../components/dashboard/TemperatureTrend";
import Features from "../components/dashboard/Features";

export default function Dashboard() {
  const containerRef = useRef(null);

  useEffect(() => {
    // gsap.context is highly recommended in React to easily clean up animations when the component unmounts
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dashboard-widget",
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full text-white">
      {/* 
        Bento Box Layout using CSS Grid. 
        On mobile, it stacks (grid-cols-1). 
        On large screens, it splits into 12 columns for precise control.
      */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pb-10">
        
        {/* TOP ROW: Welcome & Telemetry */}
        <div className="dashboard-widget xl:col-span-8 rounded-2xl bg-[#0B192C]/40 backdrop-blur-md border border-white/10 p-1 shadow-lg">
          <Hero />
        </div>
        <div className="dashboard-widget xl:col-span-4 rounded-2xl bg-[#0B192C]/40 backdrop-blur-md border border-white/10 p-1 shadow-lg">
          <BackendStatus />
        </div>

        {/* MIDDLE ROW: The Core Digital Twin Data / Map Engine */}
        <div className="dashboard-widget xl:col-span-12 rounded-2xl bg-[#0B192C]/60 backdrop-blur-lg border border-[#00F0FF]/30 p-1 shadow-[0_0_30px_rgba(0,240,255,0.05)] h-auto xl:h-[450px]">
          {/* This container is highlighted with cyan borders. It should hold your 3D Map or primary AI outputs. */}
          <ClimateOverview />
        </div>

        {/* BOTTOM ROW: Analytics & AI Processing */}
        <div className="dashboard-widget xl:col-span-7 rounded-2xl bg-[#0B192C]/40 backdrop-blur-md border border-white/10 p-1 shadow-lg">
          <TemperatureTrend />
        </div>
        <div className="dashboard-widget xl:col-span-5 rounded-2xl bg-[#0B192C]/40 backdrop-blur-md border border-white/10 p-1 shadow-lg">
          <Workflow />
        </div>

        {/* FOOTER: Additional Tools */}
        <div className="dashboard-widget xl:col-span-12 mt-2">
          <Features />
        </div>

      </div>
    </div>
  );
}