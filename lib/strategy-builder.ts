export function buildStrategies(trades:any[]){

const strategies:any = {}

trades.forEach(t=>{

const key = `${t.symbol}-${t.side}`

if(!strategies[key]){
strategies[key] = {
wins:0,
losses:0
}
}

if(t.pnl > 0){
strategies[key].wins++
}else{
strategies[key].losses++
}

})

return Object.keys(strategies).map(k=>({

name:k,
wins:strategies[k].wins,
losses:strategies[k].losses

}))

}