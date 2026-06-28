import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere } from "@react-three/drei";
import gsap from "gsap";
import { Cpu, Database, Globe2, Activity } from "lucide-react";

// --- 1. THE 3D ENGINE ---
// Transitioning from 2D canvas mechanics to a 3D scene requires a continuous animation loop.
// The useFrame hook acts exactly like your standard requestAnimationFrame loop in game development.
const HologramGlobe = () => {
  const globeRef = useRef(null);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      // Rotate the globe slowly over time
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      globeRef.current.rotation.x = 0.2; // Slight tilt
    }
  });

  return (
    <group ref={globeRef}>
      {/* Outer Glowing Wireframe */}
      <Sphere args={[2.2, 64, 64]}>
        <meshBasicMaterial 
          color="#00F0FF" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Sphere>
      {/* Inner Solid Core to block background stars from shining through */}
      <Sphere args={[2.18, 32, 32]}>
        <meshBasicMaterial color="#040B16" />
      </Sphere>
    </group>
  );
};


// --- 2. THE UI COMPONENT ---
const telemetryData = [
  { title: "AI Models", value: "03", icon: Cpu, color: "text-[#9D00FF]", bg: "bg-[#9D00FF]/10", border: "border-[#9D00FF]/30" },
  { title: "Parameters", value: "21", icon: Database, color: "text-[#00FF66]", bg: "bg-[#00FF66]/10", border: "border-[#00FF66]/30" },
  { title: "Coverage", value: "IND", icon: Globe2, color: "text-[#FF5500]", bg: "bg-[#FF5500]/10", border: "border-[#FF5500]/30" },
  { title: "System", value: "ON", icon: Activity, color: "text-[#00F0FF]", bg: "bg-[#00F0FF]/10", border: "border-[#00F0FF]/30" }
];

export default function ClimateOverview() {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animate the telemetry cards floating in over the 3D map
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)", delay: 0.5 }
    );
  }, []);

  return (
    <div className="relative w-full h-full min-h-[450px] overflow-hidden rounded-xl">
      
      {/* BACKGROUND: 3D Render Canvas */}
      <div className="absolute inset-0 z-0 bg-[#02060D]">
        <Canvas camera={{ position: [0, 0, 5.5], fov: 60 }}>
          {/* Controls to let the judges drag and zoom the globe */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
          />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <HologramGlobe />
        </Canvas>
      </div>

      {/* FOREGROUND: Glassmorphism UI Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col justify-between">
        
        {/* Top Header Overlay */}
        <div className="flex justify-between items-start w-full">
          <div>
            <h2 className="font-[Rajdhani] text-2xl font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
              GEOSPATIAL TWIN
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
              <span className="text-xs text-[#00FF66] font-mono tracking-wider drop-shadow-md">LIVE RENDER</span>
            </div>
          </div>
        </div>

        {/* Bottom Telemetry Cards Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto">
          {telemetryData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`flex items-center gap-4 rounded-lg border ${stat.border} bg-black/40 backdrop-blur-md p-3 transition-colors hover:bg-white/5 cursor-default shadow-lg`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-md ${stat.bg} ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    {stat.title}
                  </p>
                  <h3 className={`text-xl font-[Rajdhani] font-bold ${stat.color}`}>
                    {stat.value}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Corner UI Accents (The "Targeting Reticle" look) */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00F0FF]/50 rounded-tl-xl m-4 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00F0FF]/50 rounded-tr-xl m-4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00F0FF]/50 rounded-bl-xl m-4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00F0FF]/50 rounded-br-xl m-4 pointer-events-none" />

    </div>
  );
}