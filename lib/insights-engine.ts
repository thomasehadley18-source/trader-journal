export function generateInsights(trades:any[]) {

let lossesAfterWin = 0
let winStreak = 0

for(let i=1;i<trades.length;i++){

const prev = Number(trades[i-1].pnl)
const current = Number(trades[i].pnl)

if(prev > 0 && current < 0)
lossesAfterWin++

if(prev > 0 && current > 0)
winStreak++

}

const insights = []

if(lossesAfterWin > 3)
insights.push("You tend to lose trades after a winning trade.")

if(winStreak > 3)
insights.push("You perform well during winning streaks.")

return insights

}