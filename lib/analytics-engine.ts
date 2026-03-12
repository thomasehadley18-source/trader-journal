export function calculateEquity(trades:any[]){

let balance = 0

return trades.map(t=>{

balance += Number(t.pnl || 0)

return{
date:new Date(t.trade_date).toLocaleDateString(),
balance
}

})

}


export function pairPerformance(trades:any[]){

const map:any = {}

trades.forEach(t=>{

if(!map[t.symbol]){
map[t.symbol]={symbol:t.symbol,pnl:0,trades:0}
}

map[t.symbol].pnl+=Number(t.pnl||0)
map[t.symbol].trades+=1

})

return Object.values(map)

}


export function sessionPerformance(trades:any[]){

const map:any={
Asia:0,
London:0,
NewYork:0
}

trades.forEach(t=>{

const hour=new Date(t.trade_date).getHours()

if(hour<8) map.Asia+=Number(t.pnl||0)
else if(hour<14) map.London+=Number(t.pnl||0)
else map.NewYork+=Number(t.pnl||0)

})

return[
{name:"Asia",pnl:map.Asia},
{name:"London",pnl:map.London},
{name:"NewYork",pnl:map.NewYork}
]

}