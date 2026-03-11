"use client"

export default function TradeScreenshotViewer({url}:any){

if(!url) return null

return(

<div
style={{
marginTop:20,
border:"1px solid #1e293b",
borderRadius:10,
padding:10
}}
>

<img
src={url}
style={{
width:"100%",
borderRadius:8
}}
/>

</div>

)

}