export function detectPropViolations(trades:any[], rules:any){

let dailyMap:any = {}
let equity = 0
let maxEquity = 0

const violations:any[] = []

trades.forEach(t=>{

equity += Number(t.pnl || 0)

if(equity > maxEquity){
maxEquity = equity
}

const drawdown = maxEquity - equity

if(rules.maxDrawdown && drawdown > rules.maxDrawdown){
violations.push({
type:"Max Drawdown Breach",
trade:t
})
}

const day = new Date(t.created_at).toISOString().split("T")[0]

if(!dailyMap[day]){
dailyMap[day] = 0
}

dailyMap[day] += Number(t.pnl || 0)

if(rules.dailyLoss && dailyMap[day] < -rules.dailyLoss){
violations.push({
type:"Daily Loss Breach",
trade:t
})
}

if(rules.maxSize && Number(t.size) > rules.maxSize){
violations.push({
type:"Position Size Violation",
trade:t
})
}

})

return violations

}
