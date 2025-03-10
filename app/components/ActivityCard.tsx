
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import Image from "next/image";


export function ActivityCard(
  { title = "Baseball", 
    description = "Deploy a baseball and deposit it in a glove. Repeat.",
    count,
    rating,
    cost,
    duration,
    lastCompleted,
    image
  }: 
    { title?: string, 
      description?: string,
      count?: number,
      rating?: number,
      cost?: number,
      duration?: number,
      lastCompleted?: string,
      image?: string
    },
) {

  const getImageUrl = (key: string) => {
    if (key.startsWith("https://")) {
      return key;
    }
    const url = `https://amplify-d2e7zdl8lpqran-ma-robdayimagesbuckete97c22-bwldlxhxdd4t.s3.us-east-1.amazonaws.com/${key}`;
    return url;
  }

  
  return (
    <Card className="w-full md:w-[350px] overflow-auto">
      <Popover >
        <PopoverTrigger>
          <CardHeader>
            <CardTitle className="text-left">{title}</CardTitle>
            <CardDescription className="text-left">{description}</CardDescription>
          </CardHeader>
        </PopoverTrigger>
        <PopoverContent sideOffset={4}>
          <div className="grid w-full gap-4">
            <CardTitle>{title}</CardTitle>
            <div className="flex flex-col space-y-3">
              {image ? <Image
                src={getImageUrl(image)}
                alt={title}
                width={300}
                height={200}
                /> : <Skeleton className="w-[200px] h-[70px] rounded-b-sm" />}
            </div>
            <CardDescription >{description}</CardDescription>
            <Separator />
            <CardDescription >Times Completed: {count}</CardDescription>
            <CardDescription >Average Rating: {rating}</CardDescription>
            <CardDescription> Average Cost: ${cost}</CardDescription>
            <CardDescription> Average Duration: {duration} hours</CardDescription>
            <CardDescription> Last completed: {lastCompleted}</CardDescription>
            <CardDescription>{image}</CardDescription>
          </div>
        </PopoverContent>
      </Popover>

      {/* <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>s
        </form>
      </CardContent> */}
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  )
}