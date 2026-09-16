import { Filters, StopListTable } from '@/features/stop-list/ui';
import { type SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export default async function Page() {
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
        <Filters />
        <div className="border-brand-text/5 rounded-xl border bg-white p-8 shadow-xs">
          <StopListTable />
        </div>
      </div>
    </main>
  );
}
