import { CalendarDays } from "lucide-react";

export default function Navbar(){

    const date=new Date().toLocaleDateString("en-IN",{

        weekday:"long",

        day:"numeric",

        month:"long",

        year:"numeric"

    });

    return(

        <header className="bg-white border-b px-8 py-5 shadow-sm">

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-3xl font-black text-slate-800">

                        AI Powered Digital Twin of India's Climate

                    </h2>

                    <p className="text-slate-500 mt-1">

                        Climate Intelligence Platform

                    </p>

                </div>

                <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-3">

                    <CalendarDays size={18}/>

                    <span>{date}</span>

                </div>

            </div>

        </header>

    );

}