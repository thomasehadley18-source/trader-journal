export function analyzePropAccount(trades:any[],account:any){

let balance = account.account_size

let maxBalance = balance

let dailyLoss = 0

let tradingDays = new Set()

trades.forEach(trade=>{

balance += Number(trade.pnl)

if(balance > maxBalance){
maxBalance = balance
}

const date = new Date(trade.trade_date).toDateString()

tradingDays.add(date)

})

const drawdown = (maxBalance - balance)

const profit = balance - account.account_size

return{

balance,

profit,

drawdown,

profitProgress:profit/account.profit_target,

dailyDrawdownHit:drawdown > account.daily_drawdown,

maxDrawdownHit:drawdown > account.max_drawdown,

tradingDays:tradingDays.size

}

}