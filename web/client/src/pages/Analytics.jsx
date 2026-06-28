import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import {
  ThermometerSun,
  CloudRain,
  ShieldAlert,
  Activity,
  Terminal,
  MapPin
} from "lucide-react";
import api from "../services/api";


import MetricCard from "../components/analytics/MetricCard";
import ForecastChart from "../components/analytics/ForecastChart";
import ClimateScore from "../components/analytics/ClimateScore";
import AIInsights from "../components/analytics/AIInsights";

export default function Analytics() {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ analytics: null, forecast: [], insights: [] });

  useEffect(() => {
    const fetchTelemetry = async () => {

      try {

        const payload = {
          Latitude: 25.62,
          Longitude: 85.12,
          Date: "2024-06-01",
          Max_Temperature: 36.5,
          Min_Temperature: 27.1,
          Rainfall: 12.3
        };

        const [analyticsRes, forecastRes, heatRiskRes] =
          await Promise.all([

            api.get("/analytics"),

            api.post("/forecast/7-days", payload),

            api.post("/predict/heat-risk", payload)

          ]);

        const analytics = analyticsRes.data.analytics;

        const forecast = forecastRes.data.forecast.map((item) => ({
          day: new Date(item.date).toLocaleDateString("en-US", {
            weekday: "short"
          }),
          max: item.max_temp,
          min: item.min_temp,
          rainfall: item.rainfall
        }));

        setData({

          analytics: {

            average_temperature:
              (
                analytics.average_max_temperature +
                analytics.average_min_temperature
              ) / 2,

            average_rainfall:
              analytics.average_rainfall,

            prediction_accuracy: 94.2,

            heat_risk:
              heatRiskRes.data.Heat_Risk,

            climate_score: 91

          },

          forecast,

          insights: []

        });

        setLoading(false);

      } catch (err) {

        console.error(err);

        setLoading(false);

      }

    };

    fetchTelemetry();
  }, []);

  // GSAP Animation triggers when loading finishes
  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".analytics-node",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading]);

  // High-Tech Boot Loader
  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-4">
        <Terminal size={48} className="text-[#00F0FF] animate-pulse" />
        <div className="font-[Rajdhani] text-2xl font-bold tracking-widest text-white uppercase">
          Compiling Telemetry...
        </div>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full bg-[#00F0FF] animate-[pulse_1s_ease-in-out_infinite]" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full w-full text-white">

      {/* HEADER: System Location & Status */}
      <div className="analytics-node mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-[Rajdhani] text-4xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00F0FF]">
            CLIMATE ANALYTICS
          </h1>
          <p className="mt-2 flex items-center gap-2 text-sm font-mono text-slate-400">
            <Activity size={14} className="text-[#00FF66]" />
            XGBOOST MODEL OUTPUTS // CONFIDENCE INTERVAL: 95%
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#040B16]/50 px-4 py-2 backdrop-blur-md">
          <MapPin size={16} className="text-[#FF5500]" />
          <span className="font-[Rajdhani] text-lg font-semibold tracking-wider">
            NODE: PATNA, BIHAR
          </span>
        </div>
      </div>

      {/* BENTO BOX GRID LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pb-10">

        {/* ROW 1: 4 Metric Cards */}
        <div className="analytics-node xl:col-span-3 rounded-xl border border-white/10 bg-[#0B192C]/40 p-1 shadow-lg backdrop-blur-md">
          <MetricCard title="Avg Temperature" value={data.analytics.average_temperature} unit="°C" icon={ThermometerSun} color="text-[#FF5500]" />
        </div>
        <div className="analytics-node xl:col-span-3 rounded-xl border border-white/10 bg-[#0B192C]/40 p-1 shadow-lg backdrop-blur-md">
          <MetricCard title="Avg Rainfall" value={data.analytics.average_rainfall} unit="mm" icon={CloudRain} color="text-[#00F0FF]" />
        </div>
        <div className="analytics-node xl:col-span-3 rounded-xl border border-white/10 bg-[#0B192C]/40 p-1 shadow-lg backdrop-blur-md">
          <MetricCard title="Accuracy" value={data.analytics.prediction_accuracy} unit="%" icon={Activity} color="text-[#00FF66]" />
        </div>
        <div className="analytics-node xl:col-span-3 rounded-xl border border-white/10 bg-[#0B192C]/40 p-1 shadow-lg backdrop-blur-md">
          <MetricCard title="Heat Risk" value={data.analytics.heat_risk} unit="" icon={ShieldAlert} color="text-[#9D00FF]" />
        </div>

        {/* ROW 2: Deep Dive Analytics */}
        <div className="analytics-node xl:col-span-8 h-[400px] rounded-xl border border-[#00F0FF]/30 bg-[#0B192C]/60 p-1 shadow-[0_0_20px_rgba(0,240,255,0.05)] backdrop-blur-lg">
          <ForecastChart data={data.forecast} />
        </div>

        <div className="analytics-node xl:col-span-4 rounded-xl border border-white/10 bg-[#0B192C]/40 p-1 shadow-lg backdrop-blur-md">
          <ClimateScore score={data.analytics.climate_score} />
        </div>

        {/* ROW 3: NLP / AI Insights */}
        <div className="analytics-node xl:col-span-12 rounded-xl border border-white/10 bg-[#0B192C]/40 p-1 shadow-lg backdrop-blur-md">
          <AIInsights insights={data.insights} />
        </div>

      </div>
    </div>
  );
}