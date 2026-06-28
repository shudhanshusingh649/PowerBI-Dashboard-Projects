import {
  Brain,
  Lightbulb,
} from "lucide-react";

const insights = [
  "Temperature is expected to increase by 2°C over the next two days.",
  "Tree plantation in western zones can reduce heat by approximately 1.5°C.",
  "Rainfall probability is higher during the upcoming weekend.",
  "Cool roof adoption may significantly reduce urban heat islands."
];

export default function AIInsights() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <div className="flex items-center gap-3 mb-8">

        <Brain className="text-blue-600" />

        <h2 className="text-2xl font-black">

          AI Insights

        </h2>

      </div>

      <div className="space-y-5">

        {insights.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl bg-slate-50 p-5 flex gap-4"
          >

            <Lightbulb className="text-yellow-500 mt-1" />

            <p className="text-slate-700">

              {item}

            </p>

          </div>
        ))}

      </div>

    </div>
  );
}