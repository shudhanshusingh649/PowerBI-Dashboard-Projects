import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Server,
  Cpu,
  Database,
} from "lucide-react";

import api from "../../services/api";

export default function BackendStatus() {

  const [health, setHealth] = useState(null);

  useEffect(() => {

    api.get("/health")

      .then((res) => setHealth(res.data))

      .catch(() => {});

  }, []);

  return (

    <div className="grid lg:grid-cols-4 gap-6">

      <div className="rounded-3xl bg-white p-6 shadow">

        <Server className="text-blue-600 mb-4" />

        <p className="text-slate-500">

          API Status

        </p>

        <h2 className="text-3xl font-black mt-2">

          {health?.status || "Loading..."}

        </h2>

      </div>

      <div className="rounded-3xl bg-white p-6 shadow">

        <Cpu className="text-green-600 mb-4"/>

        <p className="text-slate-500">

          Rainfall Model

        </p>

        <div className="flex items-center gap-2 mt-3">

          <CheckCircle2 className="text-green-600"/>

          Active

        </div>

      </div>

      <div className="rounded-3xl bg-white p-6 shadow">

        <Cpu className="text-orange-500 mb-4"/>

        <p className="text-slate-500">

          Max Temp Model

        </p>

        <div className="flex items-center gap-2 mt-3">

          <CheckCircle2 className="text-green-600"/>

          Active

        </div>

      </div>

      <div className="rounded-3xl bg-white p-6 shadow">

        <Database className="text-cyan-600 mb-4"/>

        <p className="text-slate-500">

          Prediction Engine

        </p>

        <div className="flex items-center gap-2 mt-3">

          <CheckCircle2 className="text-green-600"/>

          Ready

        </div>

      </div>

    </div>

  );

}