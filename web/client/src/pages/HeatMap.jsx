import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";

import {
  MapPin,
  Brain,
  CloudRain,
  ThermometerSun,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { predictAll } from "../services/climateApi";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({
  position,
  setPosition,
}) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>
        Selected Location
      </Popup>
    </Marker>
  ) : null;
}

export default function HeatMap() {
  const [position, setPosition] = useState({
    lat: 28.6139,
    lng: 77.209,
  });

  const [prediction, setPrediction] = useState(null);

  const [loading, setLoading] = useState(false);

  const predict = async () => {
    setLoading(true);

    try {
      const res = await predictAll({
        Latitude: position.lat,
        Longitude: position.lng,
        Date: new Date().toISOString().split("T")[0],
        Max_Temperature: 35,
        Min_Temperature: 25,
        Rainfall: 5,
      });

      setPrediction(res.data);

      toast.success("Heat map prediction ready");
    } catch (err) {
      console.log(err);

      toast.error("Unable to generate the heat map prediction");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black">

          Digital Twin Heat Map

        </h1>

        <p className="text-slate-500 mt-2">

          Click anywhere on the map to generate AI prediction.

        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 bg-white rounded-3xl overflow-hidden shadow-lg">

          <MapContainer
            center={[28.6139, 77.209]}
            zoom={5}
            style={{
              height: "650px",
              width: "100%",
            }}
          >

            <TileLayer
              attribution="OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker
              position={position}
              setPosition={setPosition}
            />

          </MapContainer>

        </div>

        <div className="space-y-6">

          <div className="bg-white rounded-3xl p-6 shadow">

            <div className="flex gap-2 items-center">

              <MapPin className="text-blue-600" />

              <h2 className="font-bold text-xl">

                Selected Location

              </h2>

            </div>

            <div className="mt-6 space-y-4">

              <p>

                <strong>Latitude :</strong>

                {position.lat.toFixed(4)}

              </p>

              <p>

                <strong>Longitude :</strong>

                {position.lng.toFixed(4)}

              </p>

            </div>

            <button
              onClick={predict}
              className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl flex justify-center gap-3"
            >

              <Brain />

              {loading ? "Predicting..." : "Predict Here"}

            </button>

          </div>

          {prediction && (

            <div className="bg-white rounded-3xl p-6 shadow space-y-5">

              <h2 className="text-xl font-bold">

                Prediction

              </h2>

              <div className="flex justify-between">

                <div className="flex gap-2">

                  <CloudRain />

                  Rainfall

                </div>

                <strong>

                  {prediction.Predicted_Rainfall_Next_Day} mm

                </strong>

              </div>

              <div className="flex justify-between">

                <div className="flex gap-2">

                  <ThermometerSun />

                  Max Temp

                </div>

                <strong>

                  {prediction.Predicted_Max_Temperature_Next_Day} °C

                </strong>

              </div>

              <div className="flex justify-between">

                <div className="flex gap-2">

                  <ThermometerSun />

                  Min Temp

                </div>

                <strong>

                  {prediction.Predicted_Min_Temperature_Next_Day} °C

                </strong>

              </div>

              <Link
                to="/recommendations"
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                View Recommendations
              </Link>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}