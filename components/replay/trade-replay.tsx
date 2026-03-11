"use client"

import { useState } from "react"

export default function TradeReplay({trade}:any){

const [step,setStep] = useState(0)

if(!trade) return null

const candles = trade.candles || []

function next(){
if(step < candles.length-1){
setStep(step+1)
}
}

function prev(){
if(step>0){
setStep(step-1)
}
}

const candle = candles[step]

return(

<div style={{
border:"1px solid #1e293b",
padding:20,
borderRadius:10,
background:"#020817"
}}>

<h3>Trade Replay</h3>

<div style={{marginTop:10}}>

<p>Entry: {trade.entry}</p>
<p>Exit: {trade.exit}</p>
<p>Current Price: {candle?.close}</p>

</div>

<div style={{marginTop:20,display:"flex",gap:10}}>

<button onClick={prev}>Previous</button>
<button onClick={next}>Next</button>

</div>

</div>

)

}