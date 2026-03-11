"use client"

export default function SessionHeatmap({ sessions }: any) {

const rows = Object.entries(sessions)

return (

<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>

{rows.map(([session,data]:any)=>{

const total = data.wins + data.losses

const winRate = total ? data.wins / total : 0

const color =
winRate > 0.6 ? "#22c55e" :
winRate > 0.4 ? "#eab308" :
"#ef4444"

return(

<div
key={session}
style={{
padding:20,
background:"#0f172a",
borderRadius:10,
border:`2px solid ${color}`
}}
>

<h3>{session}</h3>

<p>Wins: {data.wins}</p>
<p>Losses: {data.losses}</p>
<p>PnL: {data.pnl}</p>

</div>

)

})}

</div>

)

}