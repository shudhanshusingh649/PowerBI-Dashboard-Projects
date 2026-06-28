import Hero from "../components/dashboard/Hero";
import ClimateOverview from "../components/dashboard/ClimateOverview";
import BackendStatus from "../components/dashboard/BackendStatus";
import Workflow from "../components/dashboard/Workflow";
import TemperatureTrend from "../components/dashboard/TemperatureTrend";
import Features from "../components/dashboard/Features";

export default function Dashboard() {

    return (

        <div className="space-y-8">

            <Hero />

            <ClimateOverview />

            <BackendStatus />

            <Workflow />

            <Features />

            <TemperatureTrend />

        </div>

    );

}