// import { ActivityCard } from "@/app/components/ActivityCard";
import { 
    cookiesClient } from "@/utils/amplify-utils";
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion"
// import AddActivityForm from "@/app/components/AddActivityForm";
import { CardGrid } from '@/app/components/CardGrid'


interface DriftingCardProps {
    title: string;
    description: string;
    imageUrl: string;
    column_start: number;
    row_start: number;
    index?: number;
  }

export default async function Page() {
    
    const { data: activities } = await cookiesClient.models.Activity.list();
    let driftingCardProps: DriftingCardProps[] = []
    activities.forEach((activity, index) => {
        driftingCardProps.push({
            title: activity.name ?? "",
            description: activity.description ?? "",
            imageUrl: activity.image ?? "",
            column_start: 1 + (index % 4),
            row_start: 1 + (index % 3),
            index: index
        })
    })

    return (
        <div className="overflow-hidden overscroll-none touch-none">
            <h1 className="text-2xl font-bold">ACTIVITIES</h1>
            <div className="align-center h-full items-center justify-center flex flex-col gap-2">
                <CardGrid activities={driftingCardProps}/>
                {/* <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="bg-slate-600 text-white rounded px-4 py-2">Create New Activity</AccordionTrigger>
                        <AccordionContent className="bg-stone-950 p-4">
                            <AddActivityForm />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                {activities.map(activity =>
                    <ActivityCard
                        key={activity.id}
                        title={activity.name ?? ""}
                        description={activity.description ?? ""}
                        count={activity.count ?? 0}
                        rating={activity.rating ?? 0}
                        cost={activity.cost ?? 0}
                        duration={activity.duration ?? 0}
                        image={activity.image ?? ""}
                    />
                )} */}
            </div>
        </div>
    );
}