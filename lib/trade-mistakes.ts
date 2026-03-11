export function detectMistakes(trade:any){

const mistakes:string[] = []

if(trade.pnl < 0){

const move = Math.abs(trade.exit - trade.entry)

if(move < 0.002){
mistakes.push("Closed trade too early")
}

if(move > 0.02){
mistakes.push("Held losing trade too long")
}

}

if(trade.side === "LONG" && trade.exit < trade.entry){
mistakes.push("Entered long against momentum")
}

if(trade.side === "SHORT" && trade.exit > trade.entry){
mistakes.push("Short trade failed momentum")
}

return mistakes

}