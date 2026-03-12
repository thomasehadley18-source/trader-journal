export async function copyTrade(strategy_id:string,trade:any,supabase:any){

const {data:subs}=await supabase
.from("strategy_subscriptions")
.select("*")
.eq("strategy_id",strategy_id)

for(const s of subs||[]){

await supabase
.from("trades")
.insert({

user_id:s.subscriber_id,
symbol:trade.symbol,
entry:trade.entry,
exit:trade.exit,
pnl:trade.pnl,
trade_date:trade.trade_date

})

}

}