import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Simulator() {
  const [currentTemp, setCurrentTemp] = useState("");
  const [currentCover, setCurrentCover] = useState("");
  const [futureCover, setFutureCover] = useState("");

  const [result, setResult] = useState(null);

  const simulate = () => {
    const reduction =
      (futureCover - currentCover) * 0.35;

    const futureTemp =
      Number(currentTemp) - reduction;

    setResult({
      reduction: reduction.toFixed(2),
      futureTemp: futureTemp.toFixed(2),
    });
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">
          Urban Cooling Simulator
        </h1>

        <div className="bg-white p-6 rounded-xl shadow space-y-4">

          <input
            type="number"
            placeholder="Current Temperature"
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setCurrentTemp(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Current Tree Cover (%)"
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setCurrentCover(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Future Tree Cover (%)"
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setFutureCover(e.target.value)
            }
          />

          <button
            onClick={simulate}
            className="bg-green-600 text-white px-5 py-3 rounded"
          >
            Simulate Impact
          </button>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-xl shadow mt-6">

            <h2 className="text-xl font-bold mb-3">
              Simulation Result
            </h2>

            <p>
              Temperature Reduction:
              {" "}
              {result.reduction}°C
            </p>

            <p>
              Future Temperature:
              {" "}
              {result.futureTemp}°C
            </p>

          </div>
        )}
      </div>
    </div>
  );
}

export default Simulator;