"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { parseTrades } from "@/lib/import-engine"

export default function ImportPage(){

const [loading,setLoading] = useState(false)

async function upload(e:any){

const file = e.target.files[0]

if(!file) return

setLoading(true)

const text = await file.text()

const trades = parseTrades(text)

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

const rows = trades.map(t=>({
...t,
user_id:user.id
}))

await supabase
.from("trades")
.insert(rows)

setLoading(false)

alert(`${rows.length} trades imported`)

}

return(

<div>

<h1>Import Trades</h1>

<div className="card">

<p>Upload trade history CSV from your broker.</p>

<input
type="file"
accept=".csv"
onChange={upload}
/>

{loading && <p>Importing trades...</p>}

</div>

<div className="card" style={{marginTop:20}}>

<h3>Supported Platforms</h3>

<ul>

<li>MetaTrader 4</li>
<li>MetaTrader 5</li>
<li>cTrader</li>
<li>DXTrade</li>
<li>MatchTrader</li>

<li>Tradovate</li>
<li>NinjaTrader</li>
<li>Rithmic</li>
<li>TopstepX</li>
<li>TradeStation</li>

<li>Interactive Brokers</li>
<li>ThinkOrSwim</li>
<li>Webull</li>
<li>E*Trade</li>

<li>Binance</li>
<li>Bybit</li>
<li>Coinbase</li>
<li>Kraken</li>
<li>Bitget</li>
<li>OKX</li>

<li>TradingView</li>

</ul>

</div>

</div>

)

}
