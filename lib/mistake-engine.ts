export function detectMistakes(trades:any[]){

let revenge=0
let badRR=0

for(let i=1;i<trades.length;i++){

const prev=trades[i-1]
const curr=trades[i]

const prevLoss=prev.pnl<0

const diff=
Math.abs(
new Date(curr.trade_date).getTime()-
new Date(prev.trade_date).getTime()
)

if(prevLoss && diff<600000){
revenge++
}

const rr=
Math.abs(curr.entry-curr.exit)

if(rr<0.0005){
badRR++
}

}

return{

revenge,
badRR

}

}