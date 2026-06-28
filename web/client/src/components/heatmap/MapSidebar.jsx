import {
    MapPin,
    Brain,
} from "lucide-react";

export default function MapSidebar({

    position,

    loading,

    predict

}) {

    return (

        <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-2xl font-black">

                Location

            </h2>

            <div className="mt-6 space-y-3">

                <p>

                    <strong>Latitude</strong>

                    <br />

                    {position.lat.toFixed(4)}

                </p>

                <p>

                    <strong>Longitude</strong>

                    <br />

                    {position.lng.toFixed(4)}

                </p>

            </div>

            <button

                onClick={predict}

                className="mt-8 w-full rounded-xl bg-blue-600 text-white py-4 flex justify-center gap-3"

            >

                <Brain />

                {

                    loading

                        ?

                        "Predicting..."

                        :

                        "Predict Here"

                }

            </button>

        </div>

    );

}