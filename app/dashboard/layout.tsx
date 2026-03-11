"use client"

import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020817", color: "white" }}>
      <aside
        style={{
          width: "240px",
          background: "#020817",
          borderRight: "1px solid #1e293b",
          padding: "24px",
          color: "white",
        }}
      >
        <h2 style={{ margin: "0 0 24px 0" }}>Trader Journal</h2>

        <nav style={{ display: "grid", gap: "14px" }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/trades">Trades</Link>
          <Link href="/dashboard/analytics">Analytics</Link>
          <Link href="/dashboard/ai">AI Coach</Link>
          <Link href="/dashboard/ai-analysis">AI Analysis</Link>
          <Link href="/dashboard/institutional-analytics">Institutional Analytics</Link>
          <Link href="/marketplace">Strategy Marketplace</Link>
          <Link href="/dashboard/publish-strategy">Publish Strategy</Link>
          <Link href="/profile">Trader Profile</Link>
          <Link href="/dashboard/tradingview">TradingView Auto Journal</Link>
          <Link href="/dashboard/import">Import Trades</Link>
        </nav>
      </aside>

      <main style={{ flex: 1, background: "#020817" }}>
        {children}
      </main>
    </div>
  )
}