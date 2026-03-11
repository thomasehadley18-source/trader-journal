export function analyzePairs(trades:any[]) {

const pairs:any = {}

trades.forEach(t=>{

const pair = t.symbol || "Unknown"

if(!pairs[pair]){
pairs[pair]={wins:0,losses:0,pnl:0}
}

const pnl = Number(t.pnl||0)

pairs[pair].pnl += pnl

if(pnl>0) pairs[pair].wins++
else pairs[pair].losses++

})

return pairs

}