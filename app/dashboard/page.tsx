"use client"

import Link from "next/link"

const sections = [
{
title:"Trade Journal",
items:[
{href:"/dashboard/trades",label:"Trades"},
{href:"/dashboard/calendar",label:"Calendar"},
{href:"/dashboard/import",label:"Broker Import"},
{href:"/dashboard/trade-replay",label:"Trade Replay"},
]
},

{
title:"Analytics",
items:[
{href:"/dashboard/analytics",label:"Analytics"},
{href:"/dashboard/performance",label:"Performance"},
{href:"/dashboard/equity",label:"Equity Curve"},
{href:"/dashboard/session",label:"Session Analytics"},
{href:"/dashboard/patterns",label:"Patterns"},
]
},

{
title:"Strategy Intelligence",
items:[
{href:"/dashboard/strategy-heatmap",label:"Strategy Heatmap"},
{href:"/dashboard/strategy-detection",label:"Strategy Detection"},
{href:"/dashboard/strategy-intelligence",label:"Strategy Intelligence"},
{href:"/dashboard/strategy-builder",label:"Strategy Builder"},
]
},

{
title:"Risk + Mistakes",
items:[
{href:"/dashboard/mistakes",label:"Mistakes"},
{href:"/dashboard/risk",label:"Risk Analytics"},
{href:"/dashboard/trade-score",label:"Trade Score"},
]
},

{
title:"AI Tools",
items:[
{href:"/dashboard/ai",label:"AI Coach"},
{href:"/dashboard/trade-review",label:"AI Trade Review"},
{href:"/dashboard/ai-mistakes",label:"AI Mistake Detection"},
]
},

{
title:"Prop Firm Tools",
items:[
{href:"/dashboard/prop-firms",label:"Prop Firm Analytics"},
{href:"/dashboard/propfirm-rules",label:"Prop Firm Rules"},
]
},

{
title:"Community",
items:[
{href:"/strategy-marketplace",label:"Strategy Market"},
{href:"/copy-trading",label:"Copy Trading"},
{href:"/leaderboard",label:"Leaderboard"},
{href:"/competitions",label:"Competitions"},
{href:"/feed",label:"Trader Feed"},
]
}
]

export default function Dashboard(){

return(

<div>

<h1>Trading Dashboard</h1>

<div className="grid-3">

{sections.map(section=>(

<div className="card" key={section.title}>

<h3>{section.title}</h3>

<div style={{marginTop:10}}>

{section.items.map(item=>(

<Link
key={item.href}
href={item.href}
className="sidebar-link"
>
{item.label}
</Link>

))}

</div>

</div>

))}

</div>

</div>

)

}