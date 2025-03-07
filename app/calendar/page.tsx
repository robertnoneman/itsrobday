
import RobdayCalendar from "@/app/components/RobdayCalendar";


export default async function Page() {
    return (
        <div >
        <h1 className="text-2xl font-bold">CALENDAR</h1>
        <p>Welcome to your calendar page.</p>
        <div className="align-center items-center justify-center flex flex-col gap-6">
        <button className="mt-4 bg-slate-600 text-white rounded px-4 py-2">Create New Robday Agenda</button>
        <RobdayCalendar />
        </div>
        </div>
    );
}