"use client"

export default function ImportPage(){

const webhook = `${typeof window !== "undefined" ? window.location.origin : ""}/api/import/broker`

return(

<div>

<h1>Broker Import</h1>

<p>Use this webhook to automatically import trades.</p>

<div style={{
background:"#0f172a",
padding:20,
borderRadius:10,
marginTop:20
}}>

<code>{webhook}</code>

</div>

<h2 style={{marginTop:40}}>Supported Platforms</h2>

<ul>

<li>MetaTrader 4</li>
<li>MetaTrader 5</li>
<li>NinjaTrader</li>
<li>TradingView</li>
<li>MyFXBook</li>

</ul>

</div>

)

}