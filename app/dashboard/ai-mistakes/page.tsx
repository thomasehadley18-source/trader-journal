"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"
import {analyzeTrades} from "@/lib/ai-trade-analyzer"

export default function AIMistakes(){

const [mistakes,setMistakes]=useState<string[]>([])

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

setMistakes(analyzeTrades(trades))

}

return(

<div>

<h1>AI Mistake Detection</h1>

<div className="card">

{mistakes.length===0 && (
<p>No major mistakes detected.</p>
)}

{mistakes.map((m,i)=>(
<div key={i} style={{marginBottom:10}}>
⚠ {m}
</div>
))}

</div>

</div>

)

}