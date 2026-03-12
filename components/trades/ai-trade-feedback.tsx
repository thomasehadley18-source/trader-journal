"use client"

import {useState} from "react"

export default function AITradeFeedback({trade}:{trade:any}){

const [loading,setLoading]=useState(false)
const [feedback,setFeedback]=useState("")

async function run(){

setLoading(true)

const res=await fetch("/api/ai/trade-feedback",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({trade})

})

const data=await res.json()

setFeedback(data.feedback)

setLoading(false)

}

return(

<div style={{marginTop:10}}>

<button onClick={run}>
{loading ? "Analyzing..." : "Ask AI"}
</button>

{feedback && (

<div className="card" style={{marginTop:10}}>

<pre style={{whiteSpace:"pre-wrap"}}>
{feedback}
</pre>

</div>

)}

</div>

)

}