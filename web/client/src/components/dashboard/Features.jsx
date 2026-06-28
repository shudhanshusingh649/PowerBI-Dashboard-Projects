import {

    Brain,

    Satellite,

    CloudRain,

    Thermometer

} from "lucide-react";

const features = [

    "AI Temperature Prediction",

    "Rainfall Forecast",

    "Digital Twin Simulation",

    "Interactive Heat Maps"

];

export default function Features() {

    return (

        <div className="bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-bold">

                Project Features

            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-8">

                {

                    features.map(feature => (

                        <div

                            key={feature}

                            className="rounded-xl border p-4"

                        >

                            ✅ {feature}

                        </div>

                    ))

                }

            </div>

        </div>

    );

}