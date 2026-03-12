export function analyzeSessions(trades:any[]){

const stats={
Asia:0,
London:0,
NewYork:0
}

trades.forEach(t=>{

const hour=new Date(t.trade_date).getUTCHours()

let session="Asia"

if(hour>=7 && hour<14){
session="London"
}

if(hour>=14){
session="NewYork"
}

stats[session]+=Number(t.pnl||0)

})

return stats

}