"use client"

import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

export function PnLHistogram({ data }: { data: any[] }) {
  return (
    <ChartContainer
      config={{
        pnl: {
          label: "PnL",
          color: "hsl(var(--primary))",
        },
      }}
      className="w-full h-[250px]"
    >
      <BarChart data={data}>
        <XAxis dataKey="bucket" />
        <YAxis />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="count" fill="hsl(var(--primary))" />
      </BarChart>
    </ChartContainer>
  )
}
