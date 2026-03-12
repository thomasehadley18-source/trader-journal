"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {
calculatePerformance,
equityCurve,
pairPerformance
} from "@/lib/performance-engine"

export default function Performance(){

const [stats,setStats]=useState<any>(null)
const [pairs,setPairs]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)
.order("trade_date")

const trades=data||[]

const perf=calculatePerformance(trades)

const pairs=pairPerformance(trades)

setStats(perf)
setPairs(pairs)

}

if(!stats) return <div>Loading performance...</div>

return(

<div>

<h1>Performance Analytics</h1>

<div className="grid-4">

<div className="card">
<h3>Wins</h3>
<p>{stats.wins}</p>
</div>

<div className="card">
<h3>Losses</h3>
<p>{stats.losses}</p>
</div>

<div className="card">
<h3>Win Rate</h3>
<p>{(stats.winRate*100).toFixed(1)}%</p>
</div>

<div className="card">
<h3>Profit Factor</h3>
<p>{stats.profitFactor.toFixed(2)}</p>
</div>

</div>

<h2 style={{marginTop:30}}>Pair Performance</h2>

<table>

<thead>
<tr>
<th>Pair</th>
<th>PnL</th>
</tr>
</thead>

<tbody>

{pairs.map(p=>(
<tr key={p.pair}>
<td>{p.pair}</td>
<td>{p.pnl.toFixed(2)}</td>
</tr>
))}

</tbody>

</table>

</div>

)

}