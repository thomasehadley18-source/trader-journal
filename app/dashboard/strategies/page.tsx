"use client"

import {useState} from "react"
import {supabase} from "@/lib/supabase"

export default function Strategies(){

const [title,setTitle]=useState("")
const [desc,setDesc]=useState("")

async function publish(){

const {data:{user}}=await supabase.auth.getUser()

await supabase.from("strategies").insert({

user_id:user?.id,
title,
description:desc

})

alert("Strategy published")

}

return(

<div>

<h1 className="text-3xl mb-6">
Publish Strategy
</h1>

<div className="card">

<input
placeholder="Strategy Name"
value={title}
onChange={e=>setTitle(e.target.value)}
/>

<textarea
placeholder="Strategy description"
value={desc}
onChange={e=>setDesc(e.target.value)}
/>

<button
className="mt-4 bg-primary px-4 py-2 rounded"
onClick={publish}
>
Publish Strategy
</button>

</div>

</div>

)

}