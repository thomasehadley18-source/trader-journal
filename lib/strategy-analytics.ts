export function generateStrategyStats(trades:any[]) {

const strategies:any = {}

trades.forEach(t => {

const strategy = t.strategy || "Manual"

if(!strategies[strategy]){
strategies[strategy] = {
wins:0,
losses:0,
pnl:0
}
}

if(t.pnl > 0){
strategies[strategy].wins++
}else{
strategies[strategy].losses++
}

strategies[strategy].pnl += Number(t.pnl)

})

return Object.keys(strategies).map(strategy => {

const s = strategies[strategy]

const total = s.wins + s.losses

const winRate = total
? ((s.wins / total) * 100).toFixed(1)
: 0

return {
strategy,
wins:s.wins,
losses:s.losses,
winRate,
pnl:s.pnl
}

})

}