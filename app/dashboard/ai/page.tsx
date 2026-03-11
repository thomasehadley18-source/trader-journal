"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AICoach() {

const [question,setQuestion]=useState("")
const [answer,setAnswer]=useState("")
const [loading,setLoading]=useState(false)

async function askAI(){

setLoading(true)

const {data:{user}} = await supabase.auth.getUser()

const res = await fetch("/api/ai/coach",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
question,
userId:user?.id
})
})

const data = await res.json()

setAnswer(data.answer)

setLoading(false)

}

return(

<div style={{
padding:"40px",
color:"white",
background:"#020817",
minHeight:"100vh"
}}>

<h1 style={{
fontSize:32,
marginBottom:30
}}>
AI Trading Coach
</h1>

<div style={{
maxWidth:"700px",
display:"grid",
gap:"16px"
}}>

<textarea
placeholder="Ask anything about your trading..."
value={question}
onChange={(e)=>setQuestion(e.target.value)}
style={{
padding:"14px",
borderRadius:"10px",
border:"1px solid #1e293b",
background:"#0f172a",
color:"white",
minHeight:"120px"
}}
/>

<button
onClick={askAI}
style={{
background:"#2563eb",
padding:"12px",
border:"none",
borderRadius:"10px",
color:"white",
fontWeight:600
}}
>
{loading ? "Analyzing..." : "Ask AI"}
</button>

</div>

{answer && (

<div style={{
marginTop:40,
maxWidth:"700px",
background:"#0f172a",
border:"1px solid #1e293b",
padding:"24px",
borderRadius:"12px"
}}>

<h3 style={{marginBottom:10}}>
AI Response
</h3>

<p style={{whiteSpace:"pre-line"}}>
{answer}
</p>

</div>

)}

</div>

)

}