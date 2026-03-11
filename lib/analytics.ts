export function calculateExpectancy(trades:any[]){

let wins = trades.filter(t=>Number(t.pnl)>0)
let losses = trades.filter(t=>Number(t.pnl)<=0)

const avgWin = wins.reduce((a,b)=>a+Number(b.pnl),0) / (wins.length || 1)
const avgLoss = losses.reduce((a,b)=>a+Number(b.pnl),0) / (losses.length || 1)

const winRate = wins.length / (trades.length || 1)

return (winRate * avgWin) + ((1-winRate) * avgLoss)

}

export function riskOfRuin(balance:number,riskPerTrade:number,winRate:number){

const edge = (winRate*2)-1

if(edge<=0) return 1

const risk = riskPerTrade/balance

return Math.pow((1-edge)/(1+edge),balance/risk)

}

export function monteCarlo(trades:any[],runs=500){

let results:number[]=[]

for(let r=0;r<runs;r++){

let equity=0

for(let i=0;i<trades.length;i++){

const randomTrade = trades[Math.floor(Math.random()*trades.length)]

equity+=Number(randomTrade.pnl)

}

results.push(equity)

}

return results

}