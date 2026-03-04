"use client"

import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

export function MonthlyChart({ data }: { data: any[] }) {
  return (
    <ChartContainer
      config={{
        pnl: {
          label: "Monthly PnL",
          color: "hsl(var(--primary))",
        },
      }}
      className="w-full h-[280px]"
    >
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="pnl" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
