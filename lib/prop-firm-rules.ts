export const PROP_FIRM_RULES = {

FTMO: {
maxDailyLoss: "5%",
maxTotalLoss: "10%",
profitTarget: "10%",
minHolding: "1 minute",
consistencyRule: "No single day > 40% of total profits",
weekendHolding: "Allowed on Swing accounts",
prohibitedStrategies: [
"Latency arbitrage",
"Tick scalping",
"Server manipulation",
"Reverse hedging"
]
},

E8: {
maxDailyLoss: "5%",
maxTotalLoss: "8%",
profitTarget: "8%",
minHolding: "1 minute",
consistencyRule: "Max day cannot exceed 30% of profits",
weekendHolding: "Allowed",
prohibitedStrategies: [
"Grid trading",
"Latency arbitrage",
"Tick scalping"
]
},

Topstep: {
maxDailyLoss: "Trailing drawdown",
maxTotalLoss: "Trailing drawdown",
profitTarget: "Varies by account",
minHolding: "1 minute",
consistencyRule: "Must follow scaling plan",
weekendHolding: "Allowed",
prohibitedStrategies: [
"HFT scalping",
"Latency trading"
]
},

Tradeify: {
maxDailyLoss: "5%",
maxTotalLoss: "10%",
profitTarget: "8%",
minHolding: "1 minute",
consistencyRule: "Consistent trading required",
weekendHolding: "Allowed",
prohibitedStrategies: [
"Latency arbitrage",
"Copy trading external accounts"
]
},

TopOneTrader: {
maxDailyLoss: "5%",
maxTotalLoss: "10%",
profitTarget: "10%",
minHolding: "1 minute",
consistencyRule: "No oversized trades",
weekendHolding: "Allowed",
prohibitedStrategies: [
"Tick scalping",
"Latency trading"
]
}

}