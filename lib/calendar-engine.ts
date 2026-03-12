export function buildCalendar(trades:any[]){

const days:any={}

trades.forEach(t=>{

const date=new Date(t.trade_date).toISOString().split("T")[0]

if(!days[date]){
days[date]=0
}

days[date]+=Number(t.pnl||0)

})

return days

}