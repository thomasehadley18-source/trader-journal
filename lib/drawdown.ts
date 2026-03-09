export function calculateDrawdown(trades: any[]) {

  let equity = 0
  let peak = 0
  let maxDD = 0

  trades.forEach((t) => {

    equity += t.pnl

    if (equity > peak) peak = equity

    const dd = peak - equity

    if (dd > maxDD) maxDD = dd

  })

  return {
    maxDrawdown: maxDD
  }
}