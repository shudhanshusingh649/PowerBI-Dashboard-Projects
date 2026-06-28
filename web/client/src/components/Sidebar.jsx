import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    ChartColumn,
    Brain,
    Map,
    Satellite,
    MessageSquareText,
    Sparkles
} from "lucide-react";

const menus = [

    {
        title:"Dashboard",
        path:"/",
        icon:<LayoutDashboard size={20}/>
    },

    {
        title:"Analytics",
        path:"/analytics",
        icon:<ChartColumn size={20}/>
    },

    {
        title:"Prediction",
        path:"/prediction",
        icon:<Brain size={20}/>
    },

    {
        title:"Heat Map",
        path:"/heatmap",
        icon:<Map size={20}/>
    },

    {
        title:"Recommendations",
        path:"/recommendations",
        icon:<Sparkles size={20}/>
    },

    {
        title:"Assistant",
        path:"/assistant",
        icon:<MessageSquareText size={20}/>
    },

    {
        title:"Digital Twin",
        path:"/simulator",
        icon:<Satellite size={20}/>
    }

];

export default function Sidebar(){

    return(

        <aside className="w-72 bg-[#081F3E] text-white flex flex-col">

            <div className="p-8 border-b border-blue-900">

                <h1 className="text-2xl font-black">

                    ClimateTwin AI

                </h1>

                <p className="text-blue-300 text-sm mt-2">

                    AI Powered Digital Twin

                </p>

            </div>

            <nav className="flex-1 px-5 py-8 space-y-2">

                {

                    menus.map(menu=>(

                        <NavLink

                        key={menu.title}

                        to={menu.path}

                        className={({isActive})=>

                        `flex items-center gap-3 rounded-xl px-4 py-3 transition

                        ${

                        isActive

                        ?"bg-blue-600"

                        :"hover:bg-blue-900"

                        }`

                        }

                        >

                            {menu.icon}

                            {menu.title}

                        </NavLink>

                    ))

                }

            </nav>

            <div className="p-5 border-t border-blue-900">

                <div className="text-green-400 font-semibold">

                    ● Backend Connected

                </div>

                <div className="text-xs text-blue-300 mt-2">

                    FastAPI + XGBoost

                </div>

            </div>

        </aside>

    );

}