export function parseMT(csv:string){

const rows=csv.split("\n")

return rows.slice(1).map(r=>{

const cols=r.split(",")

return{

symbol:cols[0],
entry:Number(cols[1]),
exit:Number(cols[2]),
pnl:Number(cols[3])

}

})

}