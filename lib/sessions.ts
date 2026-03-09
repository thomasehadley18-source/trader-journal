// ---------------------------
// MARKET SESSION DEFINITIONS
// Times are in **UTC**
// ---------------------------

export type MarketSession = "Asia" | "London" | "New York" | "None";

interface SessionBlock {
  name: MarketSession;
  start: number;   // UTC hour
  end: number;     // UTC hour
}

// Sessions (Forex standard)
const SESSIONS: SessionBlock[] = [
  { name: "Asia", start: 23, end: 6 },      // 23:00–06:00 UTC
  { name: "London", start: 7, end: 16 },    // 07:00–16:00 UTC
  { name: "New York", start: 13, end: 22 }, // 13:00–22:00 UTC
];

// ---------------------------
// HELPER: Determine session from UTC hour
// ---------------------------

function detectSession(utcHour: number): MarketSession {
  for (const s of SESSIONS) {
    if (s.start < s.end) {
      // Normal session block (e.g. London)
      if (utcHour >= s.start && utcHour < s.end) return s.name;
    } else {
      // Overnight block (Asia)
      if (utcHour >= s.start || utcHour < s.end) return s.name;
    }
  }
  return "None";
}

// ---------------------------
// MAIN FUNCTION: Calculate session data for a trade
// ---------------------------

export function calculateTradeSessions(entryTime: string, exitTime: string) {
  const entry = new Date(entryTime);
  const exit = new Date(exitTime);

  const entrySession = detectSession(entry.getUTCHours());
  const exitSession = detectSession(exit.getUTCHours());

  // Build sessions_active array
  const activeSessions: MarketSession[] = [];

  const touched = new Set<MarketSession>();
  touched.add(entrySession);
  touched.add(exitSession);

  // Add sessions between entry → exit (multi-session trades)
  const startHour = entry.getUTCHours();
  const endHour = exit.getUTCHours();

  const hoursPassed =
    ((exit.getTime() - entry.getTime()) / (1000 * 60 * 60)) | 0;

  for (let i = 0; i <= hoursPassed; i++) {
    const hour = (startHour + i) % 24;
    const session = detectSession(hour);
    touched.add(session);
  }

  touched.delete("None");
  activeSessions.push(...Array.from(touched));

  return {
    session_open: entrySession,
    session_close: exitSession,
    sessions_active: activeSessions,
  };
}
