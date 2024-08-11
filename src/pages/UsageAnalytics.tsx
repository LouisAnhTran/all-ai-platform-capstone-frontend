import React from "react"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Monitor } from "lucide-react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Linechart from "@/components/Linechart"

const chartData = [
  { month: "February", desktop: 86, mobile: 90 },
  { month: "March", desktop: 186, mobile: 80 },
  { month: "April", desktop: 305, mobile: 200 },
  { month: "May", desktop: 237, mobile: 120 },
  { month: "June", desktop: 73, mobile: 190 },
  { month: "July", desktop: 209, mobile: 130 },
  { month: "August", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Conversation",
    color: "#2563eb",
    icon: Monitor,
  },
  mobile: {
    label: "Documents",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const UsageAnalytics = () => {
  return (
    <div className="w-full h-full flex">
      <ResizablePanelGroup direction="vertical" className="w-full h-full">
        <ResizablePanel>
          <ChartContainer
            config={chartConfig}
            className="min-h-[200px] w-full h-full"
          >
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <Linechart></Linechart>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default UsageAnalytics
