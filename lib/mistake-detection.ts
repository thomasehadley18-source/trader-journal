export function detectTradingMistakes(trades:any[]){

let revengeTrades = 0
let overTrading = 0
let badRR = 0

for(let i=1;i<trades.length;i++){

const prev = trades[i-1]
const curr = trades[i]

const prevLoss = prev.pnl < 0
const quickTrade =
Math.abs(
new Date(curr.trade_date).getTime() -
new Date(prev.trade_date).getTime()
) < 600000

if(prevLoss && quickTrade){
revengeTrades++
}

if(curr.pnl < 0 && Math.abs(curr.entry-curr.exit) < 0.001){
badRR++
}

}

if(trades.length > 10){
overTrading = trades.length - 10
}

return{

revengeTrades,
overTrading,
badRR

}

}