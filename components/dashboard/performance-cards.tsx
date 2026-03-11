"use client"

export default function PerformanceCards({ trades }:any){

let wins = 0
let losses = 0
let pnl = 0

trades.forEach((t:any)=>{

const p = Number(t.pnl || 0)

pnl += p

if(p > 0){
wins++
}else{
losses++
}

})

const total = wins + losses

const winRate = total ? ((wins/total)*100).toFixed(1) : 0

return(

<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>

<div className="card">

<h3>Total Trades</h3>

<p>{total}</p>

</div>

<div className="card">

<h3>Win Rate</h3>

<p>{winRate}%</p>

</div>

<div className="card">

<h3>Total PnL</h3>

<p>{pnl}</p>

</div>

<div className="card">

<h3>Wins / Losses</h3>

<p>{wins} / {losses}</p>

</div>

</div>

)

}