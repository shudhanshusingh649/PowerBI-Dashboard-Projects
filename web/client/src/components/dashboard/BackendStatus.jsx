import { useEffect, useState } from "react";
import {
  Server,
  Cpu,
  Database,
  Activity,
  Wifi
} from "lucide-react";

import api from "../../services/api";

export default function BackendStatus() {
  const [health, setHealth] = useState({
    status: "INITIALIZING...",
    ping: null,
    models: {}
  });

  useEffect(() => {
    async function checkHealth() {
      const startTime = performance.now();

      try {
        const res = await api.get("/health");

        const latency = Math.round(performance.now() - startTime);

        setHealth({
          status: res.data.status,
          ping: latency,
          models: res.data.models_loaded
        });

      } catch (err) {
        setHealth({
          status: "OFFLINE",
          ping: null,
          models: {}
        });
      }
    }

    checkHealth();

    const interval = setInterval(checkHealth, 10000);

    return () => clearInterval(interval);

  }, []);

  const isOnline =
    health.status === "Healthy" ||
    health.status === "ONLINE";

  return (
    <div className="flex h-full flex-col justify-between rounded-xl p-6 bg-black/20">

      {/* Header with Live Ping */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="font-[Rajdhani] text-xl font-bold tracking-widest text-white flex items-center gap-2">
            <Server size={20} className="text-[#00F0FF]" />
            SYSTEM DIAGNOSTICS
          </h2>
          <p className="mt-1 text-xs font-mono tracking-wider text-slate-400">
            FASTAPI CONNECTION
          </p>
        </div>

        <div className={`flex flex-col items-end ${isOnline ? "text-[#00FF66]" : "text-[#FF5500]"}`}>
          <div className="flex items-center gap-2">
            <Wifi size={16} className={isOnline ? "animate-pulse" : "opacity-50"} />
            <span className="font-[Rajdhani] font-bold text-lg">{health.status}</span>
          </div>
          <span className="text-[10px] font-mono opacity-80">
            {health.ping ? `${health.ping}ms LATENCY` : "WAITING..."}
          </span>
        </div>
      </div>

      {/* 2x2 Grid of Micro-Services */}
      <div className="mt-4 grid grid-cols-2 gap-3">

        {/* Module 1: Core API */}
        <div className="group rounded-lg border border-white/10 bg-[#040B16]/50 p-3 transition-colors hover:border-[#00F0FF]/40">
          <div className="flex items-center justify-between mb-2">
            <Activity size={16} className="text-[#00F0FF]" />
            <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? 'bg-[#00FF66] shadow-[0_0_5px_#00FF66]' : 'bg-red-500'} animate-pulse`} />
          </div>
          <p className="text-[10px] text-slate-400 font-mono">UPLINK</p>
          <p className="font-[Rajdhani] font-semibold text-white">API Gateway</p>
        </div>

        {/* Module 2: Rain Model */}
        <div className="group rounded-lg border border-white/10 bg-[#040B16]/50 p-3 transition-colors hover:border-[#00F0FF]/40">
          <div className="flex items-center justify-between mb-2">
            <Cpu size={16} className="text-[#00FF66]" />
            <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? 'bg-[#00FF66] shadow-[0_0_5px_#00FF66]' : 'bg-red-500'}`} />
          </div>
          <p className="text-[10px] text-slate-400 font-mono">XGBOOST.01</p>
          <p className="font-[Rajdhani] font-semibold text-white">Rainfall AI</p>
        </div>

        {/* Module 3: Temp Model */}
        <div className="group rounded-lg border border-white/10 bg-[#040B16]/50 p-3 transition-colors hover:border-[#FF5500]/40">
          <div className="flex items-center justify-between mb-2">
            <Cpu size={16} className="text-[#FF5500]" />
            <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? 'bg-[#00FF66] shadow-[0_0_5px_#00FF66]' : 'bg-red-500'}`} />
          </div>
          <p className="text-[10px] text-slate-400 font-mono">XGBOOST.02</p>
          <p className="font-[Rajdhani] font-semibold text-white">Thermal AI</p>
        </div>

        {/* Module 4: Database */}
        <div className="group rounded-lg border border-white/10 bg-[#040B16]/50 p-3 transition-colors hover:border-[#9D00FF]/40">
          <div className="flex items-center justify-between mb-2">
            <Database size={16} className="text-[#9D00FF]" />
            <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? 'bg-[#00FF66] shadow-[0_0_5px_#00FF66]' : 'bg-red-500'}`} />
          </div>
          <p className="text-[10px] text-slate-400 font-mono">DATASTORE</p>
          <p className="font-[Rajdhani] font-semibold text-white">IMD Engine</p>
        </div>

      </div>
    </div>
  );
}