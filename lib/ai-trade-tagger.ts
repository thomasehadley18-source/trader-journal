export function autoTagTrades(trades:any[]){

return trades.map(trade=>{

const tags:string[] = []

const move = Math.abs(trade.exit - trade.entry)

if(move > 0.02){
tags.push("trend")
}

if(move < 0.005){
tags.push("scalp")
}

if(trade.pnl < 0){
tags.push("loss")
}

if(trade.pnl > 0){
tags.push("win")
}

return{

...trade,
tags

}

})

}