export function calculateRiskMetrics(trades:any[]){

let total=0
let wins=0
let losses=0
let profit=0
let loss=0

trades.forEach(t=>{

const pnl=Number(t.pnl ?? t.profit ?? 0)

total++

if(pnl>0){
wins++
profit+=pnl
}else{
losses++
loss+=Math.abs(pnl)
}

})

const winRate=wins/total

const profitFactor=profit/loss

return{
winRate,
profitFactor,
avgWin:profit/wins,
avgLoss:loss/losses
}

}