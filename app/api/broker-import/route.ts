// app/api/broker-import/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type ImportTradePayload = {
  instrument: string;
  pair: string;
  side: string;
  size: number;
  entry: number;
  exit: number;
  pnl: number;
  notes?: string;
  strategy?: string;
  created_at?: string;
  import_id?: string;
};

type ImportRequest = {
  brokerId: string; // e.g., 'MT4' or 'MT5'
  trades: ImportTradePayload[];
};

export async function POST(req: Request) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  let body: ImportRequest;
  try {
    body = await req.json();
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 });
  }

  if (!body.brokerId || !Array.isArray(body.trades)) {
    return new NextResponse('Missing brokerId or trades', { status: 400 });
  }

  const toInsert = body.trades.map((t) => ({
    user_id: user.id,
    instrument: t.instrument,
    pair: t.pair,
    side: t.side,
    size: t.size,
    entry: t.entry,
    exit: t.exit,
    pnl: t.pnl,
    notes: t.notes ?? '',
    strategy: t.strategy ?? '',
    created_at: t.created_at ?? new Date().toISOString(),
    broker_import_source: body.brokerId,
    import_id: t.import_id ?? null
  }));

  const { data, error } = await supabase.from('trades').insert(toInsert).select();

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json({ inserted: (data ?? []).length, items: data ?? [] });
}