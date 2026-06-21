import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", temp: 30 },
  { month: "Feb", temp: 32 },
  { month: "Mar", temp: 35 },
  { month: "Apr", temp: 39 },
  { month: "May", temp: 43 },
  { month: "Jun", temp: 42 },
];

function TemperatureChart() {
  return (
    <div className="bg-white p-5 rounded-xl shadow mt-6">
      <h2 className="font-bold mb-4">
        Temperature Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="temp"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;