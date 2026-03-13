"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {detectStrategies} from "@/lib/strategy-detection"

export default function StrategyDetection(){

const [strategies,setStrategies]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)

const result=detectStrategies(data||[])

setStrategies(result)

}

return(

<div>

<h1>Strategy Detection</h1>

<table style={{width:"100%",marginTop:20}}>

<thead>

<tr>
<th>Strategy</th>
<th>Trades</th>
<th>Total PnL</th>
</tr>

</thead>

<tbody>

{strategies.map((s,i)=>(

<tr key={i}>

<td>{s.strategy}</td>
<td>{s.trades}</td>
<td>{s.pnl.toFixed(2)}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}