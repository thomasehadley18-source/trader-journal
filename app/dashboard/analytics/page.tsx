"use client"

import { WinLossChart } from "@/components/analytics/win-loss-chart"
import { PnLHistogram } from "@/components/analytics/pnl-histogram"
import { MonthlyChart } from "@/components/analytics/monthly-chart"
import { WeekdayChart } from "@/components/analytics/weekday-chart"
import { StatGrid } from "@/components/analytics/stat-grid"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 p-6">

      <h1 className="text-2xl font-bold">
        Analytics
      </h1>

      <StatGrid />

      <div className="grid md:grid-cols-2 gap-6">
        <WinLossChart />
        <PnLHistogram />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <MonthlyChart />
        <WeekdayChart />
      </div>

    </div>
  )
}