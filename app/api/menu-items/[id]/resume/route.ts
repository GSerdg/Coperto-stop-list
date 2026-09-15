import { NextRequest, NextResponse } from 'next/server';
import { menuStore } from '@/server/menu-store';
import { simulateServerError } from '@/shared/utils';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(_request: NextRequest, { params }: RouteParams) {
  await delay(600);

  const errorResponse = simulateServerError(
    0.2,
    'Не удалось вернуть позицию в продажу. Попробуйте позже.',
  );

  if (errorResponse) return errorResponse;

  const { id } = await params;

  try {
    const updatedItem = menuStore.resumeItem(id);

    if (!updatedItem) {
      return NextResponse.json({ message: 'Позиция меню не найдена' }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ошибка бизнес-логики';

    return NextResponse.json({ message }, { status: 400 });
  }
}
