export function calculatePropFirmStats(trades:any[],startingBalance:number){

let balance=startingBalance
let peak=startingBalance

let dailyLoss=0
let maxDrawdown=0

const dailyMap:any={}

trades.forEach(t=>{

balance+=Number(t.pnl||0)

if(balance>peak) peak=balance

const dd=peak-balance
if(dd>maxDrawdown) maxDrawdown=dd

const date=new Date(t.trade_date).toLocaleDateString()

if(!dailyMap[date]) dailyMap[date]=0
dailyMap[date]+=Number(t.pnl||0)

})

const worstDay = Math.min(...Object.values(dailyMap))

return{

balance,
maxDrawdown,
worstDay,
profit:balance-startingBalance

}

}