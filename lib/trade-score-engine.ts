export function scoreTrade(trade:any){

let score = 50

const pnl = Number(trade.pnl || 0)
const risk = Number(trade.risk || 1)
const duration = Number(trade.duration || 0)

if(pnl > 0) score += 20
if(pnl < 0) score -= 10

if(risk <= 1) score += 10
if(risk > 2) score -= 10

if(duration > 2 && duration < 60) score += 10
if(duration < 1) score -= 5

if(score > 100) score = 100
if(score < 0) score = 0

return score

}



export function scoreTrades(trades:any[]){

return trades.map(t=>({

...t,
score: scoreTrade(t)

}))

}