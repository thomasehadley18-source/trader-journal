export function riskMetrics(trades:any[]) {

  let equity=0
  let peak=0
  let maxDD=0

  trades.forEach(t=>{

    equity += t.pnl

    if(equity>peak) peak=equity

    const dd = peak-equity

    if(dd>maxDD) maxDD=dd

  })

  const wins = trades.filter(t=>t.pnl>0).length

  const winRate = wins / trades.length

  return {
    maxDrawdown:maxDD,
    winRate
  }
}