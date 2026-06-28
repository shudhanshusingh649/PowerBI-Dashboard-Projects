export default function MapLegend() {

    return (

        <div className="bg-white rounded-3xl shadow p-6">

            <h2 className="font-bold text-xl mb-6">

                Heat Legend

            </h2>

            <div className="space-y-4">

                <div className="flex items-center gap-3">

                    <div className="w-6 h-6 rounded bg-green-500" />

                    Low

                </div>

                <div className="flex items-center gap-3">

                    <div className="w-6 h-6 rounded bg-yellow-500" />

                    Moderate

                </div>

                <div className="flex items-center gap-3">

                    <div className="w-6 h-6 rounded bg-orange-500" />

                    High

                </div>

                <div className="flex items-center gap-3">

                    <div className="w-6 h-6 rounded bg-red-600" />

                    Extreme

                </div>

            </div>

        </div>

    );

}