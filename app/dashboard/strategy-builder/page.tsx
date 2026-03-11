"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { buildStrategies } from "@/lib/strategy-builder"

export default function StrategyBuilder(){

const [strategies,setStrategies] = useState<any[]>([])

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

setStrategies(buildStrategies(data || []))

}

return(

<div style={{padding:40}}>

<h1>AI Strategy Builder</h1>

{strategies.map((s:any)=>(
<div key={s.name}>

<p>{s.name}</p>

<p>Wins: {s.wins}</p>

<p>Losses: {s.losses}</p>

</div>
))}

</div>

)

}