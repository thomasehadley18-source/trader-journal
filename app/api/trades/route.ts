import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { user_id, instrument, side, size, entry, exit, pnl, strategy } = body;

  const { data, error } = await supabase
    .from("trades")
    .insert([{ user_id, instrument, side, size, entry, exit, pnl, strategy }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data, { status: 200 });
}