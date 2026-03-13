"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {calculatePerformanceMetrics} from "@/lib/performance-engine"

export default function InstitutionalAnalytics(){

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

const metrics = calculatePerformanceMetrics(data||[])

setStats(metrics)

}

if(!stats) return <div>Loading...</div>

return(

<div>

<h1>Institutional Performance</h1>

<div className="grid-4">

<div className="card">
<h3>Profit Factor</h3>
<p>{stats.profitFactor.toFixed(2)}</p>
</div>

<div className="card">
<h3>Expectancy</h3>
<p>{stats.expectancy.toFixed(2)}</p>
</div>

<div className="card">
<h3>Sharpe Ratio</h3>
<p>{stats.sharpe.toFixed(2)}</p>
</div>

<div className="card">
<h3>Average R</h3>
<p>{stats.avgR.toFixed(2)}</p>
</div>

</div>

</div>

)

}