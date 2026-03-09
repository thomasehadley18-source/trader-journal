export function calculateDrawdown(trades: any[]) {
  let equity = 0
  let peak = 0
  let maxDrawdown = 0

  for (const trade of trades) {
    equity += Number(trade.pnl || 0)

    if (equity > peak) peak = equity

    const dd = peak - equity

    if (dd > maxDrawdown) {
      maxDrawdown = dd
    }
  }

  return { maxDrawdown }
}