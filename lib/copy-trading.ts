export function rankTraders(traders:any[]){

return traders
.map(t=>{

const winrate = t.wins/(t.trades || 1)

const score =
(t.pnl * 0.5) +
(winrate * 100 * 0.3) -
(t.drawdown * 0.2)

return {
...t,
score
}

})
.sort((a,b)=>b.score-a.score)

}