import { useEffect, useState } from "react";

import {
  ThermometerSun,
  CloudRain,
  ShieldCheck,
  Activity
} from "lucide-react";

import {
  getAnalytics,
  getForecast,
  getInsights
} from "../services/climateApi";

import MetricCard from "../components/analytics/MetricCard";

import ForecastChart from "../components/analytics/ForecastChart";

import ClimateScore from "../components/analytics/ClimateScore";

import AIInsights from "../components/analytics/AIInsights";

export default function Analytics() {

  const [analytics, setAnalytics] = useState(null);

  const [forecast, setForecast] = useState([]);

  const [insights, setInsights] = useState([]);

  useEffect(() => {

    getAnalytics().then(res => {

      setAnalytics(res.data);

    });

    getForecast().then(res => {

      setForecast(res.data);

    });

    getInsights().then(res => {

      setInsights(res.data.insights);

    });

  }, []);

  if (!analytics) {

    return (

      <div className="text-center py-20">

        Loading...

      </div>

    );

  }

  return (

    <div className="space-y-8">

      <h1 className="text-5xl font-black">

        Climate Analytics

      </h1>

      <div className="grid lg:grid-cols-4 gap-6">

        <MetricCard

          title="Avg Temperature"

          value={analytics.average_temperature}

          unit="°C"

          icon={ThermometerSun}

          color="from-orange-500 to-red-500"

        />

        <MetricCard

          title="Avg Rainfall"

          value={analytics.average_rainfall}

          unit="mm"

          icon={CloudRain}

          color="from-blue-500 to-cyan-500"

        />

        <MetricCard

          title="Accuracy"

          value={analytics.prediction_accuracy}

          unit="%"

          icon={Activity}

          color="from-green-500 to-emerald-500"

        />

        <MetricCard

          title="Heat Risk"

          value={analytics.heat_risk}

          unit=""

          icon={ShieldCheck}

          color="from-red-500 to-pink-500"

        />

      </div>

      <ForecastChart data={forecast} />

      <ClimateScore score={analytics.climate_score} />

      <AIInsights insights={insights} />

    </div>

  );

}