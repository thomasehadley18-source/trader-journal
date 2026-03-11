"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/trades", label: "Trades" },
    { href: "/dashboard/analytics", label: "Analytics" },
    { href: "/dashboard/equity", label: "Equity" },
    { href: "/dashboard/psychology", label: "Psychology" },
    { href: "/dashboard/ai", label: "AI Coach" },
    { href: "/dashboard/ai-analysis", label: "AI Analysis" },
    { href: "/dashboard/strategy-detection", label: "Strategy Detection" },
    { href: "/dashboard/institutional-analytics", label: "Institutional Analytics" },
    { href: "/dashboard/leaderboard", label: "Leaderboard" },
    { href: "/strategy-marketplace", label: "Strategy Marketplace" },
    { href: "/profile", label: "Profile" },
  ]

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#020817",
        color: "white",
      }}
    >
      <aside
        className="sidebar"
        style={{
          width: 260,
          padding: 24,
        }}
      >
        <h2 style={{ margin: "0 0 24px 0", color: "white" }}>Trader Journal</h2>

        <nav style={{ display: "grid", gap: 8 }}>
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "active-link" : ""}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 30 }}>{children}</main>
    </div>
  )
}