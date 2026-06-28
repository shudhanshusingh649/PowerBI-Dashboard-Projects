import {
    Cpu,
    Database,
    Globe2,
    Activity
} from "lucide-react";

const cards = [

    {
        title: "AI Models",
        value: "3",
        icon: Cpu,
        color: "from-blue-500 to-cyan-500"
    },

    {
        title: "Climate Parameters",
        value: "21",
        icon: Database,
        color: "from-emerald-500 to-green-500"
    },

    {
        title: "Coverage",
        value: "India",
        icon: Globe2,
        color: "from-orange-500 to-red-500"
    },

    {
        title: "System",
        value: "Online",
        icon: Activity,
        color: "from-violet-500 to-purple-500"
    }

];

export default function ClimateOverview() {

    return (

        <div className="grid gap-6 lg:grid-cols-4">

            {

                cards.map(card => {

                    const Icon = card.icon;

                    return (

                        <div

                            key={card.title}

                            className="rounded-3xl bg-white p-7 shadow hover:-translate-y-2 transition"

                        >

                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white`}>

                                <Icon size={28} />

                            </div>

                            <p className="mt-6 text-slate-500">

                                {card.title}

                            </p>

                            <h2 className="mt-2 text-4xl font-black">

                                {card.value}

                            </h2>

                        </div>

                    );

                })

            }

        </div>

    );

}