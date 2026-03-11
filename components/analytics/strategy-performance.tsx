"use client"

export default function StrategyPerformance({data}:any){

return(

<div className="card">

<h3>Strategy Performance</h3>

<table>

<thead>
<tr>
<th>Strategy</th>
<th>Wins</th>
<th>Losses</th>
<th>Win Rate</th>
<th>PnL</th>
</tr>
</thead>

<tbody>

{data.map((s:any)=>(
<tr key={s.strategy}>

<td>{s.strategy}</td>

<td>{s.wins}</td>

<td>{s.losses}</td>

<td>{s.winRate}%</td>

<td
style={{
color:s.pnl > 0 ? "#22c55e" : "#ef4444"
}}
>
{s.pnl}
</td>

</tr>
))}

</tbody>

</table>

</div>

)

}