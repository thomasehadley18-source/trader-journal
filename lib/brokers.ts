// lib/brokers.ts
// MVP: define supported brokers and simple lookup

export type BrokerKey = 'MT4' | 'MT5' | 'Tradovate' | 'NinjaTrader' | 'InteractiveBrokers';

export interface BrokerConfig {
  id: BrokerKey;
  name: string;
  // For MVP we start with no live trading from UI. Enable in future.
  supportsLiveTrades?: boolean;
}

export const SUPPORTED_BROKERS: BrokerConfig[] = [
  { id: 'MT4', name: 'MetaTrader 4', supportsLiveTrades: false },
  { id: 'MT5', name: 'MetaTrader 5', supportsLiveTrades: false },
  { id: 'Tradovate', name: 'Tradovate', supportsLiveTrades: false },
  { id: 'NinjaTrader', name: 'NinjaTrader', supportsLiveTrades: false },
  { id: 'InteractiveBrokers', name: 'Interactive Brokers', supportsLiveTrades: false }
];

// Optional helper to fetch by id
export function getBrokerConfig(id: string): BrokerConfig | undefined {
  return SUPPORTED_BROKERS.find((b) => b.id === id);
}