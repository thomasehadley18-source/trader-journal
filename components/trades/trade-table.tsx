"use client"

export default function TradeTable({ trades }:any){

return(

<table style={{width:"100%"}}>

<thead>

<tr>
<th>Pair</th>
<th>Side</th>
<th>Entry</th>
<th>Exit</th>
<th>PnL</th>
<th>Date</th>
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
<td>{new Date(t.trade_date).toLocaleDateString()}</td>
</tr>
))}

</tbody>

</table>

)

}