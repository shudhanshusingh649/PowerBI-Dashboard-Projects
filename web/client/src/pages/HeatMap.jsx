import { useState, useEffect, useRef } from "react";
// 🚨 CRITICAL FIX: This CSS import prevents the map from looking broken/grey 🚨
import "leaflet/dist/leaflet.css"; 
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import gsap from "gsap";
import {
  MapPin,
  Brain,
  CloudRain,
  ThermometerSun,
  Target,
  Activity,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// import { predictAll } from "../services/climateApi";

// Fix for default marker icon issues in Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// High-Tech Custom Target Icon for the Hackathon Vibe
const customTargetIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `<div style="position: relative; width: 24px; height: 24px;">
          <div style="position: absolute; inset: 0; border: 2px solid #00F0FF; border-radius: 50%; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; inset: 6px; background-color: #00F0FF; border-radius: 50%; box-shadow: 0 0 10px #00F0FF;"></div>
         </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Component to handle clicks on the map
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? (
    <Marker position={position} icon={customTargetIcon}>
      <Popup className="custom-popup">
        <div className="font-mono font-bold text-[#040B16]">
          TARGET ACQUIRED
        </div>
      </Popup>
    </Marker>
  ) : null;
}

export default function HeatMap() {
  const containerRef = useRef(null);
  const resultsRef = useRef(null);

  // Initializing default location to Patna, Bihar
  const [position, setPosition] = useState({ lat: 25.5941, lng: 85.1376 });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".map-node",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (prediction && resultsRef.current) {
      gsap.fromTo(
        resultsRef.current.children,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [prediction]);

  const predict = async () => {
    setLoading(true);
    setPrediction(null);
    try {
      // KEEP YOUR REAL API CALL:
      // const res = await predictAll({ ... });
      // setPrediction(res.data);

      // Simulated network delay for UI testing
      setTimeout(() => {
        setPrediction({
          Predicted_Rainfall_Next_Day: 8.5,
          Predicted_Max_Temperature_Next_Day: 40.2,
          Predicted_Min_Temperature_Next_Day: 29.1
        });
        toast.success("Spatial scan complete. Telemetry updated.", {
          style: { background: '#040B16', color: '#00FF66', border: '1px solid #00FF66' }
        });
        setLoading(false);
      }, 1200);

    } catch (err) {
      console.log(err);
      toast.error("Uplink failed. Unable to generate spatial map.", {
        style: { background: '#FF5500', color: '#fff' }
      });
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="h-full w-full text-white space-y-6">
      
      {/* Header */}
      <div className="map-node border-b border-white/10 pb-4">
        <h1 className="font-[Rajdhani] text-4xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00F0FF] uppercase flex items-center gap-3">
          <Target className="text-[#00F0FF]" size={36} />
          Geospatial Heat Map
        </h1>
        <p className="mt-2 text-sm font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Activity size={14} className="text-[#00FF66]" />
          Select coordinates on the map to run localized XGBoost inference
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 pb-10">
        
        {/* LEFT COLUMN: The Map */}
        <div className="map-node lg:col-span-8 bg-[#0B192C]/40 backdrop-blur-md rounded-2xl border border-white/10 p-2 shadow-2xl relative overflow-hidden">
          {/* Using CartoDB Dark Matter for a high-tech dark mode aesthetic.
            The map container needs a specific height and z-index 0 to work correctly with glassmorphism over it.
          */}
          <MapContainer
            center={[position.lat, position.lng]}
            zoom={6}
            className="w-full h-[600px] rounded-xl z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
          
          {/* Overlay scanning effect (pure CSS hack for a cool sci-fi radar look) */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,240,255,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_4s_linear_infinite]" />
        </div>

        {/* RIGHT COLUMN: Controls & Results */}
        <div className="map-node lg:col-span-4 flex flex-col space-y-6 h-full">
          
          {/* Target Coordinates Panel */}
          <div className="bg-[#0B192C]/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/5 rounded-full blur-2xl transition-opacity group-hover:bg-[#00F0FF]/10" />
            
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <MapPin className="text-[#00F0FF]" size={20} />
              <h2 className="font-[Rajdhani] text-xl font-bold tracking-widest uppercase text-white">
                Target Coordinates
              </h2>
            </div>

            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between items-center bg-black/40 px-4 py-3 rounded-lg border border-white/5">
                <span className="text-slate-500 tracking-wider">LATITUDE</span>
                <span className="font-bold text-[#00F0FF]">{position.lat.toFixed(6)}</span>
              </div>
              <div className="flex justify-between items-center bg-black/40 px-4 py-3 rounded-lg border border-white/5">
                <span className="text-slate-500 tracking-wider">LONGITUDE</span>
                <span className="font-bold text-[#00F0FF]">{position.lng.toFixed(6)}</span>
              </div>
            </div>

            <button
              onClick={predict}
              disabled={loading}
              className="mt-6 w-full group relative overflow-hidden rounded-xl bg-[#00F0FF] py-4 font-[Rajdhani] font-bold text-black text-lg transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] disabled:opacity-70 disabled:hover:bg-[#00F0FF] disabled:hover:shadow-none flex justify-center items-center gap-3"
            >
              {loading ? (
                <>
                  <Activity className="animate-spin" size={20} />
                  SCANNING GRID...
                </>
              ) : (
                <>
                  <Brain size={20} className="transition-transform group-hover:scale-125" />
                  INITIALIZE INFERENCE
                </>
              )}
            </button>
          </div>

          {/* Prediction Results Panel */}
          {prediction && (
            <div className="flex-1 bg-black/40 backdrop-blur-md rounded-2xl border border-[#00F0FF]/30 p-6 shadow-[0_0_20px_rgba(0,240,255,0.1)] flex flex-col">
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
                <h2 className="font-[Rajdhani] text-xl font-bold uppercase tracking-widest text-white">
                  Spatial Telemetry
                </h2>
              </div>

              <div ref={resultsRef} className="space-y-3 flex-1">
                {/* Precip */}
                <div className="flex justify-between items-center bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-lg p-3">
                  <div className="flex items-center gap-3 text-[#00F0FF]">
                    <CloudRain size={18} />
                    <span className="font-mono text-xs tracking-wider">RAINFALL</span>
                  </div>
                  <strong className="font-[Rajdhani] text-2xl text-white">{prediction.Predicted_Rainfall_Next_Day} <span className="text-sm text-slate-400">mm</span></strong>
                </div>

                {/* Max Temp */}
                <div className="flex justify-between items-center bg-[#FF5500]/10 border border-[#FF5500]/20 rounded-lg p-3">
                  <div className="flex items-center gap-3 text-[#FF5500]">
                    <ThermometerSun size={18} />
                    <span className="font-mono text-xs tracking-wider">MAX TEMP</span>
                  </div>
                  <strong className="font-[Rajdhani] text-2xl text-white">{prediction.Predicted_Max_Temperature_Next_Day} <span className="text-sm text-slate-400">°C</span></strong>
                </div>

                {/* Min Temp */}
                <div className="flex justify-between items-center bg-[#00FF66]/10 border border-[#00FF66]/20 rounded-lg p-3">
                  <div className="flex items-center gap-3 text-[#00FF66]">
                    <ThermometerSun size={18} />
                    <span className="font-mono text-xs tracking-wider">MIN TEMP</span>
                  </div>
                  <strong className="font-[Rajdhani] text-2xl text-white">{prediction.Predicted_Min_Temperature_Next_Day} <span className="text-sm text-slate-400">°C</span></strong>
                </div>
              </div>

              <Link
                to="/recommendations"
                className="mt-6 flex items-center justify-between group rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white transition-all hover:bg-[#00F0FF] hover:text-black hover:border-[#00F0FF]"
              >
                <span className="font-[Rajdhani] font-bold tracking-wider uppercase">View Mitigation</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Required CSS snippet for the scanning radar line effect to work */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(600px); }
        }
        .custom-popup .leaflet-popup-content-wrapper {
          background-color: #00F0FF;
          border-radius: 4px;
        }
        .custom-popup .leaflet-popup-tip {
          background-color: #00F0FF;
        }
      `}} />
    </div>
  );
}