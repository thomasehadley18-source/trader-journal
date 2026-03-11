export function generateSessionStats(trades:any[]) {

const sessions:any = {
Asia:{wins:0,losses:0,pnl:0},
London:{wins:0,losses:0,pnl:0},
"New York":{wins:0,losses:0,pnl:0}
}

trades.forEach(t => {

const s = t.session || "Asia"

if(t.pnl > 0){
sessions[s].wins++
}else{
sessions[s].losses++
}

sessions[s].pnl += Number(t.pnl)

})

return Object.keys(sessions).map(session => {

const s = sessions[session]

const total = s.wins + s.losses

const winRate = total
? ((s.wins / total) * 100).toFixed(1)
: 0

return {
session,
wins:s.wins,
losses:s.losses,
winRate,
pnl:s.pnl
}

})

}