export function detectTradingMistakes(trades:any[]) {

let earlyClose = 0
let heldTooLong = 0
let overTrading = false

const sessionStats:any = {}
const pairStats:any = {}

trades.forEach((trade,index)=>{

const pnl = Number(trade.pnl)

const move = Math.abs(trade.exit - trade.entry)

if(pnl < 0 && move < 0.002){
earlyClose++
}

if(pnl < 0 && move > 0.02){
heldTooLong++
}

const session = trade.session || "Unknown"

if(!sessionStats[session]){
sessionStats[session] = 0
}

sessionStats[session] += pnl

const pair = trade.symbol

if(!pairStats[pair]){
pairStats[pair] = 0
}

pairStats[pair] += pnl

})

if(trades.length > 20){
overTrading = true
}

let worstSession = "-"
let worstSessionPnL = Infinity

Object.keys(sessionStats).forEach(s=>{
if(sessionStats[s] < worstSessionPnL){
worstSessionPnL = sessionStats[s]
worstSession = s
}
})

let worstPair = "-"
let worstPairPnL = Infinity

Object.keys(pairStats).forEach(p=>{
if(pairStats[p] < worstPairPnL){
worstPairPnL = pairStats[p]
worstPair = p
}
})

return {
earlyClose,
heldTooLong,
overTrading,
worstSession,
worstPair
}

}