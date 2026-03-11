export function detectTradeTags(trade: {
  symbol: string
  side: string
  entry: number
  exit: number
  pnl: number
}) {
  const tags: string[] = []

  const move = Math.abs(Number(trade.exit) - Number(trade.entry))

  if (move < 0.002) {
    tags.push("Scalp")
  }

  if (move >= 0.002 && move < 0.01) {
    tags.push("Intraday")
  }

  if (move >= 0.01) {
    tags.push("Swing")
  }

  if (trade.pnl > 0) {
    tags.push("Winner")
  } else {
    tags.push("Loser")
  }

  if (trade.side?.toUpperCase() === "LONG") {
    tags.push("Long")
  }

  if (trade.side?.toUpperCase() === "SHORT") {
    tags.push("Short")
  }

  if (trade.symbol?.includes("USD")) {
    tags.push("FX")
  }

  if (trade.symbol?.includes("BTC") || trade.symbol?.includes("ETH") || trade.symbol?.includes("SOL")) {
    tags.push("Crypto")
  }

  return tags
}

export function detectStrategyName(trade: {
  entry: number
  exit: number
  pnl: number
}) {
  const move = Math.abs(Number(trade.exit) - Number(trade.entry))

  if (move < 0.002) return "Scalp"
  if (move < 0.01) return "Intraday"
  return "Swing"
}