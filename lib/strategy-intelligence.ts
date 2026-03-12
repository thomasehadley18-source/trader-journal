export function analyzeStrategyIntelligence(trades:any[]){

if(trades.length === 0){
return {
bestPair:null,
worstPair:null,
bestSession:null,
bestStrategy:null
}
}

const pairStats:any = {}
const sessionStats:any = {
Asia:0,
London:0,
NewYork:0
}
const strategyStats:any = {}

trades.forEach(t=>{

const pnl = Number(t.pnl || 0)

const pair = t.symbol || "Unknown"

if(!pairStats[pair]){
pairStats[pair] = 0
}

pairStats[pair] += pnl

const hour = new Date(t.trade_date).getUTCHours()

let session = "Asia"

if(hour >= 7 && hour < 14){
session = "London"
}

if(hour >= 14){
session = "NewYork"
}

sessionStats[session] += pnl

const strategy = t.strategy || "Manual"

if(!strategyStats[strategy]){
strategyStats[strategy] = 0
}

strategyStats[strategy] += pnl

})

const bestPair =
Object.entries(pairStats)
.sort((a:any,b:any)=>b[1]-a[1])[0]

const worstPair =
Object.entries(pairStats)
.sort((a:any,b:any)=>a[1]-b[1])[0]

const bestSession =
Object.entries(sessionStats)
.sort((a:any,b:any)=>b[1]-a[1])[0]

const bestStrategy =
Object.entries(strategyStats)
.sort((a:any,b:any)=>b[1]-a[1])[0]

return {

bestPair,
worstPair,
bestSession,
bestStrategy

}

}