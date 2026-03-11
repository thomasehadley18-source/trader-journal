export function detectStrategy(trade:any){

const range = Math.abs(trade.entry - trade.exit)

if(range < 0.002)
return "Scalp"

if(range < 0.01)
return "Intraday"

return "Swing"

}