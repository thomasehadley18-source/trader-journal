export function psychologyStats(trades:any[]){

let revenge=0
let tilt=0

for(let i=1;i<trades.length;i++){

const prev=Number(trades[i-1].pnl||0)
const cur=Number(trades[i].pnl||0)

if(prev<0 && cur<0)tilt++

if(prev<0 && cur>0)revenge++

}

return{
revenge,
tilt
}

}