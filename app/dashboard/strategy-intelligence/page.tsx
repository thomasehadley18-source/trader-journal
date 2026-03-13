"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {analyzeStrategyIntelligence} from "@/lib/strategy-intelligence"

export default function StrategyIntelligence(){

const [data,setData]=useState<any>(null)

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)

const result = analyzeStrategyIntelligence(data || [])

setData(result)

}

if(!data) return <div>Loading...</div>

return(

<div>

<h1>Strategy Intelligence</h1>

<h2>Best Pairs</h2>

<table>

<thead>
<tr>
<th>Pair</th>
<th>Trades</th>
<th>PnL</th>
</tr>
</thead>

<tbody>

{data.pairs.map((p:any,i:number)=>(

<tr key={i}>
<td>{p.name}</td>
<td>{p.trades}</td>
<td>{p.pnl.toFixed(2)}</td>
</tr>

))}

</tbody>

</table>

<h2 style={{marginTop:40}}>Best Strategies</h2>

<table>

<thead>
<tr>
<th>Strategy</th>
<th>Trades</th>
<th>PnL</th>
</tr>
</thead>

<tbody>

{data.strategies.map((s:any,i:number)=>(

<tr key={i}>
<td>{s.name}</td>
<td>{s.trades}</td>
<td>{s.pnl.toFixed(2)}</td>
</tr>

))}

</tbody>

</table>

<h2 style={{marginTop:40}}>Best Sessions</h2>

<table>

<thead>
<tr>
<th>Session</th>
<th>Trades</th>
<th>PnL</th>
</tr>
</thead>

<tbody>

{data.sessions.map((s:any,i:number)=>(

<tr key={i}>
<td>{s.name}</td>
<td>{s.trades}</td>
<td>{s.pnl.toFixed(2)}</td>
</tr>

))}

</tbody>

</table>

</div>

)

}