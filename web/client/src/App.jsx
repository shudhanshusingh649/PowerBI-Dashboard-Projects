import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Assistant from "./pages/Assistant";
import Prediction from "./pages/Prediction";
import Recommendations from "./pages/Recommendations";
import HeatMap from "./pages/HeatMap";
import Simulator from "./pages/Simulator";

const TechLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-[#040B16] text-[#00F0FF] font-[Rajdhani] text-2xl tracking-widest animate-pulse">
    INITIALIZING ISRO DIGITAL TWIN...
  </div>
);

function App() {
  return (
    <Suspense fallback={<TechLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="assistant" element={<Assistant />} />
          <Route path="prediction" element={<Prediction />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="heatmap" element={<HeatMap />} />
          <Route path="simulator" element={<Simulator />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;