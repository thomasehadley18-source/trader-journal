"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {generateEquityCurve} from "@/lib/equity-engine"

export default function Equity(){

const [curve,setCurve]=useState<any[]>([])
const [drawdown,setDrawdown]=useState(0)

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

const result=generateEquityCurve(data||[])

setCurve(result.curve)
setDrawdown(result.maxDrawdown)

}

return(

<div>

<h1>Equity Curve</h1>

<div className="card">

<h3>Max Drawdown</h3>

<p>{drawdown.toFixed(2)}</p>

</div>

<table>

<thead>

<tr>
<th>Date</th>
<th>Balance</th>
<th>Drawdown</th>
</tr>

</thead>

<tbody>

{curve.map(c=>(
<tr key={c.date}>
<td>{c.date}</td>
<td>{c.balance.toFixed(2)}</td>
<td>{c.drawdown.toFixed(2)}</td>
</tr>
))}

</tbody>

</table>

</div>

)

}