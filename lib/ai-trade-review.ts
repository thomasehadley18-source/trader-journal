export function reviewTrade(trade:any){

const review:any = {}

const risk = Math.abs(trade.entry - trade.stop || 0)

const reward = Math.abs(trade.exit - trade.entry)

const rr = reward / (risk || 1)

review.rr = rr

if(rr < 1){
review.rating = "Poor R:R"
}

if(rr >= 2){
review.rating = "Strong R:R"
}

if(trade.pnl < 0){
review.mistake = "Loss trade"
}

if(trade.pnl > 0){
review.mistake = "Good execution"
}

return review

}