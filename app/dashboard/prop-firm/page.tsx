"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { PROP_FIRM_RULES } from "@/lib/prop-firm-rules"
import { detectPropViolations } from "@/lib/prop-violation-engine"

export default function PropFirmPage(){

const [violations,setViolations] = useState<any[]>([])

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

const rules = PROP_FIRM_RULES["FTMO"]

const results = detectPropViolations(data || [],rules)

setViolations(results)

}

return(

<div>

<h1>Prop Firm Rule Violations</h1>

<div className="card">

{violations.length===0 && (
<p>No rule violations detected.</p>
)}

{violations.map((v,i)=>(

<div
key={i}
style={{
padding:12,
borderBottom:"1px solid #1e293b"
}}
>

<strong>{v.type}</strong>

<div className="muted">
Instrument: {v.trade.instrument}
</div>

<div className="muted">
PnL: {v.trade.pnl}
</div>

</div>

))}

</div>

</div>

)

}
