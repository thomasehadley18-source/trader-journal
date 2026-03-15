export function buildStrategyStats(trades:any[]) {

const map:any = {}

trades.forEach(t=>{

const strat = t.strategy || "Uncategorized"

if(!map[strat]){
map[strat] = {
trades:0,
wins:0,
losses:0,
pnl:0
}
}

map[strat].trades++
map[strat].pnl += Number(t.pnl || 0)

if(Number(t.pnl)>0){
map[strat].wins++
}else{
map[strat].losses++
}

})

return Object.keys(map).map(name=>{

const s = map[name]

return{
name,
trades:s.trades,
winrate: s.trades ? (s.wins/s.trades*100).toFixed(1) : "0",
pnl:s.pnl.toFixed(2)
}

})

}
