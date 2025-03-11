import { RobdayChart, RobdayRadialChart } from "../components/RobdayChart";



export default function Page() {
    return (
        <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard.</p>
        <RobdayChart />
        <RobdayRadialChart />
        </div>
    );
}