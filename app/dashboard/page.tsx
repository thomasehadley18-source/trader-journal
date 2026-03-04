  <div className="grid grid-cols-3 gap-6">
    <div className="bg-zinc-900 p-6 rounded">
      <p className="text-zinc-400">Total Trades</p>
      <p className="text-3xl">{totalTrades}</p>
    </div>

    <div className="bg-zinc-900 p-6 rounded">
      <p className="text-zinc-400">Total PnL</p>
      <p className="text-3xl">{totalPnL}</p>
    </div>

    <div className="bg-zinc-900 p-6 rounded">
      <p className="text-zinc-400">Win Rate</p>
      <p className="text-3xl">{winRate}%</p>
    </div>
  </div>
</div>
