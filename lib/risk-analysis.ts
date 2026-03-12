export function calculateRiskPerTrade(trades:any[]){

let totalRisk = 0

trades.forEach(t=>{

const risk = Math.abs(
Number(t.entry) - Number(t.stop || t.entry)
)

totalRisk += risk

})

return totalRisk / (trades.length || 1)

}