import { NextRequest, NextResponse } from 'next/server';
import { menuStore } from '@/server/menu-store';
import { stopItemSchema } from '@/shared/validation/stop-schema';
import { delay, simulateServerError } from '@/shared/utils';
import { z } from 'zod';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  await delay(600);

  const errorResponse = simulateServerError(
    0.2,
    'Внутренняя ошибка сервера при обновлении стоп-листа',
  );

  if (errorResponse) return errorResponse;

  const { id } = await params;

  try {
    const body = await request.json();

    const validation = stopItemSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: 'Невалидные данные', errors: z.treeifyError(validation.error) },
        { status: 400 },
      );
    }

    const { reason, until } = validation.data;

    const existingItem = menuStore.getAll().find((item) => item.id === id);

    const updatedItem = menuStore.stopItem(id, {
      kind: 'stopped',
      reason,
      until,
    });

    if (!updatedItem) {
      return NextResponse.json({ message: 'Позиция меню не найдена' }, { status: 404 });
    }

    if (existingItem?.status.kind === 'stopped') {
      return NextResponse.json({
        ...updatedItem,
        message: 'Стоп-лист обновлён',
      });
    }

    return NextResponse.json(updatedItem);
  } catch {
    return NextResponse.json({ message: 'Ошибка парсинга JSON' }, { status: 400 });
  }
}
