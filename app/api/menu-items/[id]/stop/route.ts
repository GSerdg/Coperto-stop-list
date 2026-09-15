import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // TODO: поставить в стоп-лист item по id
  return NextResponse.json({ ok: true });
}
