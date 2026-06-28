import {

    LineChart,

    Line,

    XAxis,

    YAxis,

    CartesianGrid,

    Tooltip,

    ResponsiveContainer

} from "recharts";

const data = [

    { day: "Mon", temp: 32 },

    { day: "Tue", temp: 35 },

    { day: "Wed", temp: 33 },

    { day: "Thu", temp: 36 },

    { day: "Fri", temp: 39 },

    { day: "Sat", temp: 37 },

    { day: "Sun", temp: 34 },

];

export default function TemperatureTrend() {

    return (

        <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="text-3xl font-black mb-8">

                Weekly Temperature Trend

            </h2>

            <div className="h-[350px]">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="day" />

                        <YAxis />

                        <Tooltip />

                        <Line

                            type="monotone"

                            dataKey="temp"

                            stroke="#2563eb"

                            strokeWidth={4}

                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}