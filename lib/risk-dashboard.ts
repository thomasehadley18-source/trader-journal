export function riskDashboard(trades:any[]){

let totalRisk=0
let maxLoss=0

trades.forEach(t=>{

const risk=Math.abs(
Number(t.entry)-Number(t.stop||t.entry)
)

totalRisk+=risk

if(t.pnl<maxLoss){
maxLoss=t.pnl
}

})

return{

avgRisk:totalRisk/(trades.length||1),
maxLoss

}

}