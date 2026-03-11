export function generateEquityCurve(trades:any[]){

let equity = 0

const curve:any[] = []

trades.forEach((t,i)=>{

const pnl = Number(t.pnl || 0)

equity += pnl

curve.push({
trade:i+1,
equity
})

})

return curve

}

export function calculateMaxDrawdown(trades:any[]){

let peak = 0
let equity = 0
let maxDD = 0

trades.forEach(t=>{

equity += Number(t.pnl || 0)

if(equity > peak){
peak = equity
}

const drawdown = peak - equity

if(drawdown > maxDD){
maxDD = drawdown
}

})

return maxDD

}

export function calculateWinLoss(trades:any[]){

const wins = trades.filter(t=>Number(t.pnl)>0).length
const losses = trades.filter(t=>Number(t.pnl)<=0).length

const winRate = wins/(trades.length || 1)

return{
wins,
losses,
winRate
}

}