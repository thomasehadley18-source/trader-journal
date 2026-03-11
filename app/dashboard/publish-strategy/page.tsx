"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function PublishStrategy(){

const [title,setTitle]=useState("")
const [description,setDescription]=useState("")
const [price,setPrice]=useState("")

async function publish(){

const {data:{user}} = await supabase.auth.getUser()

await fetch("/api/marketplace/publish",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
title,
description,
price,
userId:user?.id
})

})

alert("Strategy Published")

}

return(

<div style={{padding:"40px"}}>

<h1 style={{fontSize:32,marginBottom:20}}>
Publish Strategy
</h1>

<div style={{
maxWidth:"500px",
display:"grid",
gap:"15px"
}}>

<input
placeholder="Strategy Name"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<textarea
placeholder="Strategy Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<input
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<button
onClick={publish}
style={{
background:"#2563eb",
padding:"12px",
border:"none",
borderRadius:"8px",
color:"white"
}}
>
Publish
</button>

</div>

</div>

)
}