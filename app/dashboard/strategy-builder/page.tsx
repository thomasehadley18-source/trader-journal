"use client"

import {useState} from "react"
import {supabase} from "@/lib/supabase"

export default function StrategyBuilder(){

const[name,setName]=useState("")
const[desc,setDesc]=useState("")
const[price,setPrice]=useState("")

async function create(){

const {data:{user}}=await supabase.auth.getUser()

await supabase
.from("strategies")
.insert({

user_id:user?.id,
name,
description:desc,
price

})

}

return(

<div style={{padding:40}}>

<h1>Create Strategy</h1>

<input
placeholder="Strategy Name"
value={name}
onChange={e=>setName(e.target.value)}
/>

<textarea
placeholder="Description"
value={desc}
onChange={e=>setDesc(e.target.value)}
/>

<input
placeholder="Price"
value={price}
onChange={e=>setPrice(e.target.value)}
/>

<button onClick={create}>
Create
</button>

</div>

)

}