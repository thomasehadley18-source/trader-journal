"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

import EquityChart from "@/components/charts/equity-chart"
import PnlHistogram from "@/components/charts/pnl-histogram"

export default function AnalyticsPage(){

const [trades,setTrades] = useState<any[]>([])

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

setTrades(data || [])

}

return(

<div style={{display:"flex",flexDirection:"column",gap:30}}>

<div className="card">

<h2>Equity Curve</h2>

<EquityChart trades={trades} />

</div>

<div className="card">

<h2>PnL Distribution</h2>

<PnlHistogram trades={trades} />

</div>

</div>

)

}