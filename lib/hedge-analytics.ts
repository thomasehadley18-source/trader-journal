export function calculateExpectancy(trades: any[]) {

  const wins = trades.filter(t => t.pnl > 0)
  const losses = trades.filter(t => t.pnl < 0)

  const winRate = wins.length / trades.length

  const avgWin =
    wins.reduce((a,b)=>a+b.pnl,0)/(wins.length || 1)

  const avgLoss =
    losses.reduce((a,b)=>a+b.pnl,0)/(losses.length || 1)

  const expectancy =
    winRate * avgWin + (1 - winRate) * avgLoss

  return {
    winRate,
    avgWin,
    avgLoss,
    expectancy
  }
}

export function calculateRMultiples(trades:any[]) {

  return trades.map(t => {

    if(!t.risk) return 0

    return t.pnl / t.risk
  })
}

export function calculateRiskOfRuin(trades:any[], riskPerTrade=0.01){

  const wins = trades.filter(t => t.pnl > 0)
  const losses = trades.filter(t => t.pnl < 0)

  const winRate = wins.length / trades.length

  const lossRate = losses.length / trades.length

  const riskOfRuin =
    Math.pow(lossRate / winRate, 1 / riskPerTrade)

  return riskOfRuin
}

export function monteCarloSimulation(trades:any[], simulations=500){

  const results:number[]=[]

  for(let i=0;i<simulations;i++){

    let equity=0

    for(let j=0;j<trades.length;j++){

      const trade =
        trades[Math.floor(Math.random()*trades.length)]

      equity += trade.pnl
    }

    results.push(equity)
  }

  return results
}