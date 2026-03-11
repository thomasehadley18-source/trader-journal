"use client"

import ScreenshotUpload from "./screenshot-upload"

export default function TradesTable({ trades }:any){

return(

<div className="card">

<h2 style={{marginBottom:20}}>Trade History</h2>

<table>

<thead>

<tr>
<th>Pair</th>
<th>Side</th>
<th>Entry</th>
<th>Exit</th>
<th>PnL</th>
<th>Screenshot</th>
</tr>

</thead>

<tbody>

{trades.map((t:any)=>(

<tr key={t.id}>

<td>{t.symbol}</td>
<td>{t.side}</td>
<td>{t.entry}</td>
<td>{t.exit}</td>
<td>{t.pnl}</td>

<td>
<ScreenshotUpload tradeId={t.id} />
</td>

</tr>

))}

</tbody>

</table>

</div>

)

}