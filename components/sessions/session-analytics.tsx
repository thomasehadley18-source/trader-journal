"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

import { StatCard } from "@/components/ui/stat-card"
import { WinLossChart } from "@/components/analytics/win-loss-chart"
import { PnLHistogram } from "@/components/analytics/pnl-histogram"
import { EquityCurve } from "@/components/charts/equity-chart"

export function SessionAnalytics({ session }: { session: string }) {
  const [trades, setTrades] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [session])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    let query = supabase.from("trades").select("*").eq("user_id", user.id)

    if (session !== "All") {
      query = query.contains("sessions_active", [session])
    }

    const { data } = await query
    setTrades(data || [])
  }

  const total = trades.length
  const wins = trades.filter((t) => t.pnl > 0).length
  const winRate = total ? ((wins / total) * 100).toFixed(1) : 0

  const avgWin =
    wins > 0
      ? (
          trades.filter((t) => t.pnl > 0).reduce((a, b) => a + b.pnl, 0) / wins
        ).toFixed(2)
      : 0

  const losses = trades.filter((t) => t.pnl < 0)
  const avgLoss =
    losses.length > 0
      ? (losses.reduce((a, b) => a + b.pnl, 0) / losses.length).toFixed(2)
      : 0

  // Equity Curve
  let running = 0
  const equityData = trades.map((t) => {
    running += t.pnl
    return {
      date: new Date(t.trade_date).toLocaleDateString(),
      equity: running,
    }
  })

  // Histogram
  const histogram = []
  const bucket = 50
  for (let i = -500; i <= 500; i += bucket) {
    histogram.push({
      bucket: `${i} to ${i + bucket}`,
      count: trades.filter((t) => t.pnl >= i && t.pnl < i + bucket).length,
    })
  }

  return (
    <div className="space-y-10 mt-6">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Trades" value={total} />
        <StatCard title="Win Rate" value={`${winRate}%`} />
        <StatCard title="Avg Win" value={avgWin} />
        <StatCard title="Avg Loss" value={avgLoss} />
      </div>

      <div className="border border-border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-4">Equity Curve</h2>
        <EquityCurve data={equityData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <WinLossChart wins={wins} losses={total - wins} />
        <PnLHistogram data={histogram} />
      </div>
    </div>
  )
}
