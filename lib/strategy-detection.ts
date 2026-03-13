export function detectStrategies(trades:any[]){

const map:Record<string,{count:number,pnl:number}>={}

trades.forEach(t=>{

const duration = Number(t.duration || 0)
const pnl = Number(t.pnl || 0)

let strategy="Unknown"

if(duration < 2) strategy="Scalping"
else if(duration < 10) strategy="Momentum"
else if(duration < 60) strategy="Breakout"
else strategy="Swing"

if(!map[strategy]){
map[strategy]={count:0,pnl:0}
}

map[strategy].count++
map[strategy].pnl+=pnl

})

return Object.entries(map).map(([name,data])=>({

strategy:name,
trades:data.count,
pnl:data.pnl

}))

}