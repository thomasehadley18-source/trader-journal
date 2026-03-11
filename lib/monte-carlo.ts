export function runMonteCarlo(trades:any[],simulations=500){

if(trades.length===0) return []

const returns = trades.map(t=>Number(t.pnl))

const results:any[] = []

for(let i=0;i<simulations;i++){

let equity = 0

for(let j=0;j<returns.length;j++){

const r = returns[Math.floor(Math.random()*returns.length)]

equity += r

}

results.push(equity)

}

return results

}