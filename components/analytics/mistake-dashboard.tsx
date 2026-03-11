"use client"

export default function MistakeDashboard({data}:any){

return(

<div className="card">

<h3>Trading Mistake Detection</h3>

<div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>

<div>
<h4>Closed Trades Too Early</h4>
<p>{data.earlyClose}</p>
</div>

<div>
<h4>Held Losing Trades Too Long</h4>
<p>{data.heldTooLong}</p>
</div>

<div>
<h4>Worst Trading Session</h4>
<p>{data.worstSession}</p>
</div>

<div>
<h4>Worst Trading Pair</h4>
<p>{data.worstPair}</p>
</div>

</div>

{data.overTrading && (

<div style={{marginTop:20,color:"#f97316"}}>

⚠ Possible Overtrading Detected

</div>

)}

</div>

)

}