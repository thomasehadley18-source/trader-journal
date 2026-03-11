type TradeLike = {
  pnl?: number | null
  profit?: number | null
}

export function calculatePerformance(trades: TradeLike[]) {
  const values = trades.map((t) => Number(t.pnl ?? t.profit ?? 0))

  const totalTrades = values.length
  const winningTrades = values.filter((v) => v > 0).length
  const totalProfit = values.reduce((sum, v) => sum + v, 0)

  return {
    totalTrades,
    winRate: totalTrades ? winningTrades / totalTrades : 0,
    expectancy: totalTrades ? totalProfit / totalTrades : 0,
  }
}