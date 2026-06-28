import {
  CloudRain,
  ThermometerSun,
} from "lucide-react";

export default function PredictionPopup({ prediction }) {

  if (!prediction) return null;

  return (
    <div className="space-y-4">

      <div className="rounded-xl bg-blue-50 p-4">

        <div className="flex justify-between">

          <span className="flex items-center gap-2">

            <CloudRain size={18} />

            Rainfall

          </span>

          <strong>

            {prediction.Predicted_Rainfall_Next_Day} mm

          </strong>

        </div>

      </div>

      <div className="rounded-xl bg-orange-50 p-4">

        <div className="flex justify-between">

          <span className="flex items-center gap-2">

            <ThermometerSun size={18} />

            Max Temp

          </span>

          <strong>

            {prediction.Predicted_Max_Temperature_Next_Day} °C

          </strong>

        </div>

      </div>

      <div className="rounded-xl bg-cyan-50 p-4">

        <div className="flex justify-between">

          <span className="flex items-center gap-2">

            <ThermometerSun size={18} />

            Min Temp

          </span>

          <strong>

            {prediction.Predicted_Min_Temperature_Next_Day} °C

          </strong>

        </div>

      </div>

    </div>
  );

}