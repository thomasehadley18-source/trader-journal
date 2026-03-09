"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { calculatePerformance } from "@/lib/performance"
import { calculateDrawdown } from "@/lib/drawdown"
import EquityCurve from "@/components/dashboard/equity-curve"
import StatCard from "@/components/dashboard/stat-card"

export default function DashboardPage() {
  const [trades, setTrades] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user?.id)
      .order("trade_date", { ascending: true })

    const list = data || []

    setTrades(list)

    const perf = calculatePerformance(list)
    const dd = calculateDrawdown(list)

    setStats({
      totalTrades: list.length,
      winRate: (perf.winRate * 100).toFixed(1),
      expectancy: perf.expectancy.toFixed(2),
      maxDrawdown: dd.maxDrawdown.toFixed(2),
    })
  }

  if (!stats) return <div className="p-6">Loading dashboard...</div>

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-bold">
        Pro Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4">

        <StatCard
          label="Total Trades"
          value={stats.totalTrades}
        />

        <StatCard
          label="Win Rate"
          value={`${stats.winRate}%`}
        />

        <StatCard
          label="Expectancy"
          value={stats.expectancy}
        />

        <StatCard
          label="Max Drawdown"
          value={stats.maxDrawdown}
        />

      </div>

      <EquityCurve trades={trades} />

    </div>
  )
}