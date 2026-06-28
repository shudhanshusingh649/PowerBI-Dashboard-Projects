import { Link } from "react-router-dom";
import {
  ArrowRight,
  Satellite,
  Brain,
  CloudRain,
  ThermometerSun
} from "lucide-react";

export default function Hero() {

  return (

    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#071A3D] via-[#0B3C78] to-[#0891B2] p-10 text-white shadow-2xl">

      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="absolute -bottom-20 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>

      <div className="relative z-10">

        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">

          <Satellite size={18} />

          <span className="text-sm">

            ISRO Bharatiya Antariksh Hackathon 2026

          </span>

        </div>

        <h1 className="mt-8 text-6xl font-black leading-tight">

          AI Powered

          <br />

          Digital Twin

          <br />

          of India's Climate

        </h1>

        <p className="mt-6 max-w-3xl text-lg text-cyan-100">

          Predict rainfall and temperature using Artificial Intelligence,
          Machine Learning and India's National Climate Data.

        </p>

        <div className="mt-10 flex gap-5">

          <Link

            to="/prediction"

            className="flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-blue-700 shadow-lg transition hover:scale-105"

          >

            Start Prediction

            <ArrowRight size={18} />

          </Link>

          <Link

            to="/analytics"

            className="rounded-2xl border border-white/30 px-7 py-4 font-semibold backdrop-blur"

          >

            View Analytics

          </Link>

          <Link

            to="/assistant"

            className="rounded-2xl border border-white/30 px-7 py-4 font-semibold backdrop-blur"

          >

            Open Assistant

          </Link>

        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">

            <CloudRain className="mb-4" />

            <h3 className="text-3xl font-black">

              Rainfall

            </h3>

            <p className="mt-2 text-cyan-100">

              Next Day Prediction

            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">

            <ThermometerSun className="mb-4" />

            <h3 className="text-3xl font-black">

              Temperature

            </h3>

            <p className="mt-2 text-cyan-100">

              Max & Min Forecast

            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">

            <Brain className="mb-4" />

            <h3 className="text-3xl font-black">

              AI Engine

            </h3>

            <p className="mt-2 text-cyan-100">

              XGBoost Climate Models

            </p>

          </div>

        </div>

      </div>

    </section>

  );

}