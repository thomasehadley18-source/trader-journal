"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import EquityChart from "@/components/charts/equity-chart"
import {
calculateEquity,
pairPerformance,
sessionPerformance
} from "@/lib/analytics-engine"

export default function Analytics(){

const [equity,setEquity]=useState<any[]>([])
const [pairs,setPairs]=useState<any[]>([])
const [sessions,setSessions]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()
if(!user)return

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)
.order("trade_date",{ascending:true})

const trades=data||[]

setEquity(calculateEquity(trades))
setPairs(pairPerformance(trades))
setSessions(sessionPerformance(trades))

}

return(

<div>

<h1>Trading Analytics</h1>

<div className="card">
<h2>Equity Curve</h2>
<EquityChart data={equity}/>
</div>

<div className="grid-2" style={{marginTop:20}}>

<div className="card">

<h3>Pair Performance</h3>

{pairs.map((p:any)=>(
<div key={p.symbol}>
{p.symbol} — {p.pnl}
</div>
))}

</div>

<div className="card">

<h3>Session Performance</h3>

{sessions.map((s:any)=>(
<div key={s.name}>
{s.name} — {s.pnl}
</div>
))}

</div>

</div>

</div>

)

}