export function reviewTrade(trade:any){

let score = 100
const notes:string[] = []

const risk = Math.abs(trade.entry - trade.stop || 0)

if(risk === 0){
score -= 20
notes.push("No stop loss detected")
}

if(Math.abs(trade.pnl) < risk){
score -= 10
notes.push("Low reward relative to risk")
}

if(trade.pnl < 0){
score -= 15
notes.push("Trade closed at loss")
}

if(score > 85){
notes.push("High quality trade")
}

return{
score,
grade: score > 85 ? "A" : score > 70 ? "B" : "C",
notes
}

}
