import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"




export function ActivityCard(
  { title = "Baseball", description = "Deploy a baseball and deposit it in a glove. Repeat." }: { title?: string, description?: string },
) {
  return (
    <Card className="md:w-[350px]">
      <Popover>
        {/* <HoverCard>
        <HoverCardTrigger>
        <HoverCardContent>
        <div className="grid w-full items-center gap-4">
          {title}
          {description}
        </div>
        </HoverCardContent>
      </HoverCardTrigger>
      </HoverCard> */}
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
              <Skeleton className="w-[200px] h-[70px] rounded-b-sm" />
            </div>
            <CardDescription >{description}</CardDescription>
            <Separator />
            <CardDescription >Times Completed: 5</CardDescription>
            <CardDescription >Average Rating: 8</CardDescription>
            <CardDescription> Average Cost: $10</CardDescription>
            <CardDescription> Average Duration: 2 hours</CardDescription>
            <CardDescription> Last completed: 3/3/25 - Robday #34</CardDescription>
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