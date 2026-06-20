import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import TemperatureChart from "../components/TemperatureChart";


function Dashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            const res = await api.get("/stats");
            setStats(res.data);
        };

        fetchStats();
    }, []);



    return (
        <div className="flex">

            <Sidebar />

            <div className="ml-64 w-full p-6">

                <Navbar />

                <div className="grid grid-cols-4 gap-5 mt-6">

                    {stats && (
                        <>
                            <StatCard
                                title="Average Temp"
                                value={`${stats.avgTemp}°C`}
                            />

                            <StatCard
                                title="Hotspots"
                                value={stats.hotspots}
                            />

                            <StatCard
                                title="Population"
                                value={stats.population}
                            />

                            <StatCard
                                title="Cooling Impact"
                                value={stats.impact}
                            />
                        </>
                    )}

                    <TemperatureChart />

                </div>

            </div>

        </div>
    );
}

export default Dashboard;