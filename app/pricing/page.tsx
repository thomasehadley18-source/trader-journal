"use client"

export default function Pricing(){

async function subscribe(){

const res=await fetch("/api/checkout",{method:"POST"})

const data=await res.json()

window.location.href=data.url

}

return(

<div className="container">

<h1 className="text-4xl mb-10">
Pricing
</h1>

<div className="card">

<h2>Pro Plan</h2>

<p>$29/month</p>

<ul>
<li>Unlimited trades</li>
<li>AI trading coach</li>
<li>Advanced analytics</li>
<li>Broker imports</li>
</ul>

<button
className="mt-4 bg-primary px-4 py-2 rounded"
onClick={subscribe}
>

Start Subscription

</button>

</div>

</div>

)

}