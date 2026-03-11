"use client"

import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <div style={{ display: "flex", minHeight: "100vh" }}>

      <aside
        style={{
          width: "220px",
          background: "#020817",
          borderRight: "1px solid #1e293b",
          padding: "20px",
          color: "white",
        }}
      >

        <h2 style={{ marginBottom: 20 }}>
          Trader Journal
        </h2>

        <nav style={{ display: "grid", gap: 12 }}>

          <Link href="/dashboard">Dashboard</Link>

          <Link href="/dashboard/trades">Trades</Link>

          <Link href="/dashboard/analytics">Analytics</Link>

          <Link href="/dashboard/ai-analysis">AI Analysis</Link>

          <Link href="/marketplace">Strategy Marketplace</Link>

          <Link href="/dashboard/publish-strategy">
            Publish Strategy
          </Link>

          <Link href="/profile">Trader Profile</Link>

        </nav>

      </aside>

      <main style={{ flex: 1, background: "#020817" }}>
        {children}
      </main>

    </div>
  )
}