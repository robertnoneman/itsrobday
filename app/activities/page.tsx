import { ActivityCard } from "@/app/components/ActivityCard";



export default async function Page() {
    return (
        <div>
            <h1 className="text-2xl font-bold">ACTIVITIES</h1>
            <p>Welcome to your activities page.</p>
            <ActivityCard title="Play darts" description="Throw pointy objects at a mounted cylinder." />
            <ActivityCard title="Go Bowling" description="Roll a heavy ball down a narrow alley and try to knock out the 10 bag guys hiding at the end of the hallway." />
            <ActivityCard title="Play Catch" description="Deploy a baseball and deposit it in a glove. Repeat." />
            <ActivityCard title="Cook ...Something!" description="Acquire consumable objects. Combine objects into a new, also edible object." />
            <ActivityCard title="Play Disc Golf" description="Throw a frisbee at a metal basket." />
        </div>
    );
}