export function parseTrades(csv:string){

const rows = csv.split("\n")

const headers = rows[0].split(",")

const trades:any[] = []

for(let i=1;i<rows.length;i++){

const cols = rows[i].split(",")

if(cols.length < headers.length) continue

const trade:any = {}

headers.forEach((h,j)=>{
trade[h.trim()] = cols[j]
})

trades.push({
instrument: trade.symbol || trade.instrument,
side: trade.side || trade.direction,
size: Number(trade.size || trade.volume || 0),
entry: Number(trade.entry || trade.entry_price || 0),
exit: Number(trade.exit || trade.exit_price || 0),
pnl: Number(trade.pnl || trade.profit || 0),
created_at: trade.time || trade.date
})

}

return trades

}
