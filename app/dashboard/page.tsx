"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import EquityChart from "@/components/charts/equity-chart"

export default function DashboardPage() {
  const [stats, setStats] = useState<any>({
    balance: 0,
    profit: 0,
    trades: 0,
    winrate: "0.0",
  })

  const [chart, setChart] = useState<any[]>([])

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
      .order("trade_date", { ascending: true })

    const trades = data || []

    let wins = 0
    let balance = 0
    let profit = 0

    const equity = trades.map((trade) => {
      if (trade.pnl > 0) wins++
      profit += Number(trade.pnl || 0)
      balance += Number(trade.pnl || 0)

      return {
        date: new Date(trade.trade_date).toLocaleDateString(),
        balance,
      }
    })

    setStats({
      balance,
      profit,
      trades: trades.length,
      winrate: ((wins / (trades.length || 1)) * 100).toFixed(1),
    })

    setChart(equity)
  }

  return (
    <div>
      <h1>Trading Dashboard</h1>

      <div className="grid-4">
        <div className="card">
          <div className="muted">Account Balance</div>
          <div className="stat">${stats.balance}</div>
        </div>

        <div className="card">
          <div className="muted">Total Profit</div>
          <div className="stat">${stats.profit}</div>
        </div>

        <div className="card">
          <div className="muted">Total Trades</div>
          <div className="stat">{stats.trades}</div>
        </div>

        <div className="card">
          <div className="muted">Win Rate</div>
          <div className="stat">{stats.winrate}%</div>
        </div>
      </div>

      <div className="grid-3" style={{ marginTop: 20 }}>
        <Link href="/dashboard/ai" className="card">
          <h3 style={{ marginTop: 0 }}>AI Coach</h3>
          <div className="muted">Chat-style guidance for your trading</div>
        </Link>

        <Link href="/dashboard/trade-review" className="card">
          <h3 style={{ marginTop: 0 }}>AI Trade Review</h3>
          <div className="muted">Review each trade automatically</div>
        </Link>

        <Link href="/dashboard/strategy-intelligence" className="card">
          <h3 style={{ marginTop: 0 }}>Strategy Intelligence</h3>
          <div className="muted">Find best pair, session, and strategy</div>
        </Link>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h2 style={{ marginTop: 0 }}>Equity Curve</h2>
        <EquityChart data={chart} />
      </div>

      <div className="grid-2" style={{ marginTop: 24 }}>
        <Link href="/dashboard/import" className="card">
          <h3 style={{ marginTop: 0 }}>Auto Import Trades</h3>
          <div className="muted">
            MT4, MT5, NinjaTrader, Tradovate, CSV
          </div>
        </Link>

        <Link href="/strategy-marketplace" className="card">
          <h3 style={{ marginTop: 0 }}>Strategy Market</h3>
          <div className="muted">
            Browse and publish strategies
          </div>
        </Link>
      </div>
    </div>
  )
}