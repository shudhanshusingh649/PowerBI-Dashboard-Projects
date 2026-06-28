import { useMemo, useState } from "react";
import {
  Trees,
  Building2,
  Droplets,
  Home,
  Sparkles,
  TrendingDown,
  ShieldCheck,
} from "lucide-react";

export default function Simulator() {

  const [treeCover, setTreeCover] = useState(20);
  const [urbanArea, setUrbanArea] = useState(60);
  const [waterBodies, setWaterBodies] = useState(10);
  const [coolRoof, setCoolRoof] = useState(5);

  const result = useMemo(() => {

    const cooling =
      treeCover * 0.08 +
      waterBodies * 0.12 +
      coolRoof * 0.07;

    const heating =
      urbanArea * 0.05;

    const temperatureReduction =
      Math.max(
        0,
        (cooling - heating).toFixed(2)
      );

    let risk = "High";

    if (temperatureReduction > 2.5)
      risk = "Low";
    else if (temperatureReduction > 1.5)
      risk = "Moderate";

    return {

      reduction: temperatureReduction,

      risk,

      trees:
        Math.round(treeCover * 1500),

      carbon:
        Math.round(treeCover * 45)

    };

  }, [
    treeCover,
    urbanArea,
    waterBodies,
    coolRoof,
  ]);

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black">

          Digital Twin Simulator

        </h1>

        <p className="text-slate-500 mt-2">

          Simulate different climate mitigation strategies.

        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Controls */}

        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-8">

          <div>

            <div className="flex items-center gap-2">

              <Trees className="text-green-600"/>

              <h2 className="font-bold">

                Tree Cover

              </h2>

            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={treeCover}
              onChange={(e)=>setTreeCover(Number(e.target.value))}
              className="w-full mt-5"
            />

            <p className="mt-2">

              {treeCover} %

            </p>

          </div>

          <div>

            <div className="flex items-center gap-2">

              <Building2 className="text-orange-500"/>

              <h2 className="font-bold">

                Urban Area

              </h2>

            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={urbanArea}
              onChange={(e)=>setUrbanArea(Number(e.target.value))}
              className="w-full mt-5"
            />

            <p className="mt-2">

              {urbanArea} %

            </p>

          </div>

          <div>

            <div className="flex items-center gap-2">

              <Droplets className="text-blue-600"/>

              <h2 className="font-bold">

                Water Bodies

              </h2>

            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={waterBodies}
              onChange={(e)=>setWaterBodies(Number(e.target.value))}
              className="w-full mt-5"
            />

            <p className="mt-2">

              {waterBodies} %

            </p>

          </div>

          <div>

            <div className="flex items-center gap-2">

              <Home className="text-cyan-600"/>

              <h2 className="font-bold">

                Cool Roof Adoption

              </h2>

            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={coolRoof}
              onChange={(e)=>setCoolRoof(Number(e.target.value))}
              className="w-full mt-5"
            />

            <p className="mt-2">

              {coolRoof} %

            </p>

          </div>

        </div>

        {/* Results */}

        <div className="space-y-6">

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl text-white p-8">

            <div className="flex items-center gap-2">

              <Sparkles/>

              <h2 className="font-bold text-2xl">

                AI Simulation Result

              </h2>

            </div>

            <div className="mt-8 text-5xl font-black">

              -{result.reduction}°C

            </div>

            <p className="mt-2">

              Estimated Temperature Reduction

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow p-6">

            <div className="flex justify-between">

              <div className="flex gap-2">

                <TrendingDown/>

                Heat Risk

              </div>

              <strong>

                {result.risk}

              </strong>

            </div>

            <div className="flex justify-between mt-6">

              <div>

                Trees Needed

              </div>

              <strong>

                {result.trees}

              </strong>

            </div>

            <div className="flex justify-between mt-6">

              <div>

                Carbon Reduction

              </div>

              <strong>

                {result.carbon} Tons/Year

              </strong>

            </div>

          </div>

          <div className="bg-green-50 rounded-3xl border border-green-200 p-6">

            <div className="flex items-center gap-2">

              <ShieldCheck className="text-green-600"/>

              <h2 className="font-bold">

                AI Recommendation

              </h2>

            </div>

            <ul className="mt-5 space-y-3 text-slate-700">

              <li>🌳 Increase tree plantation.</li>

              <li>🏠 Promote cool roof technology.</li>

              <li>💧 Restore lakes and ponds.</li>

              <li>🚶 Increase urban green corridors.</li>

            </ul>

          </div>

        </div>

      </div>

    </div>

  );

}