import { NextRequest, NextResponse } from 'next/server';
import { menuStore } from '@/server/menu-store';
import { Shop, StatusFilter } from '@/types/menu';
import { delay } from '@/shared/utils';

export async function GET(request: NextRequest) {
  await delay(600);

  const { searchParams } = request.nextUrl;
  const shopFilter = searchParams.get('shop') as Shop | null;
  const statusFilter = searchParams.get('status') as StatusFilter | null;

  let items = menuStore.getAll();

  if (shopFilter) {
    items = items.filter((item) => item.shop === shopFilter);
  }

  if (statusFilter === 'active') {
    items = items.filter((item) => item.status.kind === 'available');
  } else if (statusFilter === 'stopped') {
    items = items.filter((item) => item.status.kind === 'stopped');
  }

  return NextResponse.json(items);
}
