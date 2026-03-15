"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function PublishStrategy(){

const [name,setName] = useState("")
const [description,setDescription] = useState("")

async function publish(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

await supabase
.from("strategies")
.insert({
user_id:user.id,
name,
description
})

alert("Strategy published")

}

return(

<div>

<h1>Publish Strategy</h1>

<div className="card">

<label>Strategy Name</label>
<input value={name} onChange={(e)=>setName(e.target.value)} />

<label>Description</label>
<textarea value={description} onChange={(e)=>setDescription(e.target.value)} />

<button onClick={publish}>
Publish Strategy
</button>

</div>

</div>

)

}
