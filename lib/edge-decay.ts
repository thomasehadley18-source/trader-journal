export function detectEdgeDecay(trades:any[]){

if(trades.length < 20) return {
trend:"Not enough trades",
recent:0,
past:0
}

const half = Math.floor(trades.length/2)

const pastTrades = trades.slice(0,half)
const recentTrades = trades.slice(half)

const pastPnL = pastTrades.reduce((s,t)=>s + Number(t.pnl || 0),0)
const recentPnL = recentTrades.reduce((s,t)=>s + Number(t.pnl || 0),0)

const pastAvg = pastPnL / pastTrades.length
const recentAvg = recentPnL / recentTrades.length

let trend = "Stable"

if(recentAvg < pastAvg * 0.5){
trend = "Edge Decaying"
}

if(recentAvg > pastAvg * 1.2){
trend = "Improving"
}

return{
trend,
recent:recentAvg,
past:pastAvg
}

}
