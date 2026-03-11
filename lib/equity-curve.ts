export function buildEquityCurve(trades:any[]) {

let equity = 0

const curve:any[] = []

trades
.sort((a,b)=> new Date(a.trade_date).getTime() - new Date(b.trade_date).getTime())
.forEach((t)=>{

equity += Number(t.pnl || 0)

curve.push({
date:t.trade_date,
equity
})

})

return curve

}