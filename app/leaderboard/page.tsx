"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import EquityChart from "@/components/charts/equity-chart"

export default function TraderPage({params}:any){

const [trades,setTrades] = useState<any[]>([])

useEffect(()=>{

load()

},[])

async function load(){

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",params.id)
.order("trade_date",{ascending:true})

setTrades(data || [])

}

return(

<div style={{display:"flex",flexDirection:"column",gap:30}}>

<h1>Trader Profile</h1>

<div className="card">

<h2>Equity Curve</h2>

<EquityChart trades={trades} />

</div>

</div>

)

}