"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

export default function StrategyMarket(){

const [strategies,setStrategies]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data} = await supabase
.from("strategies")
.select("*")
.order("created_at",{ascending:false})

setStrategies(data || [])

}

return(

<div style={{padding:40}}>

<h1>Strategy Marketplace</h1>

{strategies.length===0 && (
<p>No strategies uploaded yet.</p>
)}

<div className="grid-3">

{strategies.map(s=>(

<div key={s.id} className="card">

<h3>{s.name}</h3>

<p>{s.description}</p>

<div>Win Rate: {s.win_rate}%</div>

<div>Trades: {s.trades}</div>

<button>
Copy Strategy
</button>

</div>

))}

</div>

</div>

)

}