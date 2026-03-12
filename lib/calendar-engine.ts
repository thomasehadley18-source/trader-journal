export function buildCalendar(trades:any[]){

const map:Record<string,{pnl:number,trades:number}>={}

trades.forEach(t=>{

const day=new Date(t.trade_date)
.toISOString()
.split("T")[0]

if(!map[day]){
map[day]={pnl:0,trades:0}
}

map[day].pnl+=Number(t.pnl||0)
map[day].trades++

})

return Object.entries(map).map(([date,data])=>({

date,
pnl:data.pnl,
trades:data.trades

}))

}