import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", temp: 34, rain: 2 },
  { day: "Tue", temp: 36, rain: 5 },
  { day: "Wed", temp: 35, rain: 8 },
  { day: "Thu", temp: 38, rain: 4 },
  { day: "Fri", temp: 37, rain: 1 },
  { day: "Sat", temp: 39, rain: 0 },
  { day: "Sun", temp: 36, rain: 6 },
];

export default function ForecastChart() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="text-2xl font-black mb-8">
        7-Day Climate Forecast
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              dataKey="temp"
              stroke="#2563EB"
              strokeWidth={4}
            />

            <Line
              dataKey="rain"
              stroke="#06B6D4"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}