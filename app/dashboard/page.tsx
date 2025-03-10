import { RobdayChart, RobdayRadialChart } from "../components/RobdayChart";



export default function Page() {
    return (
        <div className="overflow-y-scroll">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard.</p>
        <RobdayChart />
        <RobdayRadialChart />
        </div>
    );
}