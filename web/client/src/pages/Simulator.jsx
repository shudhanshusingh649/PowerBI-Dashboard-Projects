import { useState } from "react";
import { 
  Sliders, 
  Thermometer, 
  Leaf, 
  TreePine, 
  ArrowRight, 
  Wind, 
  AlertTriangle, 
  Sparkles 
} from "lucide-react";
import api from "../services/api";

function Simulator() {
  const [currentTemp, setCurrentTemp] = useState("");
  const [currentCover, setCurrentCover] = useState("");
  const [futureCover, setFutureCover] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const simulate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/simulate", {
        currentTemp: Number(currentTemp),
        currentTreeCover: Number(currentCover),
        futureTreeCover: Number(futureCover),
      });

      setResult(response.data);
    } catch (simulationError) {
      setError("Simulation service is unavailable right now. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-10 text-white shadow-xl shadow-slate-200/50">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Sliders size={20} className="text-emerald-400" />
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Impact Simulator
            </p>
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            Urban Cooling Sandbox
          </h1>
          <p className="mt-2 max-w-2xl text-slate-300 text-sm leading-relaxed">
            Test how expanding tree cover and other interventions change projected temperatures before planning decisions are finalized.
          </p>
        </div>
      </section>

      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-800 shadow-sm">
          <AlertTriangle size={20} className="text-red-500" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        {/* Simulation Form */}
        <form onSubmit={simulate} className="rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles size={20} className="text-emerald-500" />
            <h2 className="text-lg font-bold text-slate-800">Configure Scenario</h2>
          </div>
          
          <div className="mt-5 space-y-6">
            {/* Current Temperature */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Baseline Temperature (°C)</span>
              <div className="relative">
                <Thermometer size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />
                <input
                  required
                  type="number"
                  step="0.1"
                  value={currentTemp}
                  onChange={(e) => setCurrentTemp(e.target.value)}
                  placeholder="e.g., 42.5"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </label>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Current Tree Cover */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Current Tree Cover (%)</span>
                <div className="relative">
                  <Leaf size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    required
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={currentCover}
                    onChange={(e) => setCurrentCover(e.target.value)}
                    placeholder="e.g., 10"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </label>

              {/* Future Tree Cover */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Target Tree Cover (%)</span>
                <div className="relative">
                  <TreePine size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                  <input
                    required
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={futureCover}
                    onChange={(e) => setFutureCover(e.target.value)}
                    placeholder="e.g., 25"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                Calculating Impact...
              </>
            ) : (
              <>
                <Wind size={18} />
                Simulate Cooling Impact
              </>
            )}
          </button>
        </form>

        {/* Results Panel */}
        <div className="flex flex-col rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center gap-2">
            <Wind size={20} className="text-emerald-500" />
            <h2 className="text-lg font-bold text-slate-800">Simulation Output</h2>
          </div>

          {result ? (
            <div className="flex flex-1 flex-col space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              
              {/* Before vs After Visualization */}
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <div className="text-center flex-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Baseline</div>
                  <div className="text-2xl font-black text-orange-500">{currentTemp}°C</div>
                </div>
                
                <div className="px-4 text-slate-300">
                  <ArrowRight size={24} />
                </div>
                
                <div className="text-center flex-1">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Projected</div>
                  <div className="text-2xl font-black text-emerald-600">{result.futureTemp}°C</div>
                </div>
              </div>

              {/* Primary Reduction Display */}
              <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 p-6">
                <div className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-1">Estimated Cooling Gain</div>
                <div className="flex items-start text-emerald-600">
                  <span className="text-5xl font-black tracking-tighter">-{result.reduction}</span>
                  <span className="text-2xl font-bold mt-1">°C</span>
                </div>
              </div>

              {/* Summary Note */}
              <div className="mt-auto rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Policy Impact Note</h3>
                <p className="text-sm leading-relaxed text-slate-700">
                  {result.note || `Increasing tree cover from ${currentCover}% to ${futureCover}% yields significant localized cooling, dropping ambient temperatures to an estimated ${result.futureTemp}°C.`}
                </p>
              </div>

            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
              <TreePine size={40} className="mb-4 text-slate-300" />
              <h3 className="text-sm font-bold text-slate-700">Awaiting Parameters</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-[240px]">
                Enter your baseline and target tree cover percentages to simulate temperature reductions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Simulator;