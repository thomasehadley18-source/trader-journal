export type ParsedTrade = {
  ticket: string
  openTime: string
  direction: string
  lots: number
  symbol: string
  entry: number
  stopLoss: number
  takeProfit: number
  closeTime: string
  exit: number
  commission: number
  swap: number
  profit: number
  pnl: number
  raw: string[]
}

export function parseMTExport(csvText: string): ParsedTrade[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length <= 1) {
    return []
  }

  const rows = lines.slice(1)

  return rows
    .map((line) => {
      const row = line.split(",").map((cell) => cell.trim())

      if (row.length < 13) {
        return null
      }

      const profit = Number(row[12] || 0)

      return {
        ticket: row[0],
        openTime: row[1],
        direction: row[2],
        lots: Number(row[3] || 0),
        symbol: row[4],
        entry: Number(row[5] || 0),
        stopLoss: Number(row[6] || 0),
        takeProfit: Number(row[7] || 0),
        closeTime: row[8],
        exit: Number(row[9] || 0),
        commission: Number(row[10] || 0),
        swap: Number(row[11] || 0),
        profit,
        pnl: profit,
        raw: row,
      }
    })
    .filter((trade): trade is ParsedTrade => trade !== null)
}

export function parseMTCSV(csvText: string): ParsedTrade[] {
  return parseMTExport(csvText)
}