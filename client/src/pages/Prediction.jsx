import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Prediction() {
  const [formData, setFormData] = useState({
    ndvi: "",
    populationDensity: "",
    buildingDensity: "",
    imperviousSurface: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = (e) => {
    e.preventDefault();

    // Dummy Response
    setResult({
      temperature: 42.4,
      risk: "High",
      score: 91,
    });
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full p-6">
        <h1 className="text-3xl font-bold mb-6">
          AI Temperature Prediction
        </h1>

        <form
          onSubmit={handlePredict}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >
          <input
            type="number"
            name="ndvi"
            placeholder="NDVI"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="populationDensity"
            placeholder="Population Density"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="buildingDensity"
            placeholder="Building Density"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="imperviousSurface"
            placeholder="Impervious Surface Area"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            className="bg-blue-600 text-white px-5 py-3 rounded"
          >
            Predict Temperature
          </button>
        </form>

        {result && (
          <div className="bg-white p-6 rounded-xl shadow mt-6">
            <h2 className="text-xl font-bold mb-3">
              Prediction Result
            </h2>

            <p>
              Temperature: {result.temperature}°C
            </p>

            <p>
              Risk Level: {result.risk}
            </p>

            <p>
              Risk Score: {result.score}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Prediction;