export function analyzeStrategies(trades:any[]) {

const strategies:any = {}

trades.forEach(t => {

const tag = t.strategy_tag || "Unknown"

if(!strategies[tag]) {
strategies[tag] = {
wins:0,
losses:0,
pnl:0
}
}

const pnl = Number(t.pnl || 0)

strategies[tag].pnl += pnl

if(pnl > 0)
strategies[tag].wins++
else
strategies[tag].losses++

})

return strategies

}