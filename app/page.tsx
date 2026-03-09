"use client"

export default function HomePage() {
  async function goToCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "demo-user",
        email: "demo@example.com",
      }),
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    }
  }

  return (
    <main className="container">
      <div className="card" style={{ marginTop: 40 }}>
        <h1 style={{ fontSize: 40, marginBottom: 12 }}>Trader Journal SaaS</h1>
        <p className="muted" style={{ marginBottom: 24 }}>
          Track trades, review analytics, measure drawdown, and grow like a pro.
        </p>

        <div style={{ display: "flex", gap: 12 }}>
          <a className="btn" href="/dashboard">
            Open Dashboard
          </a>

          <button className="btn btn-secondary" onClick={goToCheckout}>
            Upgrade to Pro
          </button>
        </div>
      </div>
    </main>
  )
}