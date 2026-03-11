export function detectStrategies(trades:any[]) {

const strategies:any = {}

trades.forEach((t)=>{

const pair = t.pair || "unknown"

if(!strategies[pair]){

strategies[pair]={
pair,
trades:0,
wins:0,
losses:0,
pnl:0
}

}

strategies[pair].trades++

const pnl = Number(t.pnl || 0)

strategies[pair].pnl += pnl

if(pnl>0){
strategies[pair].wins++
}else{
strategies[pair].losses++
}

})

return Object.values(strategies)

}