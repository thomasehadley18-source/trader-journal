export function tagTrade(trade:any){

const tags:string[] = []

const pnl = Number(trade.pnl || 0)

if(pnl > 0){
tags.push("Winning Trade")
}else{
tags.push("Losing Trade")
}

if(Math.abs(trade.entry - trade.exit) < 0.002){
tags.push("Scalp")
}

if(Math.abs(trade.entry - trade.exit) > 0.01){
tags.push("Swing")
}

return tags

}