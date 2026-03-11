"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { runMonteCarlo } from "@/lib/monte-carlo"
import { calculateEdgeScore } from "@/lib/strategy-edge"

export default function RiskPage(){

const [risk,setRisk] = useState<any>(null)

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

const trades = data || []

const monte = runMonteCarlo(trades)

const edge = calculateEdgeScore(trades)

setRisk({

simulations:monte,
edge

})

}

if(!risk) return <div style={{padding:40}}>Loading...</div>

return(

<div style={{padding:40}}>

<h1>Risk Analytics</h1>

<h2>Strategy Edge Score</h2>

<p>{risk.edge.toFixed(2)}</p>

<h2>Monte Carlo Simulation</h2>

<p>Simulations run: {risk.simulations.length}</p>

</div>

)

}