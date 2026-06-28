import { ArrowUpRight } from "lucide-react";

export default function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  color,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg hover:-translate-y-2 transition-all duration-300">

      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center text-white`}>

        <Icon size={28} />

      </div>

      <p className="mt-6 text-slate-500">
        {title}
      </p>

      <h2 className="text-4xl font-black mt-2">
        {value}
        <span className="text-xl ml-1">
          {unit}
        </span>
      </h2>

      <div className="flex items-center gap-2 mt-4 text-green-600">

        <ArrowUpRight size={18} />

        AI Updated

      </div>

    </div>
  );
}