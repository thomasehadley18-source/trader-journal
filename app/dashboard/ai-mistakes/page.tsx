"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { detectTradeMistakes } from "@/lib/mistake-engine"

export default function AIMistakes(){

const [mistakes,setMistakes] = useState<any[]>([])

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

const results = detectTradeMistakes(data || [])

setMistakes(results)

}

return(

<div>

<h1>AI Mistake Detection</h1>

<div className="card">

{mistakes.length===0 && (
<p>No mistakes detected yet.</p>
)}

{mistakes.map((m,i)=>(

<div
key={i}
style={{
padding:12,
borderBottom:"1px solid #1e293b"
}}
>

<strong>{m.type}</strong>

<div className="muted">
Instrument: {m.trade.instrument}
</div>

<div className="muted">
PnL: {m.trade.pnl}
</div>

</div>

))}

</div>

</div>

)

}