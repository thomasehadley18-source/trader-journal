export function rankTraders(traders:any[]){

return traders.sort((a,b)=>{

return b.pnl - a.pnl

})

}