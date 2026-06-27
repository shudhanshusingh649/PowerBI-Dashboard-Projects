import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function StatCard({ title, value, trend }) {
  // Smart trend parsing: For an urban heat platform, temperatures going down (-) 
  // is usually a positive outcome, while going up (+) is a risk.
  const isUp = trend?.includes("+");
  const isDown = trend?.includes("-");

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Subtle hover gradient to give it a premium, interactive feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {title}
        </h3>

        <div className="mt-3 flex items-end gap-3">
          <p className="text-4xl font-black tracking-tight text-slate-800">
            {value}
          </p>

          {/* Optional Trend Badge */}
          {trend && (
            <div
              className={`mb-1.5 flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-bold ${
                isDown
                  ? "bg-emerald-50 text-emerald-700" 
                  : isUp
                  ? "bg-rose-50 text-rose-700" 
                  : "bg-slate-50 text-slate-600"
              }`}
            >
              {isUp && <TrendingUp size={12} strokeWidth={3} />}
              {isDown && <TrendingDown size={12} strokeWidth={3} />}
              {!isUp && !isDown && <Minus size={12} strokeWidth={3} />}
              <span>{trend}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}