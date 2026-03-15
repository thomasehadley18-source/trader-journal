// app/api/live-trading/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type RequestBody = {
  brokerId: string;
  enabled: boolean;
};

export async function POST(req: Request) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 });
  }

  const brokerKey = body.brokerId;
  const enable = !!body.enabled;

  // Read existing live_trading map from profiles (assumes a profiles table with jsonb field live_trading)
  const { data: profileData, error: profileError } =
    await supabase.from('profiles').select('live_trading').eq('id', user.id).single();

  if (profileError) {
    // If there is no profile row yet, we’ll create one
    // but to be safe, proceed with an empty map
  }

  const currentMap: Record<string, boolean> = (profileData?.live_trading as any) ?? {};

  const updatedMap = {
    ...currentMap,
    [brokerKey]: enable
  };

  // Upsert the profile with the updated live_trading map
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: user.id, live_trading: updatedMap, updated_at: new Date().toISOString() })
    .single();

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json({ ok: true, live_trading: updatedMap });
}