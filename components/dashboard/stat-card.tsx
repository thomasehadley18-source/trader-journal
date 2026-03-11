"use client"

export default function StatCard({title,value}:any){

return(

<div
style={{
background:"#0f172a",
border:"1px solid #1e293b",
borderRadius:12,
padding:20,
flex:1
}}
>

<div
style={{
fontSize:14,
color:"#94a3b8",
marginBottom:8
}}
>
{title}
</div>

<div
style={{
fontSize:28,
fontWeight:700
}}
>
{value}
</div>

</div>

)

}