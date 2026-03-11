export function analyzeStrategies(trades:any[]) {

const strategies:any = {}

trades.forEach(t=>{

const strat = t.strategy || "Uncategorized"

if(!strategies[strat]){

strategies[strat] = {
wins:0,
losses:0,
pnl:0,
trades:0
}

}

strategies[strat].trades++

const pnl = Number(t.pnl || 0)

strategies[strat].pnl += pnl

if(pnl > 0){
strategies[strat].wins++
}else{
strategies[strat].losses++
}

})

return strategies

}