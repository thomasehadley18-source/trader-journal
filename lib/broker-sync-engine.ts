import {
fetchMetaTraderTrades,
fetchNinjaTraderTrades,
fetchTradovateTrades,
fetchIBTrades
} from "./broker-apis"

export async function syncAllBrokers(){

const mt = await fetchMetaTraderTrades()
const ninja = await fetchNinjaTraderTrades()
const tradovate = await fetchTradovateTrades()
const ib = await fetchIBTrades()

return [

...mt,
...ninja,
...tradovate,
...ib

]

}