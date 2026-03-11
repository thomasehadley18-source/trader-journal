"use client"

import { useState,useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function AIAnalysis(){

const [analysis,setAnalysis]=useState("")
const [loading,setLoading]=useState(false)

async function runAnalysis(){

setLoading(true)

const {data:{user}}=await supabase.auth.getUser()

const res=await fetch("/api/ai/analyze-trades",{

method:"POST",

body:JSON.stringify({
userId:user?.id
})

})

const data=await res.json()

setAnalysis(data.analysis)

setLoading(false)

}

useEffect(()=>{runAnalysis()},[])

return(

<div>

<h1 className="text-3xl mb-6">
AI Strategy Analysis
</h1>

<div className="card">

<button
className="bg-primary px-4 py-2 rounded"
onClick={runAnalysis}
>

{loading ? "Analyzing..." : "Run AI Analysis"}

</button>

</div>

{analysis && (

<div className="card mt-6">

<h2 className="mb-4">
AI Insights
</h2>

<p style={{whiteSpace:"pre-line"}}>

{analysis}

</p>

</div>

)}

</div>

)

}