export function detectMistakes(trades:any[]){

const mistakes:string[]=[]

if(trades.length===0) return mistakes

let lossesInRow=0
let highRiskTrades=0

trades.forEach((t,i)=>{

const pnl=Number(t.pnl||0)
const risk=Number(t.risk||0)

if(pnl<0) lossesInRow++
else lossesInRow=0

if(lossesInRow>=3){
mistakes.push("Possible revenge trading detected (3+ losses in a row)")
}

if(risk>2){
highRiskTrades++
}

if(i>0){

const prev=new Date(trades[i-1].trade_date).getTime()
const curr=new Date(t.trade_date).getTime()

const diff=(curr-prev)/60000

if(diff<2){
mistakes.push("Overtrading detected (multiple trades within 2 minutes)")
}

}

})

if(highRiskTrades>=3){
mistakes.push("High risk usage detected (risk above 2R multiple times)")
}

return [...new Set(mistakes)]

}