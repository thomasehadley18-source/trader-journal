export function aiAdvisor(trades:any[]){

let wins=0
let losses=0

trades.forEach(t=>{
if(t.pnl>0)wins++
else losses++
})

const winrate=wins/(wins+losses||1)

if(winrate<0.4){
return "Reduce trade frequency and focus on high probability setups."
}

if(winrate>0.6){
return "Increase position size gradually while protecting drawdown."
}

return "Maintain discipline and review losing trades."

}