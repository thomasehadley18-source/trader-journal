export function analyzeStrategies(trades:any[]){

const map:any = {}

trades.forEach(t=>{

const tag = t.strategy_tag || "Unknown"

if(!map[tag]){

map[tag] = {
wins:0,
losses:0,
pnl:0
}

}

map[tag].pnl += Number(t.pnl || 0)

if(Number(t.pnl) > 0){
map[tag].wins++
}else{
map[tag].losses++
}

})

return map

}