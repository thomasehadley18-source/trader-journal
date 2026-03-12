export function analyzePropFirm(trades:any[]){

const dailyMap:Record<string,number> = {}

trades.forEach(t=>{

const day = new Date(t.trade_date).toISOString().split("T")[0]

if(!dailyMap[day]){
dailyMap[day] = 0
}

dailyMap[day] += Number(t.pnl || 0)

})

const dailyValues = Object.values(dailyMap) as number[]

const worstDay = dailyValues.length
? Math.min(...dailyValues)
: 0

const bestDay = dailyValues.length
? Math.max(...dailyValues)
: 0

const totalProfit = trades.reduce(
(a,t)=>a + Number(t.pnl || 0),
0
)

return{

bestDay,
worstDay,
totalProfit,
days:dailyValues.length

}

}