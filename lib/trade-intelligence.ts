export function calculatePnL(side:string,entry:number,exit:number){

if(!entry || !exit) return 0

if(side === "LONG"){
return exit - entry
}

return entry - exit

}

export function detectSession(date:Date){

const hour = new Date(date).getUTCHours()

if(hour >= 0 && hour < 7) return "Asia"
if(hour >= 7 && hour < 13) return "London"
if(hour >= 13 && hour < 22) return "New York"

return "Asia"

}

export function autoTagTrade(trade:any){

const tags:string[] = []

const pnl = Number(trade.pnl)

if(pnl > 0){
tags.push("Winner")
}else{
tags.push("Loser")
}

const move = Math.abs(trade.exit - trade.entry)

if(move < 0.002){
tags.push("Scalp")
}

if(move > 0.01){
tags.push("Swing")
}

return tags

}