"use client"

import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

export function WeekdayChart({ data }: { data: any[] }) {
  return (
    <ChartContainer
      config={{
        pnl: {
          label: "Day of Week",
          color: "hsl(var(--primary))",
        },
      }}
      className="w-full h-[260px]"
    >
      <BarChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="pnl" fill="hsl(var(--primary))" />
      </BarChart>
    </ChartContainer>
  )
}
