import { Leaf, Droplets, Home, Wind, Lightbulb, ArrowRight } from "lucide-react";

export default function RecommendationCard({ title, detail }) {
  // Smart icon mapper based on keywords in the title
  // This makes the UI feel highly dynamic and responsive to the ML backend
  const getCardStyle = (titleText) => {
    const text = titleText?.toLowerCase() || "";
    
    if (text.includes("tree") || text.includes("vegetation") || text.includes("green") || text.includes("park")) {
      return { icon: <Leaf size={24} />, bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" };
    }
    if (text.includes("water") || text.includes("fountain") || text.includes("lake")) {
      return { icon: <Droplets size={24} />, bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" };
    }
    if (text.includes("roof") || text.includes("surface") || text.includes("building") || text.includes("cool")) {
      return { icon: <Home size={24} />, bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100" };
    }
    if (text.includes("corridor") || text.includes("ventilation") || text.includes("wind")) {
      return { icon: <Wind size={24} />, bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-100" };
    }
    
    // Default fallback style for general recommendations
    return { icon: <Lightbulb size={24} />, bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100" };
  };

  const style = getCardStyle(title);

  return (
    <div className="group relative flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      
      {/* Dynamic Icon Area */}
      <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${style.bg} ${style.text} ${style.border} border`}>
        {style.icon}
      </div>

      {/* Text Content */}
      <div className="flex-1">
        <h3 className="mb-2 text-lg font-bold text-slate-800 leading-tight">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600">
          {detail}
        </p>
      </div>

      {/* Decorative Interactive Element */}
      <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors duration-300 group-hover:text-blue-600">
        Review Implementation
        <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}