// app/api/trades/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: fetch trades for current user
export async function GET() {
  // Assumes Supabase token/cookie is present in the request
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { data, error } = await supabase
    .from('trades')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

// POST: create a new trade
export async function POST(req: Request) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 });
  }

  const required = ['instrument', 'pair', 'side', 'size', 'entry', 'exit', 'pnl'];
  for (const key of required) {
    if (typeof payload[key] === 'undefined') {
      return new NextResponse(`Missing field: ${key}`, { status: 400 });
    }
  }

  const record = {
    user_id: user.id,
    instrument: payload.instrument,
    pair: payload.pair,
    side: payload.side,
    size: payload.size,
    entry: payload.entry,
    exit: payload.exit,
    pnl: payload.pnl,
    notes: payload.notes ?? '',
    strategy: payload.strategy ?? '',
    created_at: new Date().toISOString(),
    // Optional for future: broker_import_source, import_id
  };

  const { data, error } = await supabase.from('trades').insert([record]).select().single();

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json(data);
}