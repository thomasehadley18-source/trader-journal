"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {scoreTrades} from "@/lib/trade-score-engine"

export default function TradeScore(){

const [trades,setTrades]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)
.order("trade_date",{ascending:false})

const scored = scoreTrades(data || [])

setTrades(scored)

}

return(

<div>

<h1>Trade Score</h1>

<table style={{width:"100%",marginTop:20}}>

<thead>

<tr>
<th>Date</th>
<th>Pair</th>
<th>PnL</th>
<th>Score</th>
</tr>

</thead>

<tbody>

{trades.map((t,i)=>(

<tr key={i}>

<td>{t.trade_date}</td>
<td>{t.pair}</td>
<td>{t.pnl}</td>
<td>{t.score}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}