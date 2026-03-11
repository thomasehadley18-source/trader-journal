"use client"

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"

export default function StrategiesPage(){

const [strategies,setStrategies] = useState<any[]>([])

const [form,setForm] = useState({
name:"",
description:"",
rules:""
})

useEffect(()=>{
load()
},[])

async function load(){

const {data} = await supabase
.from("strategies")
.select("*")
.order("created_at",{ascending:false})

setStrategies(data || [])

}

async function create(){

const {data:{user}} = await supabase.auth.getUser()

await supabase
.from("strategies")
.insert({

user_id:user?.id,

name:form.name,

description:form.description,

rules:form.rules

})

load()

}

return(

<div style={{padding:40,maxWidth:800}}>

<h1>Strategy Library</h1>

<h2>Create Strategy</h2>

<input
placeholder="Strategy Name"
onChange={(e)=>setForm({...form,name:e.target.value})}
/>

<textarea
placeholder="Description"
onChange={(e)=>setForm({...form,description:e.target.value})}
/>

<textarea
placeholder="Rules"
onChange={(e)=>setForm({...form,rules:e.target.value})}
/>

<button onClick={create}>
Create Strategy
</button>

<h2 style={{marginTop:40}}>Community Strategies</h2>

{strategies.map((s:any)=>(

<div key={s.id} className="card">

<h3>{s.name}</h3>

<p>{s.description}</p>

<pre>{s.rules}</pre>

</div>

))}

</div>

)

}