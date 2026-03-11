export function calculateReputation(trades:any[]){

let score=0

trades.forEach(t=>{

const pnl=Number(t.pnl ?? 0)

score+=pnl

})

return Math.max(0,score)

}