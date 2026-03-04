"use client"

import { useEffect, useState } from "react" import { supabase } from "@/lib/supabase"

export default function TradesPage() { const [trades, setTrades] = useState([]) const [loading, setLoading] = useState(true) const [form, setForm] = useState({ pair: "", direction: "Buy", entry: "", exit: "", lot_size: "", })

useEffect(() => { load() }, [])

async function load() { const { data: { user } } = await supabase.auth.getUser() const { data } = await supabase.from("trades") .select("*") .eq("user_id", user.id) .order("created_at", { ascending: false })



setTrades(data || [])
setLoading(false)
}

async function addTrade() { const { data: { user } } = await supabase.auth.getUser()



const entry = Number(form.entry)
const exit = Number(form.exit)
const lot = Number(form.lot_size)
const pnl =
  form.direction === "Buy"
    ? (exit - entry) * lot
    : (entry - exit) * lot
await supabase.from("trades").insert([
  { user_id: user.id, ...form, entry, exit, lot_size: lot, pnl }
])
setForm({ pair: "", direction: "Buy", entry: "", exit: "", lot_size: "" })
load()
}

async function remove(id) { await supabase.from("trades").delete().eq("id", id) load() }

if (loading) return

Loading...
return (

Trades


  <div className="bg-zinc-900 p-4 rounded mb-6 space-y-4">
    <input className="text-black p-2 mr-2"
           placeholder="Pair"
           value={form.pair}
           onChange={e => setForm({ ...form, pair: e.target.value })} />
    <select className="text-black p-2 mr-2"
            value={form.direction}
            onChange={e => setForm({ ...form, direction: e.target.value })}>
      <option>Buy</option>
      <option>Sell</option>
    </select>
    <input className="text-black p-2 mr-2"
           placeholder="Entry"
           value={form.entry}
           onChange={e => setForm({ ...form, entry: e.target.value })} />
    <input className="text-black p-2 mr-2"
           placeholder="Exit"
           value={form.exit}
           onChange={e => setForm({ ...form, exit: e.target.value })} />
    <input className="text-black p-2 mr-2"
           placeholder="Lot Size"
           value={form.lot_size}
           onChange={e => setForm({ ...form, lot_size: e.target.value })} />
    <button onClick={addTrade}
            className="bg-blue-600 px-4 py-2">
      Add Trade
    </button>
  </div>
  <div className="space-y-2">
    {trades.map(t => (
      <div key={t.id}
           className="bg-zinc-900 p-4 flex justify-between rounded">
        <div>
          {t.pair} | {t.direction} | PnL: {t.pnl}
        </div>
        <button onClick={() => remove(t.id)} className="text-red-400">
          Delete
        </button>
      </div>
    ))}
  </div>
</div>
) }