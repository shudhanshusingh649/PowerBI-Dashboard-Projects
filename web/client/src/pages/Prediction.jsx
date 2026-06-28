import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  MapPin,
  Calendar,
  CloudRain,
  ThermometerSun,
  Loader2,
  Sparkles,
  Cpu,
  Activity,
  Terminal,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import CitySearch from "../components/CitySearch";
// import { predictAll } from "../services/climateApi";

export default function Prediction() {
  const containerRef = useRef(null);
  const resultRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // Initializing with local telemetry data
  const [form, setForm] = useState({
    Latitude: 25.5941,
    Longitude: 85.1376,
    Date: "2026-06-28",
    Max_Temperature: 38.5,
    Min_Temperature: 28.2,
    Rainfall: 12.5,
  });

  // Mount Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".predict-node",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Result Animation Trigger
  useEffect(() => {
    if (result && resultRef.current) {
      gsap.fromTo(
        resultRef.current.children,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" }
      );
    }
  }, [result]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // KEEP YOUR REAL API CALL:
      // const response = await predictAll(form);
      // setResult(response.data);

      // MOCK DELAY FOR UI TESTING:
      setTimeout(() => {
        setResult({
          Predicted_Rainfall_Next_Day: 18.2,
          Predicted_Max_Temperature_Next_Day: 39.1,
          Predicted_Min_Temperature_Next_Day: 27.5
        });
        toast.success("XGBoost Inference Complete", {
          style: { background: '#040B16', color: '#00F0FF', border: '1px solid #00F0FF' }
        });
        setLoading(false);
      }, 1500);

    } catch (err) {
      console.error(err);
      setError("UPLINK FAILED: Unable to connect with FastAPI Server.");
      toast.error("Prediction sequence aborted", {
        style: { background: '#FF5500', color: '#fff' }
      });
      setLoading(false);
    }
  };

  // Custom styling for form inputs
  const inputClassName = "w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white font-mono text-sm focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all outline-none";

  return (
    <div ref={containerRef} className="h-full w-full text-white space-y-8">

      {/* Page Header */}
      <div className="predict-node border-b border-white/10 pb-6">
        <h1 className="font-[Rajdhani] text-4xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00F0FF] uppercase flex items-center gap-3">
          <Cpu className="text-[#00F0FF]" size={36} />
          AI Prediction Engine
        </h1>
        <p className="mt-2 text-sm font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Activity size={14} className="text-[#00FF66]" />
          Configure parameters for spatial forecasting
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 pb-10">

        {/* LEFT COLUMN: Input Form */}
        <form
          onSubmit={handleSubmit}
          className="predict-node lg:col-span-5 rounded-2xl bg-[#0B192C]/40 backdrop-blur-md border border-white/10 p-6 shadow-2xl space-y-6 relative overflow-hidden group"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none transition-opacity group-hover:bg-[#00F0FF]/10" />

          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
            <Terminal size={20} className="text-[#00F0FF]" />
            <h2 className="font-[Rajdhani] text-xl font-bold tracking-widest uppercase">
              Input Parameters
            </h2>
          </div>

          {/* Location Inputs */}
          <div className="space-y-4 bg-black/20 p-4 rounded-xl border border-white/5">
            <div>
              <label className="font-mono text-xs tracking-wider text-slate-400 mb-1 block">TARGET NODE</label>
              <CitySearch
                onSelect={(city) => {
                  setForm({ ...form, Latitude: city.lat, Longitude: city.lng });
                  toast.success(`Coordinates locked to ${city.name}`, { style: { background: '#040B16', color: '#00FF66' }});
                }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] tracking-wider text-slate-500 mb-1 block">LATITUDE</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3.5 text-[#00F0FF]" />
                  <input type="number" step="0.0001" name="Latitude" value={form.Latitude} onChange={handleChange} className={inputClassName} />
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-wider text-slate-500 mb-1 block">LONGITUDE</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3.5 text-[#00F0FF]" />
                  <input type="number" step="0.0001" name="Longitude" value={form.Longitude} onChange={handleChange} className={inputClassName} />
                </div>
              </div>
            </div>
          </div>

          {/* Temporal Input */}
          <div>
            <label className="font-mono text-[10px] tracking-wider text-slate-500 mb-1 block">TEMPORAL TARGET (DATE)</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-3.5 text-[#9D00FF]" />
              <input type="date" name="Date" value={form.Date} onChange={handleChange} className={inputClassName} style={{ colorScheme: 'dark' }} />
            </div>
          </div>

          {/* Meteorological Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[10px] tracking-wider text-slate-500 mb-1 block">MAX TEMP (°C)</label>
              <div className="relative">
                <ThermometerSun size={16} className="absolute left-3 top-3.5 text-[#FF5500]" />
                <input type="number" step="0.1" name="Max_Temperature" value={form.Max_Temperature} onChange={handleChange} className={inputClassName} />
              </div>
            </div>
            <div>
              <label className="font-mono text-[10px] tracking-wider text-slate-500 mb-1 block">MIN TEMP (°C)</label>
              <div className="relative">
                <ThermometerSun size={16} className="absolute left-3 top-3.5 text-[#00F0FF]" />
                <input type="number" step="0.1" name="Min_Temperature" value={form.Min_Temperature} onChange={handleChange} className={inputClassName} />
              </div>
            </div>
          </div>

          <div>
            <label className="font-mono text-[10px] tracking-wider text-slate-500 mb-1 block">CURRENT PRECIPITATION (mm)</label>
            <div className="relative">
              <CloudRain size={16} className="absolute left-3 top-3.5 text-[#00FF66]" />
              <input type="number" step="0.1" name="Rainfall" value={form.Rainfall} onChange={handleChange} className={inputClassName} />
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-[#FF5500]/30 bg-[#FF5500]/10 p-3 font-mono text-xs text-[#FF5500]">
              [ERROR] {error}
            </div>
          )}

          <button
            disabled={loading}
            className="group relative w-full overflow-hidden rounded-xl bg-[#00F0FF] py-4 font-[Rajdhani] font-bold text-black text-lg transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] disabled:opacity-70 disabled:hover:bg-[#00F0FF] disabled:hover:shadow-none flex justify-center items-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                PROCESSING TENSORS...
              </>
            ) : (
              <>
                <Sparkles size={20} className="transition-transform group-hover:scale-125" />
                EXECUTE PREDICTION
              </>
            )}
          </button>
        </form>


        {/* RIGHT COLUMN: Output Terminal */}
        <div className="predict-node lg:col-span-7 flex flex-col h-full space-y-6">
          <div className="flex-1 bg-[#0B192C]/60 backdrop-blur-lg border border-[#00F0FF]/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,240,255,0.05)] relative overflow-hidden flex flex-col">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
              <h2 className="font-[Rajdhani] text-2xl font-bold text-white uppercase tracking-widest">
                Engine Output
              </h2>
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${result ? 'bg-[#00FF66]' : 'bg-slate-600'} animate-pulse`} />
                <span className="font-mono text-xs text-slate-400">
                  {result ? 'DATALINK ESTABLISHED' : 'AWAITING INPUT'}
                </span>
              </div>
            </div>

            {!result ? (
              // Empty State - High Tech Radar Look
              <div className="flex-1 flex flex-col items-center justify-center opacity-50">
                <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                  <div className="absolute inset-0 rounded-full border border-[#00F0FF]/20 border-dashed animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-[#00F0FF]/40 border-dashed animate-[spin_7s_linear_infinite_reverse]" />
                  <Cpu size={40} className="text-[#00F0FF]" />
                </div>
                <h3 className="font-[Rajdhani] text-xl font-bold tracking-widest text-slate-300 uppercase">System Standby</h3>
                <p className="font-mono text-xs text-slate-500 mt-2 max-w-xs text-center leading-relaxed">
                  Provide geospatial and temporal parameters to initiate the XGBoost prediction sequence.
                </p>
              </div>
            ) : (
              // Results View
              <div ref={resultRef} className="flex-1 flex flex-col gap-4">
                
                {/* Result Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Rain Card */}
                  <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-xl p-4 flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-[#00F0FF] mb-4">
                      <CloudRain size={20} />
                      <span className="font-mono text-xs tracking-wider">PRECIP</span>
                    </div>
                    <div>
                      <h2 className="font-[Rajdhani] text-4xl font-bold text-white">{result.Predicted_Rainfall_Next_Day} <span className="text-xl text-slate-400">mm</span></h2>
                    </div>
                  </div>

                  {/* Max Temp Card */}
                  <div className="bg-[#FF5500]/10 border border-[#FF5500]/30 rounded-xl p-4 flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-[#FF5500] mb-4">
                      <ThermometerSun size={20} />
                      <span className="font-mono text-xs tracking-wider">T-MAX</span>
                    </div>
                    <div>
                      <h2 className="font-[Rajdhani] text-4xl font-bold text-white">{result.Predicted_Max_Temperature_Next_Day} <span className="text-xl text-slate-400">°C</span></h2>
                    </div>
                  </div>

                  {/* Min Temp Card */}
                  <div className="bg-[#00FF66]/10 border border-[#00FF66]/30 rounded-xl p-4 flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-[#00FF66] mb-4">
                      <ThermometerSun size={20} />
                      <span className="font-mono text-xs tracking-wider">T-MIN</span>
                    </div>
                    <div>
                      <h2 className="font-[Rajdhani] text-4xl font-bold text-white">{result.Predicted_Min_Temperature_Next_Day} <span className="text-xl text-slate-400">°C</span></h2>
                    </div>
                  </div>
                </div>

                {/* Next Steps Panel */}
                <div className="mt-auto bg-black/40 border border-white/10 rounded-xl p-5 flex items-center justify-between group">
                  <div>
                    <h3 className="font-[Rajdhani] text-lg font-bold text-white uppercase tracking-wider">Actionable Intelligence</h3>
                    <p className="font-mono text-xs text-slate-400 mt-1">Review AI-generated mitigation strategies based on current forecast.</p>
                  </div>
                  <Link
                    to="/recommendations"
                    className="flex items-center justify-center h-12 w-12 rounded-lg bg-white/5 border border-white/10 text-white transition-all group-hover:bg-[#00F0FF] group-hover:text-black group-hover:border-[#00F0FF]"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}