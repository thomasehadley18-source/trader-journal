export function calculateInstitutionalMetrics(trades:any[]){

if(trades.length === 0){
return {
expectancy:0,
avgR:0,
maxDrawdown:0,
sharpe:0,
riskOfRuin:0
}
}

let wins = 0
let losses = 0

let winTotal = 0
let lossTotal = 0

let equity = 0
let peak = 0
let maxDrawdown = 0

const returns:number[] = []

trades.forEach(t=>{

const pnl = Number(t.pnl || 0)

returns.push(pnl)

equity += pnl

if(equity > peak){
peak = equity
}

const drawdown = peak - equity

if(drawdown > maxDrawdown){
maxDrawdown = drawdown
}

if(pnl > 0){
wins++
winTotal += pnl
}else{
losses++
lossTotal += Math.abs(pnl)
}

})

const winRate = wins / trades.length

const avgWin = winTotal / (wins || 1)
const avgLoss = lossTotal / (losses || 1)

const expectancy =
(winRate * avgWin) -
((1 - winRate) * avgLoss)

const avgR =
(avgWin / (avgLoss || 1))

const mean =
returns.reduce((a,b)=>a+b,0) / returns.length

const variance =
returns.reduce((a,b)=>a + Math.pow(b - mean,2),0) / returns.length

const stdDev = Math.sqrt(variance)

const sharpe =
mean / (stdDev || 1)

const riskOfRuin =
Math.pow(
(1 - winRate) / (1 + avgR),
trades.length
)

return{

expectancy,
avgR,
maxDrawdown,
sharpe,
riskOfRuin

}

}