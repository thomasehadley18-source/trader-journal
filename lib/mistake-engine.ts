export function detectTradeMistakes(trades:any[]){

const mistakes:any[] = []

trades.forEach(t=>{

const risk = Math.abs((t.entry || 0) - (t.stop || 0))
const reward = Math.abs((t.target || 0) - (t.entry || 0))

if(risk > 0 && reward/risk < 1){
mistakes.push({
type:"Low R:R",
trade:t
})
}

if(t.pnl < 0 && Math.abs(t.pnl) > 3 * risk){
mistakes.push({
type:"Held Loser Too Long",
trade:t
})
}

if(t.pnl > 0 && reward > 0 && t.pnl < reward*0.3){
mistakes.push({
type:"Cut Winner Early",
trade:t
})
}

})

return mistakes

}