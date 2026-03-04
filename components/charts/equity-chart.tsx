"use client"

import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

export function EquityCurve({ data }: { data: any[] }) {
  return (
    <ChartContainer
      config={{
        equity: {
          label: "Equity",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[300px] w-full"
    >
      <LineChart data={data}>
        <XAxis dataKey="date" hide />
        <YAxis hide />
        <Tooltip content={<ChartTooltip />} />
        <Line
          type="monotone"
          dataKey="equity"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
