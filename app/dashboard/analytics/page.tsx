"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

import { analyzeSessions } from "@/lib/session-analytics"
import { analyzePairs } from "@/lib/pair-analytics"

import EquityChart from "@/components/charts/equity-chart"
import SessionHeatmap from "@/components/charts/session-heatmap"
import PairPerformance from "@/components/charts/pair-performance"
import MonthlyPerformance from "@/components/charts/monthly-performance"

export default function AnalyticsPage(){

const [trades,setTrades] = useState<any[]>([])
const [sessions,setSessions] = useState<any>({})
const [pairs,setPairs] = useState<any>({})

useEffect(()=>{

load()

},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)
.order("trade_date",{ascending:true})

const trades = data || []

setTrades(trades)

setSessions(analyzeSessions(trades))
setPairs(analyzePairs(trades))

}

return(

<div style={{display:"flex",flexDirection:"column",gap:40}}>

<div className="card">

<h2>Equity Curve</h2>

<EquityChart trades={trades} />

</div>

<div className="card">

<h2>Session Heatmap</h2>

<SessionHeatmap sessions={sessions} />

</div>

<div className="card">

<h2>Pair Performance</h2>

<PairPerformance pairs={pairs} />

</div>

<div className="card">

<h2>Monthly Performance</h2>

<MonthlyPerformance trades={trades} />

</div>

</div>

)

}