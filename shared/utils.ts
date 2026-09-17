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

export function formatISOToLocalInput(isoString: string | null): string | null {
  if (!isoString) return null;

  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) return null;

  const timezoneOffsetMs = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - timezoneOffsetMs);

  return localDate.toISOString().slice(0, 16);
}
