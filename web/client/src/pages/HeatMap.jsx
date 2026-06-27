import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Map as MapIcon, Navigation, ThermometerSun, Users, AlertTriangle } from "lucide-react";
import "leaflet/dist/leaflet.css";
import api from "../services/api";

function HeatMap() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback to Patna coordinates if no data is present
  const mapCenter = useMemo(() => {
    if (!zones.length) {
      return [25.5941, 85.1376]; 
    }

    const averageLat = zones.reduce((sum, zone) => sum + zone.lat, 0) / zones.length;
    const averageLng = zones.reduce((sum, zone) => sum + zone.lng, 0) / zones.length;

    return [averageLat, averageLng];
  }, [zones]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const res = await api.get("/zones");
        setZones(res.data);
      } catch (error) {
        console.error("Failed to fetch zones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchZones();
  }, []);

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-10 text-white shadow-xl shadow-slate-200/50">
        {/* Decorative blur */}
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <MapIcon size={20} className="text-orange-400" />
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
              Spatial Analysis
            </p>
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            Urban Heat Intensity Map
          </h1>
          <p className="mt-2 max-w-2xl text-slate-300 text-sm leading-relaxed">
            Live geographical tracking of thermal hotspots across monitored wards. Markers reflect real-time API data aligned with the prediction pipeline.
          </p>
        </div>
      </section>

      {/* Map Container */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-2 shadow-sm border border-slate-100">
        {loading ? (
          // Premium Loading State
          <div className="flex h-[600px] w-full flex-col items-center justify-center rounded-2xl bg-slate-50">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500 mb-4"></div>
            <p className="text-sm font-medium text-slate-500">Connecting to telemetry...</p>
          </div>
        ) : (
          <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-inner border border-slate-100">
            <MapContainer
              center={mapCenter}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
            >
              {/* Using a cleaner, more muted tile layer option if you want to swap it later, but standard OSM works great */}
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {zones.map((zone) => {
                // Using Tailwind corresponding hex codes for perfect color matching
                const isHigh = zone.risk === "High";
                const isMedium = zone.risk === "Medium";
                
                const color = isHigh ? "#ef4444" : isMedium ? "#f97316" : "#10b981";
                const radius = isHigh ? 18 : isMedium ? 14 : 10;

                return (
                  <CircleMarker
                    key={zone._id || zone.city}
                    center={[zone.lat, zone.lng]}
                    radius={radius}
                    pathOptions={{
                      color: color,
                      fillColor: color,
                      fillOpacity: isHigh ? 0.6 : 0.4,
                      weight: 2,
                    }}
                  >
                    <Popup className="rounded-xl font-sans">
                      <div className="p-1 min-w-[180px]">
                        <div className="mb-2 border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2 font-bold text-slate-800 text-base">
                            <Navigation size={16} className="text-blue-500" />
                            {zone.city}
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-slate-600">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5"><ThermometerSun size={14}/> Temp:</span>
                            <span className="font-semibold text-slate-900">{zone.temperature}°C</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5"><AlertTriangle size={14}/> Risk:</span>
                            <span className={`font-semibold px-2 py-0.5 rounded text-xs ${
                              isHigh ? "bg-red-100 text-red-700" : 
                              isMedium ? "bg-orange-100 text-orange-700" : 
                              "bg-emerald-100 text-emerald-700"
                            }`}>
                              {zone.risk}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5"><Users size={14}/> Pop:</span>
                            <span className="font-semibold text-slate-900">{Number(zone.population || 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </MapContainer>
          </div>
        )}
      </div>

      {/* Interactive Legend */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "High Risk Zone", desc: "Temp > 40°C | Immediate action required", color: "bg-red-500", shadow: "shadow-red-500/20" },
          { label: "Medium Risk Zone", desc: "Temp 35°C - 40°C | Monitor closely", color: "bg-orange-500", shadow: "shadow-orange-500/20" },
          { label: "Low Risk Zone", desc: "Temp < 35°C | Safe levels", color: "bg-emerald-500", shadow: "shadow-emerald-500/20" },
        ].map((item) => (
          <div key={item.label} className={`flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-100 transition-transform hover:-translate-y-1`}>
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${item.color} ${item.shadow} shadow-lg text-white`}>
              <AlertTriangle size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">{item.label}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeatMap;