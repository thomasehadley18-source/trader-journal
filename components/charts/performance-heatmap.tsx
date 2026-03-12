"use client"

export default function PerformanceHeatmap({data,label}:{data:any[],label:string}){

return(

<div className="card">

<h3>{label}</h3>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(7,1fr)",
gap:10,
marginTop:10
}}>

{data.map((d:any,i:number)=>{

const color =
d.pnl>0 ? "#16a34a"
: d.pnl<0 ? "#dc2626"
: "#334155"

return(

<div
key={i}
style={{
background:color,
padding:12,
borderRadius:8,
textAlign:"center"
}}
>

<div>{d.day || d.hour}</div>

<div style={{fontSize:12}}>
{d.pnl.toFixed(2)}
</div>

</div>

)

})}

</div>

</div>

)

}