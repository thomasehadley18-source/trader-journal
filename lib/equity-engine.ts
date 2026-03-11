export function equityCurve(trades:any[]){

let equity=0

return trades.map((t,i)=>{

equity+=Number(t.pnl||0)

return{
trade:i+1,
equity
}

})

}