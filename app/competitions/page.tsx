"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"

export default function Competitions(){

const [rows,setRows]=useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data}=await supabase
.from("competitions")
.select("*")

setRows(data||[])

}

return(

<div style={{padding:40}}>

<h1>Trading Competitions</h1>

{rows.map(c=>(

<div key={c.id}>

<h3>{c.name}</h3>

<p>{c.start_date} - {c.end_date}</p>

</div>

))}

</div>

)

}