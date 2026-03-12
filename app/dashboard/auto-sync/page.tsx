"use client"

import { useState } from "react"

export default function AutoSync(){

const [message,setMessage]=useState("")

async function syncMT4(){

const res = await fetch("/api/import/mt4",{method:"POST"})
const data = await res.json()

setMessage(data.message || "MT4 Sync Complete")

}

async function syncMT5(){

const res = await fetch("/api/import/mt5",{method:"POST"})
const data = await res.json()

setMessage(data.message || "MT5 Sync Complete")

}

return(

<div>

<h1>Auto Trade Sync</h1>

<div className="grid-3">

<div className="card">

<h3>MT4</h3>

<p>Sync MetaTrader 4 trades</p>

<button onClick={syncMT4}>
Sync MT4
</button>

</div>

<div className="card">

<h3>MT5</h3>

<p>Sync MetaTrader 5 trades</p>

<button onClick={syncMT5}>
Sync MT5
</button>

</div>

<div className="card">

<h3>TradingView</h3>

<p>Webhook endpoint</p>

<code>
/api/tradingview/webhooks
</code>

</div>

</div>

{message &&(

<div className="card" style={{marginTop:20}}>
{message}
</div>

)}

</div>

)

}