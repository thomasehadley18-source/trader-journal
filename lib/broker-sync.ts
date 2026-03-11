export type BrokerTrade = {
  symbol: string
  side: string
  entry: number
  exit: number
  pnl: number
  trade_date: string
}

export async function syncBrokerTrades(): Promise<BrokerTrade[]> {

  // placeholder broker sync system
  // this will later connect to MT5 / NinjaTrader APIs

  const trades: BrokerTrade[] = []

  return trades

}