export function generateEquityCurve(trades:any[]){

let balance=0
let peak=0
let maxDrawdown=0

const curve = trades.map(t=>{

balance += Number(t.pnl || 0)

if(balance > peak){
peak = balance
}

const drawdown = peak - balance

if(drawdown > maxDrawdown){
maxDrawdown = drawdown
}

return{
date:t.trade_date,
balance,
drawdown
}

})

return{
curve,
maxDrawdown
}

}