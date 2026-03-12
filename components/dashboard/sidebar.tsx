"use client"

import Link from "next/link"

const links=[

["Dashboard","/dashboard"],
["Trades","/dashboard/trades"],
["Calendar","/dashboard/calendar"],
["Session Analytics","/dashboard/session"],
["Risk Dashboard","/dashboard/risk"],
["Trade Streaks","/dashboard/streaks"],
["Mistake Detection","/dashboard/mistakes"],
["AI Strategy","/dashboard/ai-strategy"],
["AI Trade Score","/dashboard/trade-score"],
["AI Advisor","/dashboard/ai-advisor"],
["Trade Replay","/dashboard/replay"],
["Screenshots","/dashboard/screenshots"],
["Chart Overlay","/dashboard/overlay"]

]

export default function Sidebar(){

return(

<div style={{

width:230,
height:"100vh",
background:"#020817",
borderRight:"1px solid #1e293b",
padding:20,
display:"flex",
flexDirection:"column",
gap:12,
position:"fixed",
left:0,
top:0

}}>

<h2 style={{marginBottom:20}}>Trader Journal</h2>

{links.map(([name,url])=>(

<Link key={url} href={url}>
{name}
</Link>

))}

</div>

)

}