"use client"

import Link from "next/link"
import { supabase } from "@/lib/supabase"

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/trades", label: "Trades" },
  { href: "/dashboard/calendar", label: "Calendar" },
  { href: "/dashboard/import", label: "Broker Import" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/performance", label: "Performance" },
  { href: "/dashboard/equity", label: "Equity Curve" },
  { href: "/dashboard/session", label: "Session Analytics" },
  { href: "/dashboard/patterns", label: "Patterns" },
  { href: "/dashboard/strategy-heatmap", label: "Strategy Heatmap" },
  { href: "/dashboard/strategy-detection", label: "Strategy Detection" },
  { href: "/dashboard/strategy-intelligence", label: "Strategy Intelligence" },
  { href: "/dashboard/trade-score", label: "Trade Score" },
  { href: "/dashboard/mistakes", label: "Mistakes" },
  { href: "/dashboard/risk", label: "Risk Analytics" },
  { href: "/dashboard/institutional-analytics", label: "Institutional Analytics" },
  { href: "/dashboard/trade-replay", label: "Trade Replay" },
  { href: "/dashboard/prop-firms", label: "Prop Firm Analytics" },
  { href: "/dashboard/propfirm-rules", label: "Prop Firm Rules" },
  { href: "/dashboard/ai", label: "AI Coach" },
  { href: "/dashboard/trade-review", label: "AI Trade Review" },
  { href: "/dashboard/strategy-builder", label: "Strategy Builder" },
  { href: "/strategy-marketplace", label: "Strategy Market" },
  { href: "/copy-trading", label: "Copy Trading" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/competitions", label: "Competitions" },
  { href: "/feed", label: "Community Feed" },
  { href: "/profile", label: "Profile" },
  { href: "/dashboard/ai-mistakes", label: "AI Mistake Detection" }
]

export default function Sidebar() {
  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <h2 style={{ marginBottom: 18 }}>Trader Journal</h2>

      <div style={{ flex: 1 }}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="sidebar-link">
            {link.label}
          </Link>
        ))}
      </div>

      <button
        onClick={logout}
        style={{ marginTop: 18, background: "#ef4444" }}
      >
        Logout
      </button>
    </div>
  )
}