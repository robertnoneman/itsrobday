import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"


export function RobdayLogCard(
  { robdayNumber = "Robday 1", date = "March 3, 2025", activities = [] }: { robdayNumber?: string, date?: string, activities?: string[] },
) {
  return (
    <Card className="md:w-[350px]">
      <CardHeader>
        <CardTitle>{robdayNumber}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center p-6">
        {activities.length === 0 ? (
          <Skeleton className="px-14 w-60 h-16" />
        ) : (
          activities.map((activity) => (
            <div key={activity}>
              <CardDescription>{activity}</CardDescription>
              <Separator />
            </div>
          ))
        )}
      </CardContent>
      <CardFooter>
        <button className="w-1/2 bg-blue-500 text-white rounded px-2 py-1">Edit</button>
      </CardFooter>
    </Card>
  );
}

