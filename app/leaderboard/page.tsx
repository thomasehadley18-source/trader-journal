"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Leaderboard(){

const [rows,setRows] = useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data} = await supabase
.from("trades")
.select("user_id,pnl")

const map:any={}

data?.forEach(t=>{

if(!map[t.user_id]) map[t.user_id]=0

map[t.user_id]+=Number(t.pnl||0)

})

const sorted = Object.entries(map)
.map(([u,pnl])=>({u,pnl}))
.sort((a:any,b:any)=>b.pnl-a.pnl)

setRows(sorted)

}

return(

<div className="card">

<h1>Leaderboard</h1>

<table>

<thead>
<tr>
<th>Rank</th>
<th>User</th>
<th>PnL</th>
</tr>
</thead>

<tbody>

{rows.map((r,i)=>(
<tr key={i}>
<td>{i+1}</td>
<td>{r.u}</td>
<td>{r.pnl}</td>
</tr>
))}

</tbody>

</table>

</div>

)

}