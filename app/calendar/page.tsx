
import RobdayCalendar from "@/app/components/RobdayCalendar";


export default async function Page() {
    return (
        // <div >
        // {/* </div> */}
        <div className="align-center items-center justify-center flex flex-col gap-6 h-full">
        {/* <button className="mt-4 bg-slate-800 text-white rounded-lg px-4 py-2">Create New Robday Agenda</button> */}
        <RobdayCalendar />
        </div>
    );
}