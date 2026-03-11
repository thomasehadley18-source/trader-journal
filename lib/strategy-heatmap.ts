export function generateStrategyHeatmap(trades:any[]){

const map:any = {}

trades.forEach(t=>{

const strategy = t.strategy || "Unknown"

if(!map[strategy]){
map[strategy] = {
wins:0,
losses:0
}
}

if(t.pnl > 0){
map[strategy].wins++
}else{
map[strategy].losses++
}

})

return Object.keys(map).map(s=>({

strategy:s,
wins:map[s].wins,
losses:map[s].losses

}))

}