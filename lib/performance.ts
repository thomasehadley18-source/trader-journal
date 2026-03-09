export function calculatePerformance(trades: any[]) {

  const wins = trades.filter((t) => t.pnl > 0)
  const losses = trades.filter((t) => t.pnl < 0)

  const winRate = wins.length / trades.length

  const avgWin =
    wins.reduce((a, b) => a + b.pnl, 0) / (wins.length || 1)

  const avgLoss =
    losses.reduce((a, b) => a + b.pnl, 0) / (losses.length || 1)

  const expectancy =
    winRate * avgWin + (1 - winRate) * avgLoss

  return {
    winRate,
    avgWin,
    avgLoss,
    expectancy,
  }
}