export function parseBrokerCSV(csv:string){

const rows = csv.split("\n")

const trades:any[] = []

rows.slice(1).forEach(r=>{

const cols = r.split(",")

trades.push({

symbol:cols[0],
side:cols[1],
entry:Number(cols[2]),
exit:Number(cols[3]),
pnl:Number(cols[4]),
trade_date:cols[5]

})

})

return trades

}