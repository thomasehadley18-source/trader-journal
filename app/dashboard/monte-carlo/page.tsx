"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {runMonteCarlo,riskOfRuin} from "@/lib/monte-carlo"
import MonteCarloChart from "@/components/charts/monte-carlo-chart"

export default function MonteCarlo(){

const [curve,setCurve] = useState<any[]>([])
const [ruin,setRuin] = useState(0)

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

const results = runMonteCarlo(data || [],200)

if(results.length === 0) return

const sample = results[0].map((v:number,i:number)=>({
x:i,
y:v
}))

setCurve(sample)

setRuin(riskOfRuin(data || []))

}

return(

<div>

<h1>Monte Carlo Risk Simulation</h1>

<div className="card">

<p>Risk of Ruin: {(ruin*100).toFixed(2)}%</p>

<MonteCarloChart data={curve}/>

</div>

</div>

)

}
