"use client"

import Link from "next/link"

export default function DashboardLayout({
children,
}:{
children:React.ReactNode
}){

return(

<div style={{
display:"flex",
minHeight:"100vh",
background:"#020817",
color:"white"
}}>

<aside style={{
width:"250px",
padding:"24px",
borderRight:"1px solid #1e293b"
}}>

<h2 style={{marginBottom:"28px"}}>
Trader Journal
</h2>

<nav style={{display:"grid",gap:"14px"}}>

<Link href="/dashboard">Dashboard</Link>

<Link href="/dashboard/trades">Trades</Link>

<Link href="/dashboard/analytics">Analytics</Link>

<Link href="/dashboard/equity">Equity Curve</Link>

<Link href="/dashboard/psychology">Psychology</Link>

<Link href="/dashboard/strategy-detection">Strategy Detection</Link>

<Link href="/dashboard/institutional-analytics">Institutional Analytics</Link>

<Link href="/dashboard/ai">AI Coach</Link>

<Link href="/dashboard/ai-analysis">AI Analysis</Link>

<Link href="/dashboard/leaderboard">Leaderboard</Link>

<Link href="/marketplace">Strategy Marketplace</Link>

<Link href="/dashboard/publish-strategy">Publish Strategy</Link>

<Link href="/profile">Trader Profile</Link>

</nav>

</aside>

<main style={{flex:1}}>
{children}
</main>

</div>

)

}