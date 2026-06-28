import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Assistant from "./pages/Assistant";
import Prediction from "./pages/Prediction";
import Recommendations from "./pages/Recommendations";
import HeatMap from "./pages/HeatMap";
import Simulator from "./pages/Simulator";

function App() {
  return (
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
  );
}

export default App;