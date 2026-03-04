"use client"

import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { PieChart, Pie, Cell, Tooltip } from "recharts"

export function WinLossChart({ wins, losses }: { wins: number; losses: number }) {
  const data = [
    { name: "Wins", value: wins },
    { name: "Losses", value: losses },
  ]

  const COLORS = ["#10b981", "#ef4444"]

  return (
    <ChartContainer
      config={{
        wins: { label: "Wins", color: COLORS[0] },
        losses: { label: "Losses", color: COLORS[1] },
      }}
      className="w-full h-[250px]"
    >
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
      </PieChart>
    </ChartContainer>
  )
}
