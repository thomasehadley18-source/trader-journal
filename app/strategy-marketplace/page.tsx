"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

export default function StrategyMarketplace(){

const [strategies,setStrategies] = useState<any[]>([])

useEffect(()=>{

load()

},[])

async function load(){

const {data} = await supabase
.from("strategies")
.select("*")

setStrategies(data || [])

}

return(

<div>

<h1 style={{marginBottom:20}}>
Strategy Marketplace
</h1>

<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>

{strategies.map((s:any)=>(
<div key={s.id} className="card">

<h3>{s.name}</h3>

<p className="muted">
{s.description}
</p>

</div>
))}

</div>

</div>

)

}