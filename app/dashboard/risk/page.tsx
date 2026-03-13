"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {calculateRiskStats} from "@/lib/risk-engine"

export default function RiskDashboard(){

const [stats,setStats]=useState<any>(null)

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)

const s = calculateRiskStats(data || [])

setStats(s)

}

if(!stats) return <div>Loading...</div>

return(

<div>

<h1>Risk Analytics</h1>

<div className="grid-4">

<div className="card">
<h3>Win Rate</h3>
<p>{(stats.winRate*100).toFixed(2)}%</p>
</div>

<div className="card">
<h3>Average Win</h3>
<p>{stats.avgWin.toFixed(2)}</p>
</div>

<div className="card">
<h3>Average Loss</h3>
<p>{stats.avgLoss.toFixed(2)}</p>
</div>

<div className="card">
<h3>Risk of Ruin</h3>
<p>{(stats.riskOfRuin*100).toFixed(2)}%</p>
</div>

</div>

</div>

)

}