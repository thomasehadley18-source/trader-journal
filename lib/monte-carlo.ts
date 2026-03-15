export function runMonteCarlo(trades:any[], runs:number = 500){

if(trades.length === 0) return []

const pnl = trades.map(t => Number(t.pnl || 0))

const results:number[][] = []

for(let r=0;r<runs;r++){

let balance = 0
const curve:number[] = []

for(let i=0;i<pnl.length;i++){

const rand = pnl[Math.floor(Math.random()*pnl.length)]

balance += rand
curve.push(balance)

}

results.push(curve)

}

return results

}

export function riskOfRuin(trades:any[]){

const losses = trades.filter(t=>Number(t.pnl) < 0).length
const winrate = 1 - losses / trades.length

return Math.max(0, 1 - winrate*1.5)

}
