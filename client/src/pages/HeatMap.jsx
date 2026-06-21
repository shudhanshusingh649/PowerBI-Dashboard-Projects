import Sidebar from "../components/Sidebar";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import api from "../services/api";


function HeatMap() {

    const [zones, setZones] = useState([]);

    useEffect(() => {
        const fetchZones = async () => {
            const res = await api.get("/zones");
            setZones(res.data);
        };

        fetchZones();
    }, []);

    return (
        <div className="flex">

            <Sidebar />

            <div className="ml-64 p-6 w-full">

                <h1 className="text-2xl font-bold mb-4">
                    Urban Heat Map
                </h1>

                <MapContainer
                    center={[25.5941, 85.1376]}
                    zoom={12}
                    style={{
                        height: "600px",
                        width: "100%"
                    }}
                >

                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        zones.map((zone, index) => (
                            <CircleMarker
                                key={index}
                                center={[zone.lat, zone.lng]}
                                radius={15}
                                color={
                                    zone.risk === "High"
                                        ? "red"
                                        : "orange"
                                }
                            >
                                <Popup>
                                    Risk: {zone.risk}
                                </Popup>
                            </CircleMarker>
                        ))
                    }

                </MapContainer>

                <div className="mt-4 flex gap-6">

                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                        High Risk
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-orange-500 rounded-full"></div>
                        Medium Risk
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                        Low Risk
                    </div>

                </div>

            </div>

        </div>
    );
}

export default HeatMap;