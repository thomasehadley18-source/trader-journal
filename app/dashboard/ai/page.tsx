"use client"

import { useState } from "react"

export default function AIPage(){

const [question,setQuestion] = useState("")
const [answer,setAnswer] = useState("")

async function ask(){

const res = await fetch("/api/ai/coach",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({question})
})

const data = await res.json()

setAnswer(data.answer)

}

return(

<div style={{display:"flex",flexDirection:"column",gap:20}}>

<h1>AI Coach</h1>

<textarea
value={question}
onChange={e=>setQuestion(e.target.value)}
placeholder="Ask about your trading..."
style={{
background:"#0f172a",
color:"white",
border:"1px solid #1e293b",
padding:12
}}
/>

<button onClick={ask}>Ask AI</button>

<div className="card">

{answer}

</div>

</div>

)

}