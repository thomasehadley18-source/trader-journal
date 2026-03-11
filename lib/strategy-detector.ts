export function detectStrategies(trades:any[]){

const map:any={}

trades.forEach(t=>{

const pair=t.pair||"unknown"

if(!map[pair]){

map[pair]={
pair,
trades:0,
pnl:0
}

}

map[pair].trades++
map[pair].pnl+=Number(t.pnl||0)

})

return Object.values(map)

}