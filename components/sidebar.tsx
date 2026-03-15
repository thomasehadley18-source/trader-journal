"use client"

import Link from "next/link"
import { supabase } from "@/lib/supabase"

const links = [

{href:"/dashboard",label:"Dashboard"},
{href:"/dashboard/trades",label:"Trades"},
{href:"/dashboard/calendar",label:"Calendar"},
{href:"/dashboard/import",label:"Broker Import"},
{href:"/dashboard/analytics",label:"Analytics"},
{href:"/dashboard/performance",label:"Performance"},
{href:"/dashboard/strategy-intelligence",label:"Strategy Intelligence"},
{href:"/dashboard/ai-mistakes",label:"AI Mistake Detection"},
{href:"/dashboard/trade-replay",label:"Trade Replay"},
{href:"/dashboard/screenshots",label:"Chart Annotations"},
{href:"/dashboard/prop-firms",label:"Prop Firm Analytics"},
{href:"/strategy-marketplace",label:"Strategy Market"},
{href:"/copy-trading",label:"Copy Trading"},
{href:"/leaderboard",label:"Leaderboard"}
{href:"/dashboard/monte-carlo",label:"Monte Carlo Risk"}
{href:"/dashboard/trade-review",label:"AI Trade Review"}



]

export default function Sidebar(){

async function logout(){
await supabase.auth.signOut()
window.location.href="/login"
}

return(

<div style={{display:"flex",flexDirection:"column",height:"100%"}}>

<h2 style={{marginBottom:20}}>
Trader Journal
</h2>

<div style={{flex:1}}>

{links.map(l=>(

<Link
key={l.href}
href={l.href}
className="sidebar-link"
>
{l.label}
</Link>

))}

</div>

<button
onClick={logout}
style={{
marginTop:20,
padding:"10px",
background:"#ef4444",
borderRadius:6
}}
>

Logout

</button>

</div>

)

}
