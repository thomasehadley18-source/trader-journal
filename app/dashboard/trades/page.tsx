"use client"

import { useState } from "react"

import {
forexPairs,
cryptoPairs,
commodities,
futures,
stocks
} from "@/lib/asset-lists"

export default function TradesPage(){

const [tab,setTab] = useState("Forex")

let pairs:any = forexPairs

if(tab==="Crypto") pairs = cryptoPairs
if(tab==="Commodities") pairs = commodities
if(tab==="Futures") pairs = futures
if(tab==="Stocks") pairs = stocks

return(

<div style={{display:"flex",flexDirection:"column",gap:20}}>

<h1>Trades</h1>

{/* asset tabs */}

<div style={{display:"flex",gap:10}}>

{["Forex","Crypto","Commodities","Futures","Stocks"].map(t=>(
<button
key={t}
onClick={()=>setTab(t)}
style={{
background:tab===t?"#2563eb":"#0f172a"
}}
>
{t}
</button>
))}

</div>

{/* pair dropdown */}

<div className="card">

<label className="muted">
Select Pair
</label>

<select>

{pairs.map((p:string)=>(
<option key={p}>{p}</option>
))}

</select>

</div>

{/* trade form */}

<div className="card">

<h3>Add Trade</h3>

<div style={{display:"grid",gap:10}}>

<input placeholder="Entry price"/>

<input placeholder="Exit price"/>

<input placeholder="Lot size"/>

<select>
<option>Buy</option>
<option>Sell</option>
</select>

<button>Add Trade</button>

</div>

</div>

</div>

)

}