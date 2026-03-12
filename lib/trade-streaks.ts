export function calculateTradeStreaks(trades:any[]){

let winStreak = 0
let lossStreak = 0
let maxWinStreak = 0
let maxLossStreak = 0

trades.forEach(t=>{

if(t.pnl > 0){

winStreak++
lossStreak = 0

}else{

lossStreak++
winStreak = 0

}

if(winStreak > maxWinStreak){
maxWinStreak = winStreak
}

if(lossStreak > maxLossStreak){
maxLossStreak = lossStreak
}

})

return{

maxWinStreak,
maxLossStreak

}

}