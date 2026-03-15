"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Stats = {
  totalTrades: number
  totalPnl: number
  winRate: number
  bestDay: number
  worstDay: number
}

export default function StatsSummary() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    const { data: trades } = await supabase
      .from("trades")
      .select("pnl, trade_date")
      .eq("user_id", user.id)

    if (!trades || trades.length === 0) {
      setStats({
        totalTrades: 0,
        totalPnl: 0,
        winRate: 0,
        bestDay: 0,
        worstDay: 0
      })
      setLoading(false)
      return
    }

    const totalTrades = trades.length
    const totalPnl = trades.reduce((sum, t) => sum + (t.pnl || 0), 0)
    const wins = trades.filter(t => t.pnl > 0).length
    const winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0

    // Group by date for best/worst day
    const dailyPnl: Record<string, number> = {}
    trades.forEach(t => {
      const date = t.trade_date || "unknown"
      dailyPnl[date] = (dailyPnl[date] || 0) + (t.pnl || 0)
    })

    const dailyValues = Object.values(dailyPnl)
    const bestDay = dailyValues.length > 0 ? Math.max(...dailyValues) : 0
    const worstDay = dailyValues.length > 0 ? Math.min(...dailyValues) : 0

    setStats({ totalTrades, totalPnl, winRate, bestDay, worstDay })
    setLoading(false)
  }

  if (loading) {
    return <div className="stats-summary">Loading stats...</div>
  }

  if (!stats) {
    return null
  }

  return (
    <div className="stats-summary">
      <StatCard label="Total Trades" value={stats.totalTrades.toString()} />
      <StatCard
        label="Total PnL"
        value={`$${stats.totalPnl.toFixed(2)}`}
        color={stats.totalPnl >= 0 ? "green" : "red"}
      />
      <StatCard
        label="Win Rate"
        value={`${stats.winRate.toFixed(1)}%`}
        color={stats.winRate >= 50 ? "green" : "red"}
      />
      <StatCard
        label="Best Day"
        value={`$${stats.bestDay.toFixed(2)}`}
        color="green"
      />
      <StatCard
        label="Worst Day"
        value={`$${stats.worstDay.toFixed(2)}`}
        color="red"
      />
    </div>
  )
}

function StatCard({
  label,
  value,
  color
}: {
  label: string
  value: string
  color?: "green" | "red"
}) {
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <span className={`stat-value ${color || ""}`}>{value}</span>
    </div>
  )
}
