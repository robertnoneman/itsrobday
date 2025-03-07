// "use client";

import { RobdayLogCard } from "../components/RobdayLogCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"

export function RobdayLogCarousel () {
  
	return (
		<Carousel
			opts={{
				align: "start",
        loop: true
			}}
			className="w-full max-w-[300px] mx-auto "
      orientation="vertical"
		>
			<CarouselContent className=" -mt-1 h-[50vh]">
				<CarouselItem className="pt-1 md:basis-1/2">
					<RobdayLogCard />
				</CarouselItem>
				<CarouselItem className="pt-1 md:basis-1/2">
					<RobdayLogCard robdayNumber={"Robday 2"} date="January 3rd, 2025" activities={["Retook the Capitol", "Played Darts", "Ate at Republic Cantina"]} />
				</CarouselItem>
				<CarouselItem className="pt-1 md:basis-1/2">
					<RobdayLogCard robdayNumber={"Robday 3"} date="January 10th, 2025" activities={["Visited the Museum", "Went Hiking", "Read a Book"]} />
				</CarouselItem>
        <CarouselItem className="pt-1 md:basis-1/2">
					<RobdayLogCard robdayNumber={"Robday 4"} date="January 17th, 2025" activities={["Didn't happen", "Went Hiking", "It snowed"]} />
				</CarouselItem>
        <CarouselItem className="pt-1 md:basis-1/2">
					<RobdayLogCard robdayNumber={"Robday 5"} date="January 24th, 2025" activities={["Had a ball", "Had a time", "Had a hoot"]} />
				</CarouselItem>
			</CarouselContent>
			<CarouselPrevious className="z-50" />
			<CarouselNext className="z-50" />
		</Carousel>
	);
}