"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Monitor, Smartphone, TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
]

const baseBallData = [{ month: "january", desktop: 1260, mobile: 570 }]



const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "#2563eb",
		icon: Monitor,
	},
	mobile: {
		label: "Mobile",
		color: "#60a5fa",
		icon: Smartphone,
	},
} satisfies ChartConfig

const baseBallChartConfig = {
	desktop: {
    label: "RobO",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "RobN",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export function RobdayChart() {
	
	return (
		<ChartContainer config={chartConfig} className="min-h-[100px] md:min-h-[200px] w-full">
			<BarChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="month"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
				<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
			</BarChart>
		</ChartContainer>
	)
}

export function RobdayRadialChart() {
	const totalVisitors = chartData[0].desktop + chartData[0].mobile
	return (
	<Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Baseball Stats</CardTitle>
        <CardDescription>March 2024 - March 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={baseBallChartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={baseBallData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Runs
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="desktop"
              stackId="a"
              cornerRadius={5}
              fill="#2563eb"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              fill="#60a5fa"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
	)
}