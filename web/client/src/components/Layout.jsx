import { Outlet } from "react-router-dom";
import { useRef, useEffect } from "react";
import gsap from "gsap";
// You will import your Three.js components here later
// import { Canvas } from "@react-three/fiber";
// import Scene from "./Scene"; 

import Sidebar from "./Sidebar"; // Your navigation

const Layout = () => {
  const uiRef = useRef(null);

  // GSAP animation for page mount
  useEffect(() => {
    gsap.fromTo(
      uiRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#040B16]">
      
      {/* LAYER 1: The Persistent 3D Digital Twin Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* We will drop the React Three Fiber <Canvas> here later */}
        {/* <Canvas> <Scene /> </Canvas> */}
        
        {/* Placeholder gradient for now until we build the 3D part */}
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0B192C] to-[#040B16] opacity-80" />
      </div>

      {/* LAYER 2: The Glassmorphism UI & Navigation */}
      <div className="relative z-10 flex h-full w-full pointer-events-auto">
        
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Dynamic Page Content (Dashboard, HeatMap, etc.) */}
        <main 
          ref={uiRef} 
          className="flex-1 p-6 overflow-y-auto"
        >
          {/* Glass container wrapping all page content */}
          <div className="min-h-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 shadow-2xl">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default Layout;