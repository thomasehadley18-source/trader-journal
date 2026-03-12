export function checkPropFirmRules(trades:any[]){

let dailyLoss = 0
let totalLoss = 0

trades.forEach(t=>{

const pnl = Number(t.pnl || 0)

if(pnl < 0){
dailyLoss += Math.abs(pnl)
totalLoss += Math.abs(pnl)
}

})

return{

dailyLoss,
totalLoss

}

}