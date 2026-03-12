"use client"

import Link from "next/link"
import Sidebar from "@/components/dashboard/sidebar"

const mobileLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/trades", label: "Trades" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/equity", label: "Equity" },
  { href: "/dashboard/risk", label: "Risk" },
  { href: "/dashboard/prop-firms", label: "Prop Firms" },
  { href: "/marketplace", label: "Strategy Market" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="page-wrap">
      <Sidebar />

      <main className="main-shell">
        <div className="mobile-nav">
          {mobileLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        {children}
      </main>
    </div>
  )
}