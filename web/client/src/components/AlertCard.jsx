import { AlertTriangle, MapPin, Thermometer, Users, ChevronRight } from "lucide-react";

export default function AlertCard({ zone, risk, temperature, population }) {
  // Dynamic styling makes the component reusable, defaulting to critical/red for High risk.
  const isHighRisk = risk?.toLowerCase() === "high";

  return (
    <div className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
      isHighRisk 
        ? "border-red-200 bg-red-50 hover:border-red-300" 
        : "border-orange-200 bg-orange-50 hover:border-orange-300"
    }`}>
      {/* Structural Accent: Left colored warning stripe */}
      <div className={`absolute left-0 top-0 h-full w-1.5 ${isHighRisk ? "bg-red-500" : "bg-orange-500"}`} />

      <div className="flex items-start justify-between gap-4 pl-2">
        <div className="flex items-start gap-3">
          {/* Icon Badge */}
          <div className={`mt-0.5 flex rounded-full p-2 ${isHighRisk ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"}`}>
            <AlertTriangle size={18} strokeWidth={2.5} />
          </div>
          <div>
            <p className={`text-xs font-bold uppercase tracking-wider ${isHighRisk ? "text-red-700" : "text-orange-700"}`}>
              {risk} Risk Alert
            </p>
            <h4 className="mt-1 flex items-center gap-1.5 text-lg font-black text-slate-900">
              <MapPin size={16} className="text-slate-400" />
              {zone}
            </h4>
          </div>
        </div>
        
        {/* Pulse Indicator & Badge */}
        <div className="relative flex items-center">
          {isHighRisk && (
            <span className="absolute -left-1.5 -top-1.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
            </span>
          )}
          <span className={`rounded-lg px-2.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-sm ${
            isHighRisk ? "bg-red-600" : "bg-orange-500"
          }`}>
            Action Req
          </span>
        </div>
      </div>

      {/* Metrics Area */}
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 pl-2">
        {/* Temp Metric */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-slate-500">
            <Thermometer size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Peak Temp</p>
            <p className="text-sm font-black text-slate-800">{temperature}°C</p>
          </div>
        </div>

        {/* Population Metric */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-slate-500">
            <Users size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Affected Pop</p>
            <p className="text-sm font-black text-slate-800">{Number(population).toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      {/* Actionable hover hint (appears when hovering over the card) */}
      <div className="mt-4 flex items-center justify-end gap-1 text-xs font-bold text-red-600 opacity-0 transition-opacity group-hover:opacity-100 pl-2">
        Review Mitigation <ChevronRight size={14} />
      </div>
    </div>
  );
}