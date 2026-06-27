import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout Wrapper
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import HeatMap from "./pages/HeatMap";
import Prediction from "./pages/Prediction";
import Simulator from "./pages/Simulator";
import Analytics from "./pages/Analytics";
import Recommendations from "./pages/Recommendations";

function App() {
  return (
    <Routes>
      {/* The Layout component wraps all these nested routes */}
      <Route path="/" element={<Layout />}>
        {/* Default route (loads Dashboard on "/") */}
        <Route index element={<Dashboard />} />

        <Route path="heatmap" element={<HeatMap />} />
        <Route path="prediction" element={<Prediction />} />
        <Route path="simulator" element={<Simulator />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="recommendations" element={<Recommendations />} />
      </Route>
    </Routes>
  );
}

export default App;