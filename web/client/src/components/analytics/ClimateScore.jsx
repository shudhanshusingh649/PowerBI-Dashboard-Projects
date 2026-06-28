import { ShieldCheck } from "lucide-react";

export default function ClimateScore() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 shadow-lg">

      <div className="flex items-center gap-3">

        <ShieldCheck size={32} />

        <h2 className="text-2xl font-bold">

          Climate Health Score

        </h2>

      </div>

      <div className="mt-10 text-center">

        <h1 className="text-7xl font-black">

          82

        </h1>

        <p className="text-xl mt-2">

          Excellent

        </p>

      </div>

    </div>
  );
}