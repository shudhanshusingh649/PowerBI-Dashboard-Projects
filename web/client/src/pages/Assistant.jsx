import { useState } from "react";
import toast from "react-hot-toast";

import ChatBubble from "../components/assistant/ChatBubble";

import ChatInput from "../components/assistant/ChatInput";

const replies = {

    "why is patna hotter?":

        "Patna has dense urban development, relatively low vegetation in many built-up areas, and experiences strong summer heating. Increasing tree cover and cool roofs can help reduce local heat.",

    "how to reduce heat?":

        "Increase tree plantation, adopt cool roofs, restore lakes and ponds, and reduce concrete surfaces where possible.",

    "default":

        "I can explain rainfall predictions, temperature forecasts, heat risk, and climate mitigation strategies."

};

export default function Assistant() {

    const [messages, setMessages] = useState([

        {

            user: false,

            text: "Hello 👋 I am ClimateTwin AI. Ask me anything about climate predictions."

        }

    ]);

    const [input, setInput] = useState("");

    const send = () => {

        if (!input.trim()) {
            toast.error("Type a question first");
            return;
        }

        const userMessage = {

            user: true,

            text: input

        };

        const reply = replies[input.toLowerCase()] || replies.default;

        setMessages(prev => [

            ...prev,

            userMessage,

            {

                user: false,

                text: reply

            }

        ]);

        setInput("");

        toast.success("Assistant reply added");

    };

    return (

        <div className="space-y-6">

            <h1 className="text-4xl font-black">

                Climate AI Assistant

            </h1>

            <div className="bg-slate-100 rounded-3xl p-6 h-[600px] overflow-y-auto space-y-4">

                {

                    messages.map((msg, index) =>

                        <ChatBubble

                            key={index}

                            message={msg.text}

                            user={msg.user}

                        />

                    )

                }

            </div>

            <ChatInput

                value={input}

                setValue={setInput}

                send={send}

            />

        </div>

    );

}