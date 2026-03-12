export function generateDayHeatmap(trades:any[]){

const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

const map:any={}

days.forEach(d=>map[d]=0)

trades.forEach(t=>{

const day=days[new Date(t.trade_date).getDay()]

map[day]+=Number(t.pnl||0)

})

return days.map(d=>({
day:d,
pnl:map[d]
}))

}



export function generateHourHeatmap(trades:any[]){

const map:any={}

for(let i=0;i<24;i++){
map[i]=0
}

trades.forEach(t=>{

const hour=new Date(t.trade_date).getHours()

map[hour]+=Number(t.pnl||0)

})

return Object.keys(map).map(h=>({

hour:Number(h),
pnl:map[h]

}))

}