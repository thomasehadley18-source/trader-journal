"use client"

import { useState } from "react"

export default function ImportPage(){

const [loading,setLoading]=useState(false)
const [message,setMessage]=useState("")

async function importMT4(){

setLoading(true)

const res=await fetch("/api/import/mt4",{
method:"POST"
})

const data=await res.json()

setMessage(data.message || "MT4 Import Complete")

setLoading(false)

}

async function importMT5(){

setLoading(true)

const res=await fetch("/api/import/mt5",{
method:"POST"
})

const data=await res.json()

setMessage(data.message || "MT5 Import Complete")

setLoading(false)

}

async function connectMyFxBook(){

setLoading(true)

const res=await fetch("/api/import/myfxbook-connect",{
method:"POST"
})

const data=await res.json()

setMessage(data.message || "MyFxBook Connected")

setLoading(false)

}

return(

<div>

<h1>Broker Import</h1>

<div className="grid-3">

<div className="card">

<h3>MT4 Import</h3>

<p>Import trades from MetaTrader 4</p>

<button onClick={importMT4} disabled={loading}>
Import MT4
</button>

</div>

<div className="card">

<h3>MT5 Import</h3>

<p>Import trades from MetaTrader 5</p>

<button onClick={importMT5} disabled={loading}>
Import MT5
</button>

</div>

<div className="card">

<h3>MyFxBook</h3>

<p>Connect MyFxBook account</p>

<button onClick={connectMyFxBook} disabled={loading}>
Connect MyFxBook
</button>

</div>

</div>

{message && (

<div className="card" style={{marginTop:20}}>
{message}
</div>

)}

</div>

)

}