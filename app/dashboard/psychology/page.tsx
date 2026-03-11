"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { analyzePsychology } from "@/lib/psychology-engine"

export default function PsychologyPage(){

const [revenge,setRevenge]=useState(0)
const [tilt,setTilt]=useState(0)
const [overtrading,setOvertrading]=useState(0)

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

const {data} = await supabase
.from("trades")
.select("*")
.eq("user_id",user?.id)
.order("trade_date",{ascending:true})

const result = analyzePsychology(data || [])

setRevenge(result.revenge)
setTilt(result.tilt)
setOvertrading(result.overtrading)

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
Trading Psychology
</h1>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px"
}}>

<div style={{
background:"#0f172a",
padding:"20px",
borderRadius:"12px"
}}>
<h3>Revenge Trades</h3>
<p>{revenge}</p>
</div>

<div style={{
background:"#0f172a",
padding:"20px",
borderRadius:"12px"
}}>
<h3>Tilt Trades</h3>
<p>{tilt}</p>
</div>

<div style={{
background:"#0f172a",
padding:"20px",
borderRadius:"12px"
}}>
<h3>Overtrading</h3>
<p>{overtrading}</p>
</div>

</div>

</div>

)

}