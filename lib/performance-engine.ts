export function calculatePerformance(trades:any[]){

let wins=0
let losses=0
let profit=0
let loss=0

trades.forEach(t=>{

const pnl=Number(t.pnl||0)

if(pnl>0){

wins++
profit+=pnl

}else if(pnl<0){

losses++
loss+=Math.abs(pnl)

}

})

const total=wins+losses

const winRate = total ? wins/total : 0

const profitFactor = loss ? profit/loss : profit

return{
wins,
losses,
winRate,
profitFactor,
profit,
loss
}

}


export function equityCurve(trades:any[]){

let balance=0

return trades.map(t=>{

balance+=Number(t.pnl||0)

return{
date:t.trade_date,
balance
}

})

}


export function pairPerformance(trades:any[]){

const map:Record<string,number>={}

trades.forEach(t=>{

const pair=t.pair || "Unknown"

if(!map[pair]) map[pair]=0

map[pair]+=Number(t.pnl||0)

})

return Object.entries(map).map(([pair,pnl])=>({

pair,
pnl

}))

}