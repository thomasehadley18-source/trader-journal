export function scoreTrades(trades:any[]){

return trades.map(t=>{

let score=50

if(t.pnl>0)score+=20

const rr=Math.abs(t.exit-t.entry)

if(rr>0.002)score+=15

if(rr<0.0005)score-=20

return{

...t,
score

}

})

}