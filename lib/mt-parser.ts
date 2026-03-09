// Unified MT4/MT5 CSV Parser
// Supports both platforms automatically

import { calculateTradeSessions } from "@/lib/sessions"

export interface ParsedTrade {
  ticket: string
  symbol: string
  direction: string
  entry: number
  exit: number
  lots: number
  pnl: number
  openTime: string
  closeTime: string
  raw: any
}

// Detect if CSV is MT4 or MT5 format
function detectPlatform(headers: string[]): "MT4" | "MT5" {
  if (headers.includes("Ticket") && headers.includes("Profit")) return "MT4"
  if (headers.includes("Deal") && headers.includes("Profit")) return "MT5"
  return "MT4"
}

export function parseMTCSV(csvText: string): ParsedTrade[] {
  const lines = csvText.trim().split("\n")
  const headers = lines[0].split(",").map((h) => h.trim())
  const platform = detectPlatform(headers)

  const trades: ParsedTrade[] = []

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",").map((c) => c.trim())

    if (platform === "MT4") {
      const trade: ParsedTrade = {
        ticket: row[0],
        openTime: row[1],
        type: row[2],
        lots: Number(row[3]),
        symbol: row[4],
        entry: Number(row[5]),
        closeTime: row[6],
        exit: Number(row[7]),
        pnl: Number(row[15]),
        direction: row[2] === "buy" ? "Buy" : "Sell",
        raw: row,
      }

      trades.push(trade)
    }

    if (platform === "MT5") {
      const trade: ParsedTrade = {
        ticket: row[0],
        openTime: row[2],
        symbol: row[3],
        direction: row[4] === "Buy" ? "Buy" : "Sell",
        entry: Number(row[5]),
        lots: Number(row[6]),
        exit: Number(row[9]),
        closeTime: row[8],
        pnl: Number(row[12]),
        raw: row,
      }

      trades.push(trade)
    }
  }

  return trades
}
