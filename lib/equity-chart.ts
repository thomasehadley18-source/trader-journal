export function generateEquityCurve(trades:any[]) {

let equity = 0

return trades.map(trade => {

equity += Number(trade.pnl)

return {
date: new Date(trade.trade_date).toLocaleDateString(),
equity
}

})

}