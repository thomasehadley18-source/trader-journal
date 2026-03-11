export function detectPatterns(trades:any[]){

let breakout = 0
let reversal = 0
let trend = 0

trades.forEach(t=>{

const move = Math.abs(t.exit - t.entry)

if(move > 0.01){
breakout++
}

if(t.side === "buy" && t.exit < t.entry){
reversal++
}

if(move > 0.02){
trend++
}

})

return{

breakout,
reversal,
trend

}

}