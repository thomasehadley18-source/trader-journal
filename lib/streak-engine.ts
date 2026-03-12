export function calculateStreaks(trades:any[]){

let win=0
let loss=0

let maxWin=0
let maxLoss=0

trades.forEach(t=>{

if(t.pnl>0){

win++
loss=0

}else{

loss++
win=0

}

if(win>maxWin)maxWin=win
if(loss>maxLoss)maxLoss=loss

})

return{

maxWin,
maxLoss

}

}