import { useState } from "react";
import {
  MapPin,
  Calendar,
  CloudRain,
  ThermometerSun,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import CitySearch from "../components/CitySearch";

import { predictAll } from "../services/climateApi";

export default function Prediction() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    Latitude: 28.6139,
    Longitude: 77.209,
    Date: new Date().toISOString().split("T")[0],
    Max_Temperature: 35,
    Min_Temperature: 25,
    Rainfall: 5,
  });

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
      const response = await predictAll(form);

      setResult(response.data);

      toast.success("Climate prediction completed");
    } catch (err) {
      console.log(err);

      setError("Unable to connect with FastAPI Server.");

      toast.error("Prediction request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black text-slate-800">

          AI Climate Prediction

        </h1>

        <p className="mt-2 text-slate-500">

          Predict Tomorrow's Rainfall and Temperature using XGBoost Models.

        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg p-8 space-y-6"
        >

          <div className="flex items-center gap-2 mb-4">

            <Sparkles className="text-blue-600" />

            <h2 className="text-2xl font-bold">

              Climate Inputs

            </h2>

          </div>

          <div>

            <label className="font-medium">

              Latitude

            </label>

            <CitySearch

              onSelect={(city) => {

                setForm({

                  ...form,

                  Latitude: city.lat,

                  Longitude: city.lng

                });

                toast.success(`Loaded ${city.name}`);

              }}

            />

            <div className="relative mt-2">

              <MapPin
                size={18}
                className="absolute left-3 top-4 text-slate-400"
              />

              <input
                type="number"
                step="0.0001"
                name="Latitude"
                value={form.Latitude}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-10 pr-4"
              />

            </div>

          </div>

          <div>

            <label className="font-medium">

              Longitude

            </label>

            <div className="relative mt-2">

              <MapPin
                size={18}
                className="absolute left-3 top-4 text-slate-400"
              />

              <input
                type="number"
                step="0.0001"
                name="Longitude"
                value={form.Longitude}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-10 pr-4"
              />

            </div>

          </div>

          <div>

            <label className="font-medium">

              Date

            </label>

            <div className="relative mt-2">

              <Calendar
                size={18}
                className="absolute left-3 top-4 text-slate-400"
              />

              <input
                type="date"
                name="Date"
                value={form.Date}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-10 pr-4"
              />

            </div>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="font-medium">

                Maximum Temperature

              </label>

              <div className="relative mt-2">

                <ThermometerSun
                  size={18}
                  className="absolute left-3 top-4 text-orange-500"
                />

                <input
                  type="number"
                  name="Max_Temperature"
                  value={form.Max_Temperature}
                  onChange={handleChange}
                  className="w-full border rounded-xl py-3 pl-10 pr-4"
                />

              </div>

            </div>

            <div>

              <label className="font-medium">

                Minimum Temperature

              </label>

              <div className="relative mt-2">

                <ThermometerSun
                  size={18}
                  className="absolute left-3 top-4 text-cyan-500"
                />

                <input
                  type="number"
                  name="Min_Temperature"
                  value={form.Min_Temperature}
                  onChange={handleChange}
                  className="w-full border rounded-xl py-3 pl-10 pr-4"
                />

              </div>

            </div>

          </div>

          <div>

            <label className="font-medium">

              Current Rainfall (mm)

            </label>

            <div className="relative mt-2">

              <CloudRain
                size={18}
                className="absolute left-3 top-4 text-blue-500"
              />

              <input
                type="number"
                name="Rainfall"
                value={form.Rainfall}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 pl-10 pr-4"
              />

            </div>

          </div>

          {error && (
            <div className="rounded-xl bg-red-100 text-red-700 p-4">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl py-4 font-semibold flex justify-center items-center gap-3"
          >

            {loading ? (
              <>
                <Loader2 className="animate-spin" />

                Predicting...
              </>
            ) : (
              <>
                <Sparkles />

                Predict Climate
              </>
            )}

          </button>

        </form>
        {/* Prediction Result */}

        <div className="space-y-6">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-slate-800">

              Prediction Result

            </h2>

            <p className="text-slate-500 mt-2">

              AI Generated Climate Prediction

            </p>

            {!result ? (

              <div className="flex flex-col items-center justify-center h-[420px] text-center">

                <CloudRain
                  size={70}
                  className="text-blue-300 mb-6"
                />

                <h3 className="text-2xl font-bold text-slate-700">

                  No Prediction Yet

                </h3>

                <p className="text-slate-500 mt-3 max-w-sm">

                  Fill the climate parameters and click
                  <strong> Predict Climate</strong> to
                  generate AI-based predictions.

                </p>

              </div>

            ) : (

              <div className="space-y-5 mt-8">

                {/* Rainfall */}

                <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 shadow">

                  <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                      <CloudRain size={30} />

                      <div>

                        <h3 className="font-bold text-lg">

                          Predicted Rainfall

                        </h3>

                        <p className="text-sm text-blue-100">

                          Next Day

                        </p>

                      </div>

                    </div>

                    <h2 className="text-4xl font-black">

                      {result.Predicted_Rainfall_Next_Day}

                      <span className="text-xl ml-2">

                        mm

                      </span>

                    </h2>

                  </div>

                </div>

                {/* Maximum Temperature */}

                <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 shadow">

                  <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                      <ThermometerSun size={30} />

                      <div>

                        <h3 className="font-bold text-lg">

                          Maximum Temperature

                        </h3>

                        <p className="text-sm text-orange-100">

                          Tomorrow

                        </p>

                      </div>

                    </div>

                    <h2 className="text-4xl font-black">

                      {result.Predicted_Max_Temperature_Next_Day}

                      <span className="text-xl ml-2">

                        °C

                      </span>

                    </h2>

                  </div>

                </div>

                {/* Minimum Temperature */}

                <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white p-6 shadow">

                  <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                      <ThermometerSun size={30} />

                      <div>

                        <h3 className="font-bold text-lg">

                          Minimum Temperature

                        </h3>

                        <p className="text-sm text-cyan-100">

                          Tomorrow

                        </p>

                      </div>

                    </div>

                    <h2 className="text-4xl font-black">

                      {result.Predicted_Min_Temperature_Next_Day}

                      <span className="text-xl ml-2">

                        °C

                      </span>

                    </h2>

                  </div>

                </div>

                {/* Summary */}

                <div className="rounded-2xl bg-slate-900 text-white p-6">

                  <h3 className="text-xl font-bold">

                    AI Summary

                  </h3>

                  <ul className="mt-4 space-y-3 text-slate-300">

                    <li>

                      🌧️ Expected Rainfall :

                    <li className="pt-2">

                      <Link
                        to="/recommendations"
                        className="inline-flex items-center rounded-xl bg-white px-4 py-2 font-semibold text-slate-900 transition hover:scale-[1.02]"
                      >
                        Review Recommendations
                      </Link>

                    </li>
                      <strong className="text-white ml-2">
                        {result.Predicted_Rainfall_Next_Day} mm
                      </strong>

                    </li>

                    <li>

                      🌡️ Maximum Temperature :
                      <strong className="text-white ml-2">
                        {result.Predicted_Max_Temperature_Next_Day} °C
                      </strong>

                    </li>

                    <li>

                      ❄️ Minimum Temperature :
                      <strong className="text-white ml-2">
                        {result.Predicted_Min_Temperature_Next_Day} °C
                      </strong>

                    </li>

                  </ul>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}