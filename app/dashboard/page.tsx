"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { calculatePerformance } from "@/lib/performance"
import { calculateDrawdown } from "@/lib/drawdown"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalTrades: 0,
    winRate: "0.0",
    expectancy: "0.00",
    maxDrawdown: "0.00",
  })
  const [email, setEmail] = useState("")

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user?.email) {
        setEmail(user.email)
      }

      if (!user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from("trades")
        .select("*")
        .eq("user_id", user.id)
        .order("trade_date", { ascending: true })

      const trades = data || []
      const perf = calculatePerformance(trades)
      const dd = calculateDrawdown(trades)

      setStats({
        totalTrades: trades.length,
        winRate: (perf.winRate * 100).toFixed(1),
        expectancy: perf.expectancy.toFixed(2),
        maxDrawdown: dd.maxDrawdown.toFixed(2),
      })
    } catch {
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020817",
          color: "white",
          padding: "40px",
        }}
      >
        Loading dashboard...
      </div>
    )
  }

  return (
    <div
      style={{
        padding: "40px",
        color: "white",
        background: "#020817",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>Trader Dashboard</h1>
        <p style={{ color: "#94a3b8" }}>
          {email ? `Logged in as ${email}` : "Dashboard loaded"}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div style={{ color: "#94a3b8" }}>Total Trades</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{stats.totalTrades}</div>
        </div>

        <div
          style={{
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div style={{ color: "#94a3b8" }}>Win Rate</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{stats.winRate}%</div>
        </div>

        <div
          style={{
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div style={{ color: "#94a3b8" }}>Expectancy</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{stats.expectancy}</div>
        </div>

        <div
          style={{
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div style={{ color: "#94a3b8" }}>Max Drawdown</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{stats.maxDrawdown}</div>
        </div>
      </div>
    </div>
  )
}