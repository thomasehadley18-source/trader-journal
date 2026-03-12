export function parseMT4(csv:string){

const rows = csv.split("\n").map(r=>r.trim()).filter(Boolean)

const data = rows.slice(1)

return data.map(row=>{

const cols = row.split(",")

return{
symbol:cols[1],
side:cols[2]==="buy"?"LONG":"SHORT",
entry:Number(cols[4]),
exit:Number(cols[5]),
pnl:Number(cols[6]),
trade_date:cols[0]
}

})

}


export function parseMT5(csv:string){

const rows = csv.split("\n").map(r=>r.trim()).filter(Boolean)

const data = rows.slice(1)

return data.map(row=>{

const cols=row.split(",")

return{
symbol:cols[2],
side:cols[3]==="Buy"?"LONG":"SHORT",
entry:Number(cols[5]),
exit:Number(cols[6]),
pnl:Number(cols[7]),
trade_date:cols[0]
}

})

}


export function parseNinja(csv:string){

const rows = csv.split("\n").map(r=>r.trim()).filter(Boolean)

const data = rows.slice(1)

return data.map(row=>{

const cols=row.split(",")

return{
symbol:cols[0],
side:cols[1]==="Long"?"LONG":"SHORT",
entry:Number(cols[2]),
exit:Number(cols[3]),
pnl:Number(cols[4]),
trade_date:cols[5]
}

})

}