"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

export default function StrategyAnalytics(){

const [data,setData]=useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

if(!user)return

const {data:trades}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)

const strategies:any={}

trades?.forEach((t:any)=>{

const strat=t.strategy || "Unknown"

if(!strategies[strat]){
strategies[strat]={wins:0,total:0,pnl:0}
}

const pnl=Number(t.pnl ?? t.profit ?? 0)

strategies[strat].total++

if(pnl>0)strategies[strat].wins++

strategies[strat].pnl+=pnl

})

const results=Object.entries(strategies).map(([name,val]:any)=>({

name,
winRate:((val.wins/val.total)*100).toFixed(1),
pnl:val.pnl

}))

setData(results)

}

return(

<div>

<h1 className="text-3xl mb-6">
Strategy Performance
</h1>

<div className="card">

<table className="w-full">

<thead>

<tr>
<th>Strategy</th>
<th>Win Rate</th>
<th>Total PnL</th>
</tr>

</thead>

<tbody>

{data.map((s,i)=>(
<tr key={i}>
<td>{s.name}</td>
<td>{s.winRate}%</td>
<td>{s.pnl}</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

)

}