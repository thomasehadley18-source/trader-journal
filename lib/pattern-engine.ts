export function detectPatterns(trades:any[]){

const pairStats:Record<string,{wins:number,losses:number,pnl:number}>={}

trades.forEach(t=>{

const pair=t.pair || "Unknown"

if(!pairStats[pair]){

pairStats[pair]={
wins:0,
losses:0,
pnl:0
}

}

const pnl=Number(t.pnl||0)

if(pnl>0){
pairStats[pair].wins++
}else if(pnl<0){
pairStats[pair].losses++
}

pairStats[pair].pnl+=pnl

})

return Object.entries(pairStats).map(([pair,data])=>({

pair,
wins:data.wins,
losses:data.losses,
pnl:data.pnl,
winRate:(data.wins/(data.wins+data.losses||1))*100

}))

}