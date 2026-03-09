import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { calculateTradeSessions } from "@/lib/sessions";

export async function POST() {
  const { data: trades } = await supabase.from("trades").select("*");

  if (!trades) return NextResponse.json({ success: false });

  for (const t of trades) {
    if (!t.entry || !t.exit) continue;

    const sessionData = calculateTradeSessions(t.entry, t.exit);

    await supabase
      .from("trades")
      .update(sessionData)
      .eq("id", t.id);
  }

  return NextResponse.json({
    success: true,
    updated: trades.length,
  });
}
