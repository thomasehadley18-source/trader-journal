export function analyzeStrategyIntelligence(trades:any[]) {

const pairMap:Record<string,{count:number,pnl:number}> = {}
const strategyMap:Record<string,{count:number,pnl:number}> = {}
const sessionMap:Record<string,{count:number,pnl:number}> = {}

trades.forEach(t=>{

const pair = t.pair || "Unknown"
const pnl = Number(t.pnl || 0)
const strategy = t.strategy || "Unknown"

const hour = new Date(t.trade_date).getUTCHours()

let session="Asia"

if(hour>=7 && hour<13) session="London"
if(hour>=13 && hour<20) session="New York"

if(!pairMap[pair]) pairMap[pair]={count:0,pnl:0}
if(!strategyMap[strategy]) strategyMap[strategy]={count:0,pnl:0}
if(!sessionMap[session]) sessionMap[session]={count:0,pnl:0}

pairMap[pair].count++
pairMap[pair].pnl+=pnl

strategyMap[strategy].count++
strategyMap[strategy].pnl+=pnl

sessionMap[session].count++
sessionMap[session].pnl+=pnl

})

return {

pairs:Object.entries(pairMap).map(([name,data])=>({
name,
trades:data.count,
pnl:data.pnl
})),

strategies:Object.entries(strategyMap).map(([name,data])=>({
name,
trades:data.count,
pnl:data.pnl
})),

sessions:Object.entries(sessionMap).map(([name,data])=>({
name,
trades:data.count,
pnl:data.pnl
}))

}

}