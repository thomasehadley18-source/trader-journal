import { detectPropViolations } from "../../../lib/prop-violation-engine";

export default function PropFirmPage() {
  // Example dummy data
  const trades = [
    { id: 1, pnl: 100 },
    { id: 2, pnl: -50 }
  ];
  const rules = {
    maxDrawdown: 500,
    dailyLoss: 200
  };

  // Call the dummy engine
  const violations = detectPropViolations(trades, rules);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Prop Firm Rule Violations</h1>
      {violations.length === 0 ? (
        <p>No violations detected.</p>
      ) : (
        <ul>
          {violations.map((v, idx) => (
            <li key={idx}>{JSON.stringify(v)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}