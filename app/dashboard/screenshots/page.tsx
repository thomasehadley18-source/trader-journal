"use client"

import {useEffect,useState} from "react"
import {supabase} from "@/lib/supabase"

export default function Screenshots(){

const [shots,setShots]=useState<any[]>([])

useEffect(()=>{load()},[])

async function load(){

const {data}=await supabase
.storage
.from("trade-screenshots")
.list()

setShots(data||[])

}

return(

<div>

<h1>Trade Screenshots</h1>

{shots.map(s=>(

<div key={s.name}>

<img
src={`https://YOURPROJECT.supabase.co/storage/v1/object/public/trade-screenshots/${s.name}`}
width={400}
/>

</div>

))}

</div>

)

}