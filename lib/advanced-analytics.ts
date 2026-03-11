export function calculateAdvancedAnalytics(trades:any[]){

let wins = 0
let losses = 0
let profit = 0
let loss = 0

const pairStats:any = {}
const sessionStats:any = {
Asia:{wins:0,losses:0},
London:{wins:0,losses:0},
NewYork:{wins:0,losses:0}
}

trades.forEach(t=>{

const pnl = Number(t.pnl || 0)

if(pnl > 0){
wins++
profit += pnl
}else{
losses++
loss += Math.abs(pnl)
}

const pair = t.symbol || "Unknown"

if(!pairStats[pair]){
pairStats[pair] = {wins:0,losses:0}
}

if(pnl > 0){
pairStats[pair].wins++
}else{
pairStats[pair].losses++
}

const hour = new Date(t.trade_date).getUTCHours()

let session = "Asia"

if(hour >= 7 && hour < 14){
session = "London"
}

if(hour >= 14){
session = "NewYork"
}

if(pnl > 0){
sessionStats[session].wins++
}else{
sessionStats[session].losses++
}

})

const winRate = wins / (wins + losses || 1)

const profitFactor = profit / (loss || 1)

return{

wins,
losses,
winRate,
profitFactor,
pairStats,
sessionStats

}

}