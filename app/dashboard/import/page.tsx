"use client"

import { useState } from "react"

const brokers = [

{ name:"MetaTrader 4", type:"forex" },
{ name:"MetaTrader 5", type:"forex" },

{ name:"NinjaTrader", type:"futures" },
{ name:"Tradovate", type:"futures" },
{ name:"Rithmic", type:"futures" },

{ name:"TradingView", type:"charting" },
{ name:"cTrader", type:"forex" },

{ name:"Interactive Brokers", type:"stocks" },
{ name:"ThinkOrSwim", type:"stocks" },

{ name:"Binance", type:"crypto" },
{ name:"Coinbase", type:"crypto" },
{ name:"Kraken", type:"crypto" },
{ name:"Bybit", type:"crypto" }

]

export default function ImportPage(){

const [connected,setConnected]=useState<string[]>([])

function connect(broker:string){

alert(`Connection flow coming soon for ${broker}`)

setConnected(prev=>[...prev,broker])

}

return(

<div>

<h1>Broker Connections</h1>

<p style={{marginBottom:20}}>
Connect your trading platforms to automatically import trades.
</p>

<div className="grid-3">

{brokers.map(broker=>(

<div className="card" key={broker.name}>

<h3>{broker.name}</h3>

<p className="muted">{broker.type}</p>

<button
onClick={()=>connect(broker.name)}
style={{marginTop:10}}
>

{connected.includes(broker.name)
? "Connected"
: "Connect"}

</button>

</div>

))}

</div>

</div>

)

}