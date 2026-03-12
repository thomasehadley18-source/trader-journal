"use client"

import Link from "next/link"

const links=[

{href:"/dashboard",label:"Dashboard"},
{href:"/dashboard/trades",label:"Trades"},
{href:"/dashboard/import",label:"Import Trades"},
{href:"/dashboard/analytics",label:"Analytics"},
{href:"/dashboard/equity",label:"Equity Curve"},
{href:"/dashboard/risk",label:"Risk Analytics"},

{href:"/dashboard/ai",label:"AI Coach"},
{href:"/dashboard/trade-review",label:"AI Trade Review"},
{href:"/dashboard/strategy-intelligence",label:"Strategy Intelligence"},

{href:"/dashboard/strategy-builder",label:"Strategy Builder"},
{href:"/strategy-marketplace",label:"Strategy Market"},

{href:"/leaderboard",label:"Leaderboard"},
{href:"/feed",label:"Trader Feed"},
{href:"/profile",label:"Profile"}

]

export default function Sidebar(){

return(

<aside className="sidebar">

<div className="sidebar-title">
Trader Journal
</div>

{links.map(link=>(
<Link key={link.href} href={link.href} className="sidebar-link">
{link.label}
</Link>
))}

</aside>

)

}