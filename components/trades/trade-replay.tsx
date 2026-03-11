"use client"

import TradeChart from "@/components/charts/trade-chart"

export default function TradeReplay({trade}:any){

if(!trade) return null

return(

<div
style={{
border:"1px solid #1e293b",
borderRadius:10,
padding:20,
marginTop:20
}}
>

<h3>Trade Replay</h3>

<p>Pair: {trade.symbol}</p>

<p>Entry: {trade.entry}</p>

<p>Exit: {trade.exit}</p>

<p>PnL: {trade.pnl}</p>

<TradeChart trade={trade}/>

</div>

)

}