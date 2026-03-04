export type AssetClass = "Forex" | "Futures" | "Stocks" | "Crypto";

export type Direction = "Long" | "Short";

export interface Trade {
  assetClass: AssetClass;
  symbol: string;
  direction: Direction;
  entry: number;
  stop: number;
  exit: number;
  quantity: number;
  multiplier: number;
  date: string;
}