export function detectBestStrategy(trades:any[]){

const stats:any={}

trades.forEach(t=>{

const strategy=t.strategy||"Manual"

if(!stats[strategy]){
stats[strategy]=0
}

stats[strategy]+=Number(t.pnl||0)

})

return Object.entries(stats)
.sort((a:any,b:any)=>b[1]-a[1])[0]

}