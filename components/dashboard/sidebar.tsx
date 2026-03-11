"use client"

import Link from "next/link"

export default function Sidebar(){

return(

<div
style={{
width:230,
height:"100vh",
background:"#020817",
borderRight:"1px solid #1e293b",
padding:20,
display:"flex",
flexDirection:"column",
gap:16,
position:"fixed",
left:0,
top:0
}}
>

<h2
style={{
marginBottom:20,
fontSize:20
}}
>
Trader Journal
</h2>

<Link href="/dashboard">Dashboard</Link>
<Link href="/dashboard/trades">Trades</Link>
<Link href="/dashboard/analytics">Analytics</Link>
<Link href="/dashboard/equity">Equity Curve</Link>
<Link href="/dashboard/risk">Risk Analytics</Link>
<Link href="/dashboard/patterns">Patterns</Link>
<Link href="/dashboard/strategy-builder">Strategy Builder</Link>
<Link href="/dashboard/trade-review">AI Trade Review</Link>
<Link href="/dashboard/prop-firms">Prop Firms</Link>
<Link href="/dashboard/import">Import Trades</Link>
<Link href="/dashboard/ai">AI Coach</Link>

<Link href="/feed">Trader Feed</Link>
<Link href="/copy-trading">Copy Trading</Link>
<Link href="/leaderboard">Leaderboard</Link>
<Link href="/profile">Profile</Link>

</div>

)

}