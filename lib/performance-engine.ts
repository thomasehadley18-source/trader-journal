export function calculatePerformance(trades:any[]) {

const wins = trades.filter(t=>Number(t.pnl)>0)
const losses = trades.filter(t=>Number(t.pnl)<0)

const winRate = trades.length ? wins.length / trades.length : 0

const expectancy =
trades.reduce((a,b)=>a+Number(b.pnl||0),0) / (trades.length||1)

return {
winRate,
expectancy
}

}



export function equityCurve(trades:any[]) {

let balance = 0

return trades.map(t=>{

balance += Number(t.pnl || 0)

return {
date: t.trade_date,
equity: balance
}

})

}



export function pairPerformance(trades:any[]) {

const map:Record<string,{trades:number,pnl:number}> = {}

trades.forEach(t=>{

const pair = t.pair || "Unknown"
const pnl = Number(t.pnl || 0)

if(!map[pair]){
map[pair] = {trades:0,pnl:0}
}

map[pair].trades++
map[pair].pnl += pnl

})

return Object.entries(map).map(([pair,data])=>({
pair,
trades:data.trades,
pnl:data.pnl
}))

}



export function calculatePerformanceMetrics(trades:any[]) {

if(!trades.length){
return {
profitFactor:0,
expectancy:0,
sharpe:0,
avgR:0
}
}

const wins = trades.filter(t=>Number(t.pnl)>0)
const losses = trades.filter(t=>Number(t.pnl)<0)

const totalWin = wins.reduce((a,b)=>a+Number(b.pnl),0)
const totalLoss = losses.reduce((a,b)=>a+Math.abs(Number(b.pnl)),0)

const profitFactor = totalLoss ? totalWin / totalLoss : 0

const expectancy =
(trades.reduce((a,b)=>a+Number(b.pnl||0),0)) / trades.length

const returns = trades.map(t=>Number(t.pnl||0))

const mean =
returns.reduce((a,b)=>a+b,0) / returns.length

const variance =
returns.reduce((a,b)=>a+Math.pow(b-mean,2),0) / returns.length

const std = Math.sqrt(variance)

const sharpe = std ? mean / std : 0

const avgR =
trades.reduce((a,b)=>a+Number(b.risk||0),0) / trades.length

return {
profitFactor,
expectancy,
sharpe,
avgR
}

}