import { Send } from "lucide-react";

export default function ChatInput({

    value,

    setValue,

    send

}) {

    return (

        <div className="flex gap-3">

            <input

                className="flex-1 rounded-2xl border p-4"

                placeholder="Ask ClimateTwin AI..."

                value={value}

                onChange={(e) => setValue(e.target.value)}

            />

            <button

                onClick={send}

                className="rounded-2xl bg-blue-600 px-6 text-white"

            >

                <Send />

            </button>

        </div>

    );

}