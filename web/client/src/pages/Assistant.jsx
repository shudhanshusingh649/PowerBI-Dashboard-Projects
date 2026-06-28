import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { 
    Terminal, 
    Bot, 
    User, 
    Send, 
    Activity, 
    Cpu,
    Loader2
} from "lucide-react";
import toast from "react-hot-toast";

// Upgraded Neural Responses for the Hackathon
const replies = {
    "why is patna hotter?":
        "Analyzing thermal topography for Patna, Bihar... Urban heat island effect detected. Low vegetation index in built-up sectors combined with dense concrete infrastructure is trapping surface heat. Recommended mitigation: High-albedo cool roofs and targeted afforestation.",
    "how to reduce heat?":
        "Executing mitigation algorithms... 1. Deploy reflective roofing on municipal structures. 2. Increase green canopy coverage by 15% in high-risk zones. 3. Restore local water bodies for evaporative cooling.",
    "default":
        "SYSTEM READY. I am equipped to analyze XGBoost rainfall predictions, thermal anomalies, heat risk indices, and output spatial mitigation strategies."
};

export default function Assistant() {
    const containerRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState([
        {
            user: false,
            text: "UPLINK ESTABLISHED. I am ClimateTwin AI. Awaiting telemetry queries..."
        }
    ]);

    const [input, setInput] = useState("");

    // GSAP Mount Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, scale: 0.98 },
                { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
            );
        });
        return () => ctx.revert();
    }, []);

    // Auto-scroll to the bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const send = (e) => {
        if (e) e.preventDefault();
        
        if (!input.trim()) {
            toast.error("QUERY EMPTY: Please enter a parameter.", {
                style: { background: '#FF5500', color: '#fff' }
            });
            return;
        }

        const userText = input.trim();
        setInput("");

        // Append User Message
        setMessages(prev => [...prev, { user: true, text: userText }]);
        setIsTyping(true);

        // Simulate AI Processing Time
        setTimeout(() => {
            const reply = replies[userText.toLowerCase()] || replies.default;
            
            setMessages(prev => [...prev, { user: false, text: reply }]);
            setIsTyping(false);
            toast.success("Query resolved.", {
                style: { background: '#040B16', color: '#00F0FF', border: '1px solid #00F0FF' }
            });
        }, 1200);
    };

    return (
        <div ref={containerRef} className="flex h-[calc(100vh-100px)] w-full flex-col text-white">
            
            {/* Terminal Header */}
            <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="font-[Rajdhani] text-4xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9D00FF] uppercase flex items-center gap-3">
                        <Cpu className="text-[#9D00FF]" size={36} />
                        Neural Assistant
                        <span className="h-6 w-3 bg-[#9D00FF] animate-[pulse_1s_step-end_infinite]" />
                    </h1>
                    <p className="mt-2 text-sm font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Activity size={14} className="text-[#00FF66]" />
                        NLP Interface linked to XGBoost Climate Models
                    </p>
                </div>
            </div>

            {/* Chat Interface Container */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-[#0B192C]/60 backdrop-blur-md border border-[#9D00FF]/30 shadow-[0_0_30px_rgba(157,0,255,0.05)]">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between bg-black/40 px-6 py-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <Terminal size={16} className="text-[#9D00FF]" />
                        <span className="font-mono text-xs tracking-widest text-slate-400">CLIMATETWIN // ROOT</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
                        <span className="font-mono text-[10px] tracking-widest text-[#00FF66]">ONLINE</span>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#9D00FF]/50 scrollbar-track-transparent">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.user ? 'justify-end' : 'justify-start'}`}>
                            
                            <div className={`flex max-w-[80%] items-start gap-4 ${msg.user ? 'flex-row-reverse' : 'flex-row'}`}>
                                
                                {/* Avatar */}
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border shadow-inner ${
                                    msg.user 
                                    ? 'bg-[#00F0FF]/10 border-[#00F0FF]/30 text-[#00F0FF]' 
                                    : 'bg-[#9D00FF]/10 border-[#9D00FF]/30 text-[#9D00FF]'
                                }`}>
                                    {msg.user ? <User size={20} /> : <Bot size={20} />}
                                </div>

                                {/* Message Bubble */}
                                <div className={`flex flex-col ${msg.user ? 'items-end' : 'items-start'}`}>
                                    <span className="mb-1 font-mono text-[10px] tracking-widest text-slate-500">
                                        {msg.user ? 'OPERATOR' : 'CLIMATETWIN AI'}
                                    </span>
                                    <div className={`rounded-xl px-5 py-3 text-sm leading-relaxed shadow-lg ${
                                        msg.user 
                                        ? 'bg-[#00F0FF] text-black font-semibold rounded-tr-none' 
                                        : 'bg-[#040B16]/80 border border-white/10 text-slate-200 font-mono rounded-tl-none'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>

                            </div>

                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="flex max-w-[80%] items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#9D00FF]/30 bg-[#9D00FF]/10 text-[#9D00FF] shadow-inner">
                                    <Bot size={20} />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="mb-1 font-mono text-[10px] tracking-widest text-slate-500">
                                        CLIMATETWIN AI
                                    </span>
                                    <div className="rounded-xl rounded-tl-none border border-white/10 bg-[#040B16]/80 px-5 py-3 shadow-lg flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-[#9D00FF]" />
                                        <span className="font-mono text-xs text-slate-400">PROCESSING QUERY...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Invisible div to scroll to */}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-black/40 p-4 border-t border-white/5">
                    <form 
                        onSubmit={send}
                        className="flex items-center gap-3 rounded-xl bg-[#040B16]/80 border border-white/10 p-2 focus-within:border-[#9D00FF]/50 focus-within:ring-1 focus-within:ring-[#9D00FF]/50 transition-all"
                    >
                        <div className="pl-2">
                            <Terminal size={18} className="text-slate-500" />
                        </div>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a command or question..."
                            className="flex-1 bg-transparent py-2 px-2 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none"
                            disabled={isTyping}
                        />
                        <button
                            type="submit"
                            disabled={isTyping || !input.trim()}
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#9D00FF] text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}