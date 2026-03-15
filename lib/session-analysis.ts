export function analyzeSessions(trades:any[]){

const sessions:any = {
Asia:{trades:0,pnl:0},
London:{trades:0,pnl:0},
NewYork:{trades:0,pnl:0}
}

trades.forEach(t=>{

const hour = new Date(t.created_at).getUTCHours()

let session = "Asia"

if(hour >= 7 && hour < 13){
session = "London"
}

if(hour >= 13 && hour < 20){
session = "NewYork"
}

sessions[session].trades++
sessions[session].pnl += Number(t.pnl || 0)

})

return Object.keys(sessions).map(name=>{

const s = sessions[name]

return{
session:name,
trades:s.trades,
pnl:s.pnl.toFixed(2),
avg:s.trades ? (s.pnl/s.trades).toFixed(2) : "0"
}

})

}
