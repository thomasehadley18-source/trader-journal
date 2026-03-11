export function calculateEdgeScore(trades:any[]){

if(trades.length===0) return 0

const wins = trades.filter(t=>t.pnl>0).length

const losses = trades.filter(t=>t.pnl<=0).length

const avgWin =
trades
.filter(t=>t.pnl>0)
.reduce((a,b)=>a+Number(b.pnl),0)/(wins||1)

const avgLoss =
Math.abs(
trades
.filter(t=>t.pnl<0)
.reduce((a,b)=>a+Number(b.pnl),0)/(losses||1)
)

const winRate = wins/trades.length

const expectancy =
(winRate*avgWin) - ((1-winRate)*avgLoss)

return expectancy
}