type TradeLike = {
  pnl?: number | null
  profit?: number | null
}

export function calculateDrawdown(trades: TradeLike[]) {
  let equity = 0
  let peak = 0
  let maxDrawdown = 0

  for (const trade of trades) {
    const value = Number(trade.pnl ?? trade.profit ?? 0)
    equity += value

    if (equity > peak) {
      peak = equity
    }

    const drawdown = peak - equity
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown
    }
  }

  return {
    maxDrawdown,
  }
}