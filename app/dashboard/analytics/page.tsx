"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { analyzeSessions } from "@/lib/session-analytics"
import { analyzePairs } from "@/lib/pair-analytics"

export default function AnalyticsPage(){

const [sessions,setSessions] = useState<any>({})
const [pairs,setPairs] = useState<any>({})

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

setSessions(analyzeSessions(trades))
setPairs(analyzePairs(trades))

}

return(

<div style={{display:"flex",flexDirection:"column",gap:40}}>

<div className="card">

<h2 style={{marginBottom:20}}>Session Performance</h2>

<table>

<thead>

<tr>
<th>Session</th>
<th>Wins</th>
<th>Losses</th>
<th>PnL</th>
</tr>

</thead>

<tbody>

{Object.entries(sessions).map(([s,v]:any)=>(
<tr key={s}>
<td>{s}</td>
<td>{v.wins}</td>
<td>{v.losses}</td>
<td>{v.pnl}</td>
</tr>
))}

</tbody>

</table>

</div>

<div className="card">

<h2 style={{marginBottom:20}}>Pair Performance</h2>

<table>

<thead>

<tr>
<th>Pair</th>
<th>Wins</th>
<th>Losses</th>
<th>PnL</th>
</tr>

</thead>

<tbody>

{Object.entries(pairs).map(([p,v]:any)=>(
<tr key={p}>
<td>{p}</td>
<td>{v.wins}</td>
<td>{v.losses}</td>
<td>{v.pnl}</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

)

}