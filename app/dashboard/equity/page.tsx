"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { buildEquityCurve } from "@/lib/equity-curve"

export default function EquityCurve(){

const [curve,setCurve]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)

const result = buildEquityCurve(data || [])

setCurve(result)

}

return(

<div style={{
padding:"40px",
background:"#020817",
color:"white",
minHeight:"100vh"
}}>

<h1 style={{
fontSize:32,
marginBottom:30
}}>
Equity Curve
</h1>

<div style={{
background:"#0f172a",
border:"1px solid #1e293b",
borderRadius:"12px",
padding:"20px"
}}>

{curve.map((c,i)=>(
<div key={i} style={{marginBottom:8}}>
{c.date} — {c.equity}
</div>
))}

</div>

</div>

)

}