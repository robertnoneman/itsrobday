import { ActivityCard } from "@/app/components/ActivityCard";
import { 
    // AuthGetCurrentUserServer, 
    cookiesClient } from "@/utils/amplify-utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { revalidatePath } from "next/cache";
import { uploadData } from 'aws-amplify/storage';



export default async function Page() {
    // const user = await AuthGetCurrentUserServer();
    const { data: activities } = await cookiesClient.models.Activity.list();

    const handleUploadData = async (file: File): Promise<void> => {
        'use server';
        await uploadData({
          path: `https://amplify-d2e7zdl8lpqran-ma-robdayimagesbuckete97c22-bwldlxhxdd4t.s3.us-east-1.amazonaws.com/picture-submissions/${file.name}`, 
          data: file,

        });
      }

    async function addActivity(data: FormData) {
        'use server';
        console.log(data)
        const name = data.get("name") as string;
        const description = data.get("description") as string;
        const categories = data.get("categories") as string;
        const image = data.get('image') as File;
        console.log("Image:", image);
        const result = await cookiesClient.models.Activity.create({
            name: name,
            description: description,
            categories: [categories],
            image: `picture-submissions/${image.name}`,
        });
        console.log("New Activity created:", result);
        const image_result = await handleUploadData(image); // updated to use the right input for image
        console.log("New Image created:", image_result);
        revalidatePath("/activities");
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">ACTIVITIES</h1>
            <p>Welcome to your activities page.</p>
            <div className="align-center items-center justify-center flex flex-col gap-2">
                {/* <button className="mt-4 bg-slate-600 text-white rounded px-4 py-2">Create New Activity</button>
                 */}
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="bg-slate-600 text-white rounded px-4 py-2">Create New Activity</AccordionTrigger>
                        <AccordionContent className="bg-stone-950 p-4">
                            <form action={addActivity}>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" className="bg-accent" />
                                    <label htmlFor="description">Description</label>
                                    <input type="text" name="description" id="description" className="bg-accent" />
                                    <label htmlFor="categories">Categories</label>
                                    <input type="text" name="categories" id="categories" className="bg-accent" />
                                    <label htmlFor="image">Image</label>
                                    <input type="file" name="image" id="image" className="bg-accent" />
                                    {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="picture">Picture</Label>
                                        <Input id="picture" type="file" />
                                    </div> */}
                                    <button className="bg-sky-900 text-gray-200 rounded-2xl p-2 hover:cursor-pointer w-40 self-center justify-self-center" type="submit">Add Activity</button>
                                </div>
                            </form>
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
                )}
            </div>
            {/* <ActivityCard title="Play darts" description="Throw pointy objects at a mounted cylinder." />
            <ActivityCard title="Go Bowling" description="Roll a heavy ball down a narrow alley and try to knock out the 10 bag guys hiding at the end of the hallway." />
            <ActivityCard title="Play Catch" description="Deploy a baseball and deposit it in a glove. Repeat." />
            <ActivityCard title="Cook ...Something!" description="Acquire consumable objects. Combine objects into a new, also edible object." />
            <ActivityCard title="Play Disc Golf" description="Throw a frisbee at a metal basket." /> */}
        </div>
    );
}