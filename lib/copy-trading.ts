export function rankTraders(trades:any[]) {

const map:any = {}

trades.forEach(t=>{

const trader = t.user_id

if(!map[trader]){
map[trader] = {
trades:0,
wins:0,
pnl:0
}
}

map[trader].trades++
map[trader].pnl += Number(t.pnl || 0)

if(Number(t.pnl) > 0){
map[trader].wins++
}

})

return Object.keys(map).map(id=>{

const t = map[id]

return {
user_id:id,
trades:t.trades,
winrate:t.trades ? (t.wins/t.trades*100).toFixed(1) : "0",
pnl:t.pnl.toFixed(2)
}

}).sort((a,b)=>Number(b.pnl) - Number(a.pnl))

}
