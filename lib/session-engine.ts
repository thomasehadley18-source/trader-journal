export function detectSession(date:string){

const hour=new Date(date).getUTCHours()

if(hour>=0 && hour<8) return "Asia"
if(hour>=8 && hour<13) return "London"
if(hour>=13 && hour<21) return "NewYork"

return "AfterHours"

}

export function sessionStats(trades:any[]){

const sessions:Record<string,{pnl:number,trades:number}>={}

trades.forEach(t=>{

const session=detectSession(t.trade_date)

if(!sessions[session]){
sessions[session]={pnl:0,trades:0}
}

sessions[session].pnl+=Number(t.pnl||0)
sessions[session].trades++

})

return Object.entries(sessions).map(([session,data])=>({

session,
pnl:data.pnl,
trades:data.trades

}))

}