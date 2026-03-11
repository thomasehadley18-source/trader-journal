export function generateInsights(trades:any[]) {

let insights:string[] = []

if(trades.length < 5){
insights.push("Not enough trades to generate insights.")
return insights
}

let winAfterLoss = 0
let lossAfterWin = 0

let sessionMap:any = {}
let pairMap:any = {}

for(let i=0;i<trades.length;i++){

const t = trades[i]
const pnl = Number(t.pnl || 0)
const pair = t.symbol || "Unknown"
const hour = new Date(t.trade_date).getUTCHours()

let session = "Late"

if(hour >=0 && hour <7) session = "Asia"
if(hour >=7 && hour <13) session = "London"
if(hour >=13 && hour <20) session = "New York"

if(!sessionMap[session]){
sessionMap[session] = {wins:0,losses:0}
}

if(pnl > 0) sessionMap[session].wins++
else sessionMap[session].losses++

if(!pairMap[pair]){
pairMap[pair] = {wins:0,losses:0}
}

if(pnl > 0) pairMap[pair].wins++
else pairMap[pair].losses++

if(i>0){

const prev = Number(trades[i-1].pnl)

if(prev < 0 && pnl > 0) winAfterLoss++
if(prev > 0 && pnl < 0) lossAfterWin++

}

}

if(lossAfterWin > 3){
insights.push("You tend to lose trades after a winning trade.")
}

if(winAfterLoss > 3){
insights.push("You often recover well after a losing trade.")
}

let bestSession = ""
let bestRate = 0

Object.entries(sessionMap).forEach(([session,data]:any)=>{

const total = data.wins + data.losses
if(total === 0) return

const winRate = data.wins / total

if(winRate > bestRate){
bestRate = winRate
bestSession = session
}

})

if(bestSession){
insights.push(`Your strongest session is ${bestSession}.`)
}

let bestPair = ""
let bestPairRate = 0

Object.entries(pairMap).forEach(([pair,data]:any)=>{

const total = data.wins + data.losses
if(total === 0) return

const winRate = data.wins / total

if(winRate > bestPairRate){
bestPairRate = winRate
bestPair = pair
}

})

if(bestPair){
insights.push(`Your best performing pair is ${bestPair}.`)
}

return insights

}