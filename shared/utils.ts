import { NextResponse } from 'next/server';

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function simulateServerError(
  failureRate = 0.2,
  errorMessage = 'Внутренняя ошибка сервера. Попробуйте еще раз.',
): NextResponse | null {
  if (Math.random() < failureRate) {
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }

  return null;
}
