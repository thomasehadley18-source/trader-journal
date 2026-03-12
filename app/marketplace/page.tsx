"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"

export default function Market(){

const [rows,setRows]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data}=await supabase
.from("strategies")
.select("*")
.order("created_at",{ascending:false})

setRows(data||[])

}

return(

<div style={{padding:40}}>

<h1>Strategy Market</h1>

{rows.length===0 && (

<div className="card">

No strategies yet.

<br/><br/>

Create one in Strategy Builder.

</div>

)}

{rows.map(s=>(

<div key={s.id} className="card" style={{marginBottom:20}}>

<h3>{s.name}</h3>

<p>{s.description}</p>

<p>${s.price}</p>

</div>

))}

</div>

)

}