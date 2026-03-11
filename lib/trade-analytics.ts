export function calculateAnalytics(trades:any[]) {

let wins = 0
let losses = 0
let totalPnL = 0

const pairStats:any = {}

trades.forEach(trade => {

const pnl = Number(trade.pnl)

totalPnL += pnl

if(pnl > 0){
wins++
}else{
losses++
}

if(!pairStats[trade.symbol]){
pairStats[trade.symbol] = {
pnl:0,
count:0
}
}

pairStats[trade.symbol].pnl += pnl
pairStats[trade.symbol].count++

})

const winRate = trades.length
? ((wins / trades.length) * 100).toFixed(1)
: 0

const avgPnL = trades.length
? (totalPnL / trades.length).toFixed(2)
: 0

let bestPair = "-"
let worstPair = "-"

let bestValue = -Infinity
let worstValue = Infinity

Object.keys(pairStats).forEach(pair => {

const pnl = pairStats[pair].pnl

if(pnl > bestValue){
bestValue = pnl
bestPair = pair
}

if(pnl < worstValue){
worstValue = pnl
worstPair = pair
}

})

return {
winRate,
totalPnL,
avgPnL,
bestPair,
worstPair,
tradeCount:trades.length
}

}