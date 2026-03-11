"use client"

import { useEffect,useState } from "react"

export default function Leaderboard(){

const [traders,setTraders]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const res = await fetch("/api/leaderboard")

const data = await res.json()

setTraders(data)

}

return(

<div style={{
padding:"40px",
background:"#020817",
color:"white",
minHeight:"100vh"
}}>

<h1 style={{fontSize:32,marginBottom:30}}>
Top Traders
</h1>

<table style={{
width:"100%",
borderCollapse:"collapse"
}}>

<thead>

<tr>

<th style={{textAlign:"left"}}>Trader</th>
<th>Trades</th>
<th>Win Rate</th>
<th>PnL</th>

</tr>

</thead>

<tbody>

{traders.map((t)=>(

<tr key={t.user_id}>

<td>{t.username}</td>
<td>{t.trades}</td>
<td>{t.winRate}%</td>
<td>{t.pnl}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}