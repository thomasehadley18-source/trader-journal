export function rankLeaderboard(trades:any[]) {

const map:any = {}

trades.forEach(t=>{

const trader = t.user_id

if(!map[trader]){
map[trader] = {
trades:0,
wins:0,
pnl:0,
losses:0
}
}

map[trader].trades++
map[trader].pnl += Number(t.pnl || 0)

if(Number(t.pnl)>0){
map[trader].wins++
}else{
map[trader].losses++
}

})

const rows = Object.keys(map).map(id=>{

const t = map[id]

const winrate = t.trades ? t.wins / t.trades : 0
const avgPnL = t.trades ? t.pnl / t.trades : 0

const score =
(t.pnl * 0.5) +
(winrate * 100 * 0.3) +
(avgPnL * 10 * 0.2)

return{
user_id:id,
trades:t.trades,
winrate:(winrate*100).toFixed(1),
pnl:t.pnl.toFixed(2),
score:score.toFixed(2)
}

})

return rows.sort((a,b)=>Number(b.score) - Number(a.score))

}
