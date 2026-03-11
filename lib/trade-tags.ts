export function autoTagTrade(trade:any){

const tags:string[]=[]

const pnl = Number(trade.pnl || 0)

if(pnl>0){
tags.push("winner")
}else{
tags.push("loser")
}

if(trade.pair?.includes("BTC")){
tags.push("crypto")
}

if(trade.pair?.includes("USD")){
tags.push("forex")
}

return tags

}