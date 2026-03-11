"use client"

export default function TradingViewConnect(){

return(

<div>

<h1 className="text-3xl mb-6">
TradingView Auto Journal
</h1>

<div className="card">

<p>
Use this webhook inside your TradingView strategy alerts.
</p>

<div className="mt-4 bg-black p-4 rounded">

{process.env.NEXT_PUBLIC_SITE_URL}/api/tradingview/webhook

</div>

<p className="mt-4">

Send JSON format:

</p>

<pre className="bg-black p-4 rounded mt-2">

{`{
"userId":"YOUR_USER_ID",
"symbol":"BTCUSD",
"direction":"LONG",
"entry":50000,
"exit":50500,
"pnl":500
}`}

</pre>

</div>

</div>

)

}