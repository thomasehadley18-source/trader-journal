export function generateSessionHeatmap(trades:any[]){

const map:any = {}

trades.forEach(t=>{

const hour = new Date(t.trade_date).getUTCHours()

let session = "Asia"

if(hour >= 7 && hour < 14){
session = "London"
}

if(hour >= 14){
session = "NewYork"
}

if(!map[session]){
map[session] = 0
}

map[session] += Number(t.pnl || 0)

})

return map

}