export function analyzeSessions(trades:any[]) {

const sessions:any = {
Asia:{wins:0,losses:0,pnl:0},
London:{wins:0,losses:0,pnl:0},
NewYork:{wins:0,losses:0,pnl:0}
}

trades.forEach(t=>{

const hour = new Date(t.trade_date).getUTCHours()

let session="NewYork"

if(hour>=0 && hour<7) session="Asia"
else if(hour>=7 && hour<13) session="London"

const pnl = Number(t.pnl||0)

sessions[session].pnl += pnl

if(pnl>0) sessions[session].wins++
else sessions[session].losses++

})

return sessions

}