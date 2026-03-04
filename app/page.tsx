"use client"

import { StatCard } from "@/components/ui/stat-card"
import { RecentTrades } from "@/components/dashboard/recent-trades"
import { EquityCurve } from "@/components/charts/equity-chart"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const [trades, setTrades] = useState<any[]>([])
  const [equityData, setEquityData] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)
      .order("trade_date")

    setTrades(data || [])

    // Build equity curve
    let running = 0
    const curve = (data || []).map((t) => {
      running += t.pnl
      return {
        date: new Date(t.trade_date).toLocaleDateString(),
        equity: running,
      }
    })

    setEquityData(curve)
  }

  const totalTrades = trades.length
  const wins = trades.filter((t) => t.pnl > 0).length
  const winRate = totalTrades ? ((wins / totalTrades) * 100).toFixed(1) : 0
  const totalPnL = trades.reduce((a, b) => a + b.pnl, 0).toFixed(2)

  return (
    <div className="space-y-8">

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Trades" value={totalTrades} />
        <StatCard title="Win Rate" value={`${winRate}%`} />
        <StatCard title="Total PnL" value={`${totalPnL}`} />
      </div>

      {/* EQUITY CURVE */}
      <div className="border border-border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-4">Equity Curve</h2>
        <EquityCurve data={equityData} />
      </div>

      {/* RECENT TRADES */}
      <RecentTrades />
    </div>
  )
}
