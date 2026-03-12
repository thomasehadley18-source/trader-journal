export function findEdges(trades:any[]){

const pairMap:any={}
const strategyMap:any={}
const sessionMap:any={Asia:0,London:0,NewYork:0}

trades.forEach(t=>{

const pnl=Number(t.pnl||0)

if(!pairMap[t.symbol]) pairMap[t.symbol]=0
pairMap[t.symbol]+=pnl

if(t.strategy){

if(!strategyMap[t.strategy]) strategyMap[t.strategy]=0
strategyMap[t.strategy]+=pnl

}

const hour=new Date(t.trade_date).getHours()

if(hour<8) sessionMap.Asia+=pnl
else if(hour<14) sessionMap.London+=pnl
else sessionMap.NewYork+=pnl

})

const bestPair=Object.entries(pairMap).sort((a:any,b:any)=>b[1]-a[1])[0]
const bestStrategy=Object.entries(strategyMap).sort((a:any,b:any)=>b[1]-a[1])[0]
const bestSession=Object.entries(sessionMap).sort((a:any,b:any)=>b[1]-a[1])[0]

return{

bestPair,
bestStrategy,
bestSession

}

}