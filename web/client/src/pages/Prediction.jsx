import { useState } from "react";
import { 
  Cpu, 
  Leaf, 
  Users, 
  Building2, 
  Layers, 
  Thermometer, 
  AlertTriangle, 
  Activity, 
  Sparkles 
} from "lucide-react";
import api from "../services/api";

function Prediction() {
  const [formData, setFormData] = useState({
    ndvi: "",
    populationDensity: "",
    buildingDensity: "",
    imperviousSurface: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/predict", formData);
      setResult(response.data);
    } catch (predictError) {
      setError("Prediction service is unavailable right now. Is the FastAPI server running?");
    } finally {
      setLoading(false);
    }
  };

  // Helper to dynamically style the results based on risk level
  const getRiskStyles = (risk) => {
    switch (risk?.toLowerCase()) {
      case "high":
        return { color: "text-red-700", bg: "bg-red-50", border: "border-red-200", icon: "text-red-500" };
      case "medium":
        return { color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", icon: "text-orange-500" };
      case "low":
        return { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-500" };
      default:
        return { color: "text-slate-700", bg: "bg-slate-50", border: "border-slate-200", icon: "text-slate-500" };
    }
  };

  const riskStyle = getRiskStyles(result?.risk);

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-10 text-white shadow-xl shadow-slate-200/50">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Cpu size={20} className="text-indigo-400" />
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              AI Inference Engine
            </p>
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            Temperature Risk Predictor
          </h1>
          <p className="mt-2 max-w-2xl text-slate-300 text-sm leading-relaxed">
            Input localized land-cover metrics and density indicators to run our machine learning model. Estimate local heat stress and simulate intervention necessities.
          </p>
        </div>
      </section>

      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-800 shadow-sm">
          <AlertTriangle size={20} className="text-red-500" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Prediction Form */}
        <form onSubmit={handlePredict} className="rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles size={20} className="text-blue-500" />
            <h2 className="text-lg font-bold text-slate-800">Environment Variables</h2>
          </div>
          
          <div className="grid gap-5 md:grid-cols-2">
            {/* Input fields with embedded icons */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">NDVI (Vegetation)</span>
              <div className="relative">
                <Leaf size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                <input
                  required
                  type="number"
                  step="0.01"
                  min="-1"
                  max="1"
                  name="ndvi"
                  placeholder="e.g., 0.25"
                  value={formData.ndvi}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Population Density</span>
              <div className="relative">
                <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                <input
                  required
                  type="number"
                  name="populationDensity"
                  placeholder="e.g., 12000 per sq/km"
                  value={formData.populationDensity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Building Density (%)</span>
              <div className="relative">
                <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />
                <input
                  required
                  type="number"
                  min="0"
                  max="100"
                  name="buildingDensity"
                  placeholder="e.g., 85"
                  value={formData.buildingDensity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Impervious Surface (%)</span>
              <div className="relative">
                <Layers size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  required
                  type="number"
                  min="0"
                  max="100"
                  name="imperviousSurface"
                  placeholder="e.g., 74"
                  value={formData.imperviousSurface}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto md:px-8"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                Analyzing Data...
              </>
            ) : (
              <>
                <Cpu size={18} />
                Run ML Prediction
              </>
            )}
          </button>
        </form>

        {/* Results Panel */}
        <div className="flex flex-col rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center gap-2">
            <Activity size={20} className="text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-800">Model Output</h2>
          </div>

          {result ? (
            <div className="flex flex-1 flex-col space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              {/* Primary Temp Display */}
              <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 p-6 border border-slate-200">
                <Thermometer size={24} className="text-slate-400 mb-2" />
                <div className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">Estimated LST</div>
                <div className="flex items-start">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">{result.temperature}</span>
                  <span className="text-2xl font-bold text-slate-400 mt-1">°C</span>
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className={`rounded-2xl border p-4 ${riskStyle.bg} ${riskStyle.border}`}>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${riskStyle.color}`}>Risk Level</div>
                  <div className={`text-xl font-black ${riskStyle.color} flex items-center gap-2`}>
                    <AlertTriangle size={18} className={riskStyle.icon} />
                    {result.risk}
                  </div>
                </div>
                
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Risk Score</div>
                  <div className="text-xl font-black text-slate-800">
                    {result.score} <span className="text-sm font-medium text-slate-400">/ 100</span>
                  </div>
                </div>
              </div>

              {/* Summary Box */}
              <div className="mt-auto rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-2">Analysis Summary</h3>
                <p className="text-sm leading-relaxed text-blue-900/80">
                  {result.summary || "Based on the provided metrics, intervention is recommended to optimize thermal comfort in this sector."}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
              <Cpu size={40} className="mb-4 text-slate-300" />
              <h3 className="text-sm font-bold text-slate-700">Awaiting Input</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-[200px]">
                Enter variables and run the prediction to view localized heat telemetry.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prediction;