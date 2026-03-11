"use client"

import { useState } from "react"

export default function AIPage(){

const [question,setQuestion] = useState("")
const [answer,setAnswer] = useState("")
const [loading,setLoading] = useState(false)

async function askAI(){

setLoading(true)
setAnswer("")

try{

const res = await fetch("/api/ai/coach",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({question})
})

const data = await res.json()

if(data.answer){
setAnswer(data.answer)
}else if(data.error){
setAnswer("ERROR: " + data.error)
}else{
setAnswer("AI returned no response.")
}

}catch(err){

setAnswer("Failed to reach AI server.")

}

setLoading(false)

}

return(

<div style={{padding:40,color:"white"}}>

<h1 style={{fontSize:30,marginBottom:20}}>
AI Trading Coach
</h1>

<textarea
value={question}
onChange={(e)=>setQuestion(e.target.value)}
placeholder="Ask something about your trading..."
style={{
width:"100%",
height:120,
padding:12,
background:"#0f172a",
border:"1px solid #1e293b",
borderRadius:8,
marginBottom:15
}}
/>

<button
onClick={askAI}
style={{
width:"100%",
padding:14,
background:"#3b82f6",
borderRadius:8
}}
>
{loading ? "Analyzing..." : "Ask AI"}
</button>

{answer && (

<div style={{
marginTop:20,
background:"#0f172a",
padding:20,
borderRadius:10
}}>

<h3 style={{marginBottom:10}}>AI Response</h3>

<p>{answer}</p>

</div>

)}

</div>

)

}