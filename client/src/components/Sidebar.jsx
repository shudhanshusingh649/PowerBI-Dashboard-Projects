import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-5 fixed">
      <h1 className="text-2xl font-bold mb-8">
        Urban Heat AI
      </h1>

      <div className="flex flex-col gap-4">

        <Link to="/">
          Dashboard
        </Link>

        <Link to="/heatmap">
          Heat Map
        </Link>

        <Link to="/prediction">
          Prediction
        </Link>

        <Link to="/simulator">
          Simulator
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;