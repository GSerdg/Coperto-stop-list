import { Suspense } from 'react';
import { parseMenuFilters } from '@/features/stop-list/model/filters';
import { StopListScreen } from '@/features/stop-list/ui';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialFilters = parseMenuFilters(resolvedSearchParams);

  return (
    <Suspense
      fallback={
        <main className="mx-auto min-h-screen max-w-7xl px-6 py-8">
          <div className="text-brand-text/60 animate-pulse text-sm">Загрузка фильтров…</div>
        </main>
      }
    >
      <StopListScreen initialFilters={initialFilters} />
    </Suspense>
  );
}
