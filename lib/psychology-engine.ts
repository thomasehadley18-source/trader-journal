export function analyzePsychology(trades:any[]){

let revenge = 0
let overtrading = 0
let tilt = 0

for(let i=1;i<trades.length;i++){

const prev = Number(trades[i-1].pnl || 0)
const current = Number(trades[i].pnl || 0)

if(prev < 0 && current < 0){
tilt++
}

if(prev < 0 && current > 0){
revenge++
}

if(i > 5){
overtrading++
}

}

return{
revenge,
tilt,
overtrading
}

}