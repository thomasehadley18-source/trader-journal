"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { generateStrategyHeatmap } from "@/lib/strategy-heatmap"

export default function HeatmapPage(){

const [data,setData] = useState<any[]>([])

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

setData(generateStrategyHeatmap(data || []))

}

return(

<div style={{padding:40}}>

<h1>Strategy Profitability Heatmap</h1>

<table>

<thead>
<tr>
<th>Strategy</th>
<th>Wins</th>
<th>Losses</th>
</tr>
</thead>

<tbody>

{data.map((d:any)=>(
<tr key={d.strategy}>
<td>{d.strategy}</td>
<td style={{color:"#22c55e"}}>{d.wins}</td>
<td style={{color:"#ef4444"}}>{d.losses}</td>
</tr>
))}

</tbody>

</table>

</div>

)

}