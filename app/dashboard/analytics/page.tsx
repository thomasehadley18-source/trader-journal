"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { WinLossChart } from "@/components/analytics/win-loss-chart"
import { PnLHistogram } from "@/components/analytics/pnl-histogram"
import { MonthlyChart } from "@/components/analytics/monthly-chart"
import { WeekdayChart } from "@/components/analytics/weekday-chart"
import { StatGrid } from "@/components/analytics/stat-grid"

export default function AnalyticsPage() {
  const [trades, setTrades] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase.from("trades").select("*").eq("user_id", user.id)
    setTrades(data || [])
  }

  const totalTrades = trades.length
  const wins = trades.filter((t) => t.pnl > 0).length
  const losses = totalTrades - wins

  const winRate = totalTrades ? Number(((wins / totalTrades) * 100).toFixed(1)) : 0

  const avgWin =
    wins > 0
      ? (trades.filter((t) => t.pnl > 0).reduce((a, b) => a + b.pnl, 0) / wins).toFixed(2)
      : 0

  const avgLoss =
    losses > 0
      ? (
          trades.filter((t) => t.pnl < 0).reduce((a, b) => a + b.pnl, 0) / losses
        ).toFixed(2)
      : 0

  // Histogram buckets
  const histogram = []
  const bucketSize = 50

  for (let i = -500; i <= 500; i += bucketSize) {
    histogram.push({
      bucket: `${i} to ${i + bucketSize}`,
      count: trades.filter((t) => t.pnl >= i && t.pnl < i + bucketSize).length,
    })
  }

  // Monthly PnL
  const monthly = {}
  trades.forEach((t) => {
    const m = new Date(t.trade_date).toLocaleString("default", { month: "short" })
    monthly[m] = (monthly[m] || 0) + t.pnl
  })
  const monthlyData = Object.keys(monthly).map((m) => ({ month: m, pnl: monthly[m] }))

  // Day of Week
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const weekdayData = weekdays.map((d, i) => ({
    day: d,
    pnl: trades
      .filter((t) => new Date(t.trade_date).getDay() === i)
      .reduce((a, b) => a + b.pnl, 0),
  }))

  return (
    <div className="space-y-10">

      <StatGrid
        stats={{
          totalTrades,
          winRate,
          avgWin,
          avgLoss,
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <WinLossChart wins={wins} losses={losses} />
        <PnLHistogram data={histogram} />
      </div>

      <MonthlyChart data={monthlyData} />

      <WeekdayChart data={weekdayData} />

    </div>
  )
}
