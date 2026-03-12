"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {findEdges} from "@/lib/edge-finder"

export default function StrategyIntelligence(){

const [edges,setEdges]=useState<any|null>(null)

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}}=await supabase.auth.getUser()
if(!user)return

const {data}=await supabase
.from("trades")
.select("*")
.eq("user_id",user.id)

const trades=data||[]

setEdges(findEdges(trades))

}

if(!edges) return <div>Loading...</div>

return(

<div>

<h1>Strategy Intelligence</h1>

<div className="grid-3">

<div className="card">

<h3>Best Pair</h3>

{edges.bestPair && (
<div>
{edges.bestPair[0]} — ${edges.bestPair[1].toFixed(2)}
</div>
)}

</div>

<div className="card">

<h3>Best Strategy</h3>

{edges.bestStrategy && (
<div>
{edges.bestStrategy[0]} — ${edges.bestStrategy[1].toFixed(2)}
</div>
)}

</div>

<div className="card">

<h3>Best Session</h3>

{edges.bestSession && (
<div>
{edges.bestSession[0]} — ${edges.bestSession[1].toFixed(2)}
</div>
)}

</div>

</div>

</div>

)

}