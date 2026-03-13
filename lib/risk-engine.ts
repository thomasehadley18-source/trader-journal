export function calculateRiskStats(trades:any[]) {

if(!trades.length){
return {
winRate:0,
avgWin:0,
avgLoss:0,
riskOfRuin:0
}
}

const wins = trades.filter(t=>Number(t.pnl)>0)
const losses = trades.filter(t=>Number(t.pnl)<0)

const winRate = wins.length / trades.length

const avgWin =
wins.reduce((a,b)=>a+Number(b.pnl),0) / (wins.length||1)

const avgLoss =
losses.reduce((a,b)=>a+Math.abs(Number(b.pnl)),0) / (losses.length||1)

const edge =
(winRate * avgWin) - ((1-winRate) * avgLoss)

let riskOfRuin = 0

if(avgLoss>0){
riskOfRuin = Math.max(
0,
Math.min(
1,
(1 - (edge / avgLoss))
)
)
}

return {
winRate,
avgWin,
avgLoss,
riskOfRuin
}

}