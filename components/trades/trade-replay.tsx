"use client"

import { useState } from "react"

export default function TradeReplay({ trades }: any) {

const [index,setIndex] = useState(0)

if(!trades || trades.length === 0){

return(

<div className="card">
No trades to replay
</div>

)

}

const trade = trades[index]

function next(){

if(index < trades.length - 1){
setIndex(index + 1)
}

}

function prev(){

if(index > 0){
setIndex(index - 1)
}

}

return(

<div className="card">

<h2 style={{marginBottom:20}}>Trade Replay</h2>

<div style={{display:"grid",gap:10}}>

<div>
<strong>Pair:</strong> {trade.symbol}
</div>

<div>
<strong>Side:</strong> {trade.side}
</div>

<div>
<strong>Entry:</strong> {trade.entry}
</div>

<div>
<strong>Exit:</strong> {trade.exit}
</div>

<div>
<strong>PnL:</strong> {trade.pnl}
</div>

<div>
<strong>Date:</strong> {new Date(trade.trade_date).toLocaleString()}
</div>

</div>

<div style={{display:"flex",gap:10,marginTop:20}}>

<button onClick={prev}>
Previous
</button>

<button onClick={next}>
Next
</button>

</div>

</div>

)

}