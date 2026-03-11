export function calculateDrawdown(trades:any[]) {

let equity = 0
let peak = 0
let maxDrawdown = 0

trades.forEach(t => {

equity += Number(t.pnl || 0)

if(equity > peak) peak = equity

const drawdown = peak - equity

if(drawdown > maxDrawdown)
maxDrawdown = drawdown

})

return { maxDrawdown }

}