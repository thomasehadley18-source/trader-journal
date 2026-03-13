"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    trades: 0,
    profit: 0,
    wins: 0,
    losses: 0,
  })

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

    const trades = data || []

    const wins = trades.filter((t: any) => Number(t.pnl || 0) > 0).length
    const losses = trades.filter((t: any) => Number(t.pnl || 0) < 0).length
    const profit = trades.reduce((a: number, b: any) => a + Number(b.pnl || 0), 0)

    setStats({
      trades: trades.length,
      profit,
      wins,
      losses,
    })
  }

  return (
    <div>
      <div className="grid-4">
        <div className="card">
          <div className="muted">Total Trades</div>
          <div className="stat">{stats.trades}</div>
        </div>

        <div className="card">
          <div className="muted">Net Profit</div>
          <div className="stat">{stats.profit.toFixed(2)}</div>
        </div>

        <div className="card">
          <div className="muted">Winning Trades</div>
          <div className="stat">{stats.wins}</div>
        </div>

        <div className="card">
          <div className="muted">Losing Trades</div>
          <div className="stat">{stats.losses}</div>
        </div>
      </div>

      <div className="grid-3" style={{ marginTop: 24 }}>
        <Link href="/dashboard/trades" className="card">
          <h3 style={{ marginBottom: 8 }}>Log Trades</h3>
          <div className="muted">Add trades, screenshots, notes</div>
        </Link>

        <Link href="/dashboard/import" className="card">
          <h3 style={{ marginBottom: 8 }}>Auto Import</h3>
          <div className="muted">MT4, MT5, NinjaTrader, TradingView</div>
        </Link>

        <Link href="/dashboard/calendar" className="card">
          <h3 style={{ marginBottom: 8 }}>Trading Calendar</h3>
          <div className="muted">Green winning days, red losing days</div>
        </Link>

        <Link href="/dashboard/performance" className="card">
          <h3 style={{ marginBottom: 8 }}>Performance</h3>
          <div className="muted">Win rate, profit factor, pair analytics</div>
        </Link>

        <Link href="/dashboard/strategy-intelligence" className="card">
          <h3 style={{ marginBottom: 8 }}>Strategy Intelligence</h3>
          <div className="muted">Best pairs, sessions, strategies</div>
        </Link>

        <Link href="/dashboard/propfirm-rules" className="card">
          <h3 style={{ marginBottom: 8 }}>Prop Firm Rules</h3>
          <div className="muted">Hidden rules, min hold, prohibited strategies</div>
        </Link>
      </div>
    </div>
  )
}