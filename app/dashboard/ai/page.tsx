"use client"

import {useState} from "react"

export default function AIPage(){

const [prompt,setPrompt]=useState("")
const [response,setResponse]=useState("")
const [loading,setLoading]=useState(false)

async function ask(){

setLoading(true)

const res=await fetch("/api/ai/assistant",{
method:"POST",
body:JSON.stringify({prompt})
})

const data=await res.json()

setResponse(data.answer)

setLoading(false)

}

return(

<div>

<h1 className="text-3xl mb-6">
AI Trading Coach
</h1>

<div className="card">

<textarea
className="w-full p-3 bg-bg border border-border rounded-lg"
rows={5}
value={prompt}
onChange={e=>setPrompt(e.target.value)}
placeholder="Analyze my last trades"
/>

<button
onClick={ask}
className="mt-4 bg-primary px-4 py-2 rounded"
>

{loading?"Analyzing...":"Ask AI"}

</button>

</div>

{response && (

<div className="card mt-6">

<h2 className="mb-2">
AI Insights
</h2>

<p>
{response}
</p>

</div>

)}

</div>

)

}