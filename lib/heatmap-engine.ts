export function generateDayHeatmap(trades:any[]) {

const map:Record<string,number> = {}

trades.forEach(t => {

const date = new Date(t.trade_date)
const day = date.toLocaleDateString("en-US",{weekday:"short"})

if(!map[day]) map[day] = 0

map[day] += Number(t.pnl || 0)

})

return Object.entries(map).map(([day,pnl]) => ({
day,
pnl
}))

}



export function generateHourHeatmap(trades:any[]) {

const map:Record<number,number> = {}

trades.forEach(t => {

const date = new Date(t.trade_date)
const hour = date.getHours()

if(!map[hour]) map[hour] = 0

map[hour] += Number(t.pnl || 0)

})

return Object.entries(map).map(([hour,pnl]) => ({
hour:Number(hour),
pnl
}))

}