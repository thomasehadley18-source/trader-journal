"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {sessionStats} from "@/lib/session-engine"

export default function SessionAnalytics(){

const [sessions,setSessions]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)

const stats=sessionStats(data||[])

setSessions(stats)

}

return(

<div>

<h1>Session Performance</h1>

<table>

<thead>

<tr>
<th>Session</th>
<th>Trades</th>
<th>PnL</th>
</tr>

</thead>

<tbody>

{sessions.map(s=>(
<tr key={s.session}>
<td>{s.session}</td>
<td>{s.trades}</td>
<td>{s.pnl.toFixed(2)}</td>
</tr>
))}

</tbody>

</table>

</div>

)

}