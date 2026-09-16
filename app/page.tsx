import { menuFiltersParsers } from '@/features/stop-list/model/filters';
import { Filters } from '@/features/stop-list/ui';
import { createSearchParamsCache, type SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

const searchParamsCache = createSearchParamsCache(menuFiltersParsers);

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Page({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const { shop, status } = searchParamsCache.parse(resolvedSearchParams);

  return (
    <main className="mx-auto min-h-screen max-w-[1280px] px-6 py-8">
      <header className="border-brand-text/10 mb-8 flex items-center justify-between border-b pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-brand-accent text-brand-bg rounded-md px-2.5 py-1 text-sm font-black tracking-wider">
              CRM
            </span>
            <h1 className="text-brand-text font-sans text-xl font-bold tracking-tight">Coperto</h1>
          </div>
          <p className="text-brand-text/60 mt-1 text-xs">Стоп-лист кухни</p>
        </div>

        <div className="text-right">
          <span className="text-brand-text text-sm font-semibold">Панель менеджера зала</span>
          <p className="text-brand-text/40 text-xs"> Menu Shift Control </p>
        </div>
      </header>

      <div className="space-y-6">
        <Suspense
          fallback={
            <div className="border-brand-text/10 animate-pulse-light flex flex-col gap-5 border-b pb-6 md:flex-row md:items-center md:justify-between">
              <div className="bg-brand-text/5 h-14 w-64 rounded-xl"></div>
              <div className="bg-brand-text/5 h-14 w-64 rounded-xl"></div>
            </div>
          }
        >
          <Filters />
        </Suspense>

        <div className="border-brand-text/5 rounded-xl border bg-white p-8 shadow-xs">
          <p className="text-brand-text/40 text-xs italic">Menu table</p>
        </div>
      </div>
    </main>
  );
}
