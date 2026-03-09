"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { calculatePerformance } from "@/lib/performance"

export default function AnalyticsPage() {
  const [summary, setSummary] = useState({
    totalTrades: 0,
    winRate: "0.0",
    avgWin: "0.00",
    avgLoss: "0.00",
    expectancy: "0.00",
  })

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", user.id)

    const trades = data || []
    const perf = calculatePerformance(trades)

    setSummary({
      totalTrades: trades.length,
      winRate: (perf.winRate * 100).toFixed(1),
      avgWin: perf.avgWin.toFixed(2),
      avgLoss: perf.avgLoss.toFixed(2),
      expectancy: perf.expectancy.toFixed(2),
    })
  }

  return (
    <div className="grid-4">
      <div className="card">
        <div className="muted">Total Trades</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>{summary.totalTrades}</div>
      </div>

      <div className="card">
        <div className="muted">Win Rate</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>{summary.winRate}%</div>
      </div>

      <div className="card">
        <div className="muted">Average Win</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>{summary.avgWin}</div>
      </div>

      <div className="card">
        <div className="muted">Average Loss</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>{summary.avgLoss}</div>
      </div>

      <div className="card">
        <div className="muted">Expectancy</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>{summary.expectancy}</div>
      </div>
    </div>
  )
}