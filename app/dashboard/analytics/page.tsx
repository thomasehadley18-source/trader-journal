"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { calculateAdvancedAnalytics } from "@/lib/advanced-analytics"
import { calculateInstitutionalMetrics } from "@/lib/institutional-metrics"

export default function AnalyticsPage(){

const [stats,setStats] = useState<any>(null)
const [inst,setInst] = useState<any>(null)

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

const trades = data || []

setStats(calculateAdvancedAnalytics(trades))
setInst(calculateInstitutionalMetrics(trades))

}

if(!stats || !inst){
return <div style={{padding:40}}>Loading...</div>
}

return(

<div style={{padding:40}}>

<h1>Advanced Trading Analytics</h1>

<h2 style={{marginTop:30}}>Performance Overview</h2>

<p>Total Wins: {stats.wins}</p>
<p>Total Losses: {stats.losses}</p>
<p>Win Rate: {(stats.winRate*100).toFixed(2)}%</p>
<p>Profit Factor: {stats.profitFactor.toFixed(2)}</p>

<h2 style={{marginTop:40}}>Institutional Metrics</h2>

<p>Expectancy: {inst.expectancy.toFixed(2)}</p>
<p>Average R Multiple: {inst.avgR.toFixed(2)}</p>
<p>Max Drawdown: {inst.maxDrawdown.toFixed(2)}</p>
<p>Sharpe Ratio: {inst.sharpe.toFixed(2)}</p>
<p>Risk of Ruin: {(inst.riskOfRuin*100).toFixed(4)}%</p>

<h2 style={{marginTop:40}}>Session Performance</h2>

<table>

<thead>
<tr>
<th>Session</th>
<th>Wins</th>
<th>Losses</th>
</tr>
</thead>

<tbody>

<tr>
<td>Asia</td>
<td>{stats.sessionStats.Asia.wins}</td>
<td>{stats.sessionStats.Asia.losses}</td>
</tr>

<tr>
<td>London</td>
<td>{stats.sessionStats.London.wins}</td>
<td>{stats.sessionStats.London.losses}</td>
</tr>

<tr>
<td>New York</td>
<td>{stats.sessionStats.NewYork.wins}</td>
<td>{stats.sessionStats.NewYork.losses}</td>
</tr>

</tbody>

</table>

<h2 style={{marginTop:40}}>Pair Performance</h2>

<table>

<thead>
<tr>
<th>Pair</th>
<th>Wins</th>
<th>Losses</th>
</tr>
</thead>

<tbody>

{Object.entries(stats.pairStats).map(([pair,data]:any)=>(
<tr key={pair}>
<td>{pair}</td>
<td>{data.wins}</td>
<td>{data.losses}</td>
</tr>
))}

</tbody>

</table>

</div>

)

}