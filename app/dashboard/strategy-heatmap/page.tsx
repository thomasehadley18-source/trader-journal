"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {buildHeatmap} from "@/lib/heatmap-engine"

export default function StrategyHeatmap(){

const [days,setDays]=useState<any[]>([])
const [hours,setHours]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)

const heatmap=buildHeatmap(data||[])

setDays(heatmap.days)
setHours(heatmap.hours)

}

return(

<div>

<h1>Strategy Heatmap</h1>

<h2>Performance by Day</h2>

<div className="grid-4">

{days.map(d=>{

const color=d.pnl>0 ? "#065f46" : "#7f1d1d"

return(

<div
key={d.day}
style={{
background:color,
padding:20,
borderRadius:10
}}
>

<div>{d.day}</div>
<div>{d.pnl.toFixed(2)}</div>

</div>

)

})}

</div>

<h2 style={{marginTop:40}}>Performance by Hour</h2>

<div className="grid-4">

{hours.map(h=>{

const color=h.pnl>0 ? "#065f46" : "#7f1d1d"

return(

<div
key={h.hour}
style={{
background:color,
padding:20,
borderRadius:10
}}
>

<div>{h.hour}:00</div>
<div>{h.pnl.toFixed(2)}</div>

</div>

)

})}

</div>

</div>

)

}