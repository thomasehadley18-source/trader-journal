export function autoTagTrade(trade:any){

const tags:string[] = []

const pnl = Number(trade.pnl || 0)

const duration = Number(trade.duration || 0)

const pair = trade.pair || ""

if(pnl > 0){
tags.push("winning-trade")
}else{
tags.push("losing-trade")
}

if(duration < 300){
tags.push("scalp")
}

if(duration >= 300 && duration < 3600){
tags.push("intraday")
}

if(duration >= 3600){
tags.push("swing")
}

if(pair.includes("BTC")){
tags.push("crypto")
}

if(pair.includes("USD")){
tags.push("forex")
}

return tags

}