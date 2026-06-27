import { Outlet, NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map, 
  ThermometerSun, 
  SlidersHorizontal, 
  BarChart3, 
  ShieldCheck 
} from "lucide-react";

const Layout = () => {
  const navItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Heat Map", path: "/heatmap", icon: <Map size={20} /> },
    { name: "AI Prediction", path: "/prediction", icon: <ThermometerSun size={20} /> },
    { name: "Simulator", path: "/simulator", icon: <SlidersHorizontal size={20} /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart3 size={20} /> },
    { name: "Recommendations", path: "/recommendations", icon: <ShieldCheck size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Urban<span className="text-blue-600">Heat</span> AI
          </h1>
          <p className="text-xs text-slate-500 mt-1">Intelligence Platform</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-medium shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Optional: User Profile or bottom branding area */}
        <div className="p-4 border-t border-slate-200 text-center text-xs text-slate-400">
          UHI Mitigation System v1.0
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* This Outlet is where your specific page components inject their content */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;