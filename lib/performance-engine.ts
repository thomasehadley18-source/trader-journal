export function performanceStats(trades:any[]){

let wins=0
let losses=0
let pnl=0

trades.forEach(t=>{

const p=Number(t.pnl||0)

pnl+=p

if(p>0)wins++
else losses++

})

const winRate=wins/(trades.length||1)

return{
wins,
losses,
pnl,
winRate
}

}