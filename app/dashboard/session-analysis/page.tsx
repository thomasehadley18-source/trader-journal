"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {analyzeSessions} from "@/lib/session-analysis"

export default function SessionAnalytics(){

const [rows,setRows] = useState<any[]>([])

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

const result = analyzeSessions(data || [])

setRows(result)

}

return(

<div>

<h1>Session Liquidity Analysis</h1>

<div className="card">

<table>

<thead>
<tr>
<th>Session</th>
<th>Trades</th>
<th>Total PnL</th>
<th>Average</th>
</tr>
</thead>

<tbody>

{rows.map((r,i)=>(

<tr key={i}>

<td>{r.session}</td>

<td>{r.trades}</td>

<td>{r.pnl}</td>

<td>{r.avg}</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}
