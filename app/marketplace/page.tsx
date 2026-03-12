"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"

export default function Marketplace(){

const [strategies,setStrategies]=useState<any[]>([])

useEffect(()=>{
load()
},[])

async function load(){

const {data}=await supabase
.from("strategies")
.select("*")

setStrategies(data||[])

}

return(

<div style={{padding:40}}>

<h1>Strategy Market</h1>

{strategies.length===0 && (

<div className="card">

No strategies yet.

Go to Strategy Builder to create one.

</div>

)}

{strategies.map(s=>(

<div key={s.id} className="card" style={{marginBottom:20}}>

<h3>{s.name}</h3>

<p>{s.description}</p>

<p>${s.price}</p>

</div>

))}

</div>

)

}