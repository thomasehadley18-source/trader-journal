"use client"

import { useEffect,useState } from "react"

export default function Marketplace(){

const [strategies,setStrategies]=useState<any[]>([])

useEffect(()=>{

load()

},[])

async function load(){

const res = await fetch("/api/marketplace/list")

const data = await res.json()

setStrategies(data)

}

return(

<div style={{padding:"40px"}}>

<h1 style={{fontSize:32,marginBottom:30}}>
Strategy Marketplace
</h1>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px"
}}>

{strategies.map((s)=>(

<div key={s.id} style={{
background:"#0f172a",
border:"1px solid #1e293b",
borderRadius:"12px",
padding:"20px"
}}>

<h2 style={{fontSize:20,marginBottom:10}}>
{s.title}
</h2>

<p style={{color:"#94a3b8"}}>
{s.description}
</p>

<p style={{marginTop:10,fontWeight:700}}>
${s.price}
</p>

<button style={{
marginTop:15,
background:"#2563eb",
padding:"10px 16px",
borderRadius:"8px",
border:"none",
color:"white"
}}>
Buy Strategy
</button>

</div>

))}

</div>

</div>

)

}