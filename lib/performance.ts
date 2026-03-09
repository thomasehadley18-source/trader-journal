export function calculatePerformance(trades: any[]) {
  const wins = trades.filter((t) => Number(t.pnl) > 0)
  const losses = trades.filter((t) => Number(t.pnl) < 0)

  const winRate = trades.length ? wins.length / trades.length : 0

  const avgWin =
    wins.reduce((sum, t) => sum + Number(t.pnl), 0) / (wins.length || 1)

  const avgLoss =
    losses.reduce((sum, t) => sum + Number(t.pnl), 0) / (losses.length || 1)

  const expectancy = winRate * avgWin + (1 - winRate) * avgLoss

  return {
    winRate,
    avgWin,
    avgLoss,
    expectancy,
  }
}