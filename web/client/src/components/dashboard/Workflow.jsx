import {
    MapPin,
    Cpu,
    Brain,
    CloudRain,
} from "lucide-react";

const steps = [

    {
        title: "Location",
        icon: MapPin,
    },

    {
        title: "Feature Engineering",
        icon: Cpu,
    },

    {
        title: "AI Prediction",
        icon: Brain,
    },

    {
        title: "Climate Forecast",
        icon: CloudRain,
    },

];

export default function Workflow() {

    return (

        <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="text-3xl font-black mb-10">

                Prediction Workflow

            </h2>

            <div className="grid md:grid-cols-4 gap-8">

                {

                    steps.map((step, index) => {

                        const Icon = step.icon;

                        return (

                            <div
                                key={step.title}
                                className="text-center"
                            >

                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white">

                                    <Icon size={34} />

                                </div>

                                <h3 className="mt-6 font-bold">

                                    {step.title}

                                </h3>

                                {

                                    index !== 3 && (

                                        <div className="hidden md:block mt-6 text-blue-500">

                                            ↓

                                        </div>

                                    )

                                }

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

}