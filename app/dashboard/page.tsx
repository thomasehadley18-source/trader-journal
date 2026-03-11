"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { calculatePerformance } from "@/lib/performance"
import { calculateDrawdown } from "@/lib/drawdown"
import EquityChart from "@/components/charts/equity-chart"

export default function DashboardPage(){

const [trades,setTrades] = useState<any[]>([])
const [stats,setStats] = useState({
totalTrades:0,
winRate:"0",
expectancy:"0",
maxDrawdown:"0"
})

useEffect(()=>{

load()

},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)
.order("trade_date",{ascending:true})

const trades = data || []

setTrades(trades)

const perf = calculatePerformance(trades)
const dd = calculateDrawdown(trades)

setStats({
totalTrades:trades.length,
winRate:(perf.winRate*100).toFixed(1),
expectancy:perf.expectancy.toFixed(2),
maxDrawdown:dd.maxDrawdown.toFixed(2)
})

}

return(

<div style={{display:"flex",flexDirection:"column",gap:30}}>

<div className="grid grid-4">

<div className="card">
<div className="muted">Total Trades</div>
<div style={{fontSize:28,fontWeight:700}}>
{stats.totalTrades}
</div>
</div>

<div className="card">
<div className="muted">Win Rate</div>
<div style={{fontSize:28,fontWeight:700}}>
{stats.winRate}%
</div>
</div>

<div className="card">
<div className="muted">Expectancy</div>
<div style={{fontSize:28,fontWeight:700}}>
{stats.expectancy}
</div>
</div>

<div className="card">
<div className="muted">Max Drawdown</div>
<div style={{fontSize:28,fontWeight:700}}>
{stats.maxDrawdown}
</div>
</div>

</div>

<div className="card">

<h2 style={{marginBottom:20}}>Equity Curve</h2>

<EquityChart trades={trades} />

</div>

</div>

)

}