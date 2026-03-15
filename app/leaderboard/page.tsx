"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { rankLeaderboard } from "@/lib/leaderboard-engine"

export default function Leaderboard(){

const [rows,setRows] = useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data} = await supabase
.from("trades")
.select("*")

const ranked = rankLeaderboard(data || [])

setRows(ranked)

}

return(

<div>

<h1>Trader Leaderboard</h1>

<div className="card">

<table>

<thead>
<tr>
<th>Rank</th>
<th>Trader</th>
<th>Trades</th>
<th>Winrate</th>
<th>PnL</th>
<th>Score</th>
</tr>
</thead>

<tbody>

{rows.map((r,i)=>(

<tr key={i}>

<td>#{i+1}</td>

<td>{r.user_id}</td>

<td>{r.trades}</td>

<td>{r.winrate}%</td>

<td>{r.pnl}</td>

<td>{r.score}</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}
