import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // TODO: снять с стоп-листа item по id
  return NextResponse.json({ ok: true });
}
