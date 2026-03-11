"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  const nav = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Trades", href: "/dashboard/trades" },
    { name: "Analytics", href: "/dashboard/analytics" },
    { name: "Equity", href: "/dashboard/equity" },
    { name: "Psychology", href: "/dashboard/psychology" },
    { name: "AI Coach", href: "/dashboard/ai" },
    { name: "Leaderboard", href: "/dashboard/leaderboard" },
    { name: "Strategy Market", href: "/dashboard/strategy-marketplace" },
  ]

  return (

    <div style={{display:"flex",minHeight:"100vh",background:"#020817"}}>

      {/* Sidebar */}

      <aside
        style={{
          width:240,
          borderRight:"1px solid #1e293b",
          padding:20,
          background:"#020817"
        }}
      >

        <h2 style={{marginBottom:30,fontSize:20,fontWeight:600}}>
          Trader Journal
        </h2>

        <nav style={{display:"flex",flexDirection:"column",gap:6}}>

          {nav.map((item)=>{

            const active = pathname === item.href

            return (

              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding:"10px 14px",
                  borderRadius:8,
                  textDecoration:"none",
                  background: active ? "#0f172a" : "transparent",
                  color: active ? "white" : "#94a3b8",
                  fontSize:14
                }}
              >

                {item.name}

              </Link>

            )

          })}

        </nav>

      </aside>

      {/* Main */}

      <main style={{flex:1}}>

        {/* Topbar */}

        <div
          style={{
            height:60,
            borderBottom:"1px solid #1e293b",
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between",
            padding:"0 30px",
            background:"#020817"
          }}
        >

          <div style={{fontSize:18,fontWeight:600}}>
            Trading Dashboard
          </div>

          <div style={{color:"#94a3b8"}}>
            Logged In
          </div>

        </div>

        {/* Page */}

        <div style={{padding:30}}>
          {children}
        </div>

      </main>

    </div>

  )

}