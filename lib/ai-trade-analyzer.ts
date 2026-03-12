export function analyzeTrades(trades:any[]){

let mistakes:string[]=[]

let losses=trades.filter(t=>t.pnl<0)
let wins=trades.filter(t=>t.pnl>0)

if(losses.length> wins.length){
mistakes.push("You are losing more trades than winning. Consider tightening entries.")
}

const largeLosses = trades.filter(t=>t.pnl < -100)

if(largeLosses.length > 2){
mistakes.push("Multiple large losses detected. Risk management may be too aggressive.")
}

const rapidTrades = trades.filter((t,i)=>{
if(i===0)return false
const prev=new Date(trades[i-1].trade_date).getTime()
const curr=new Date(t.trade_date).getTime()
return curr-prev < 300000
})

if(rapidTrades.length>3){
mistakes.push("Rapid trading detected. Possible revenge trading.")
}

const pairs:any={}
trades.forEach(t=>{
if(!pairs[t.symbol]) pairs[t.symbol]=0
pairs[t.symbol]+=t.pnl
})

const worstPair = Object.entries(pairs).sort((a:any,b:any)=>a[1]-b[1])[0]

if(worstPair){
mistakes.push(`Your worst performing pair is ${worstPair[0]}. Consider reducing exposure.`)
}

return mistakes

}