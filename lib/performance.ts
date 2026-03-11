export function calculatePerformance(trades:any[]) {

let wins = 0
let losses = 0
let totalPnL = 0

trades.forEach(t => {

const pnl = Number(t.pnl || 0)

totalPnL += pnl

if(pnl > 0) wins++
else if(pnl < 0) losses++

})

const totalTrades = trades.length

const winRate = totalTrades ? wins / totalTrades : 0

const expectancy = totalTrades ? totalPnL / totalTrades : 0

return {
wins,
losses,
winRate,
expectancy
}

}