import { Show } from '@/shared/ui';
import { MenuItem, Shop } from '@/types/menu';
import { FC } from 'react';
import { TableHeader } from './TableHeader';

const SHOP_LABELS: Record<Shop, string> = {
  kitchen: 'Кухня',
  bar: 'Бар',
  pastry: 'Кондитерская',
};

const REASON_LABELS: Record<string, string> = {
  out_of_stock: 'Закончились продукты',
  equipment: 'Сломалось оборудование',
  quality: 'Вопросы к качеству',
  menu_change: 'Выведено из меню',
};

type Props = {
  items: MenuItem[];
};

export const Table: FC<Props> = ({ items }) => {
  return (
    <div className="custom-scrollbar overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <TableHeader />
        <tbody>
          {items.map((item) => {
            const isStopped = item.status.kind === 'stopped';
            const isOutOfStock = item.stock === 0;

            return (
              <tr
                key={item.id}
                className={`border-brand-text/5 border-b transition-opacity duration-200 ${
                  isStopped ? 'bg-brand-text/1 opacity-50' : ''
                }`}
              >
                <td className="text-brand-text py-4 pr-4 font-medium">{item.title}</td>
                <td className="text-brand-text/70 p-4 text-sm">{SHOP_LABELS[item.shop]}</td>
                <td className="p-4 font-mono text-sm">
                  <span
                    className={isOutOfStock ? 'text-brand-error font-bold' : 'text-brand-text/70'}
                  >
                    {item.stock} шт.
                  </span>
                </td>
                <td className="p-4 text-sm">
                  <Show
                    when={isStopped}
                    fallback={
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                        В продаже
                      </span>
                    }
                  >
                    <span className="bg-brand-error/10 text-brand-error inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium">
                      В стоп-листе
                    </span>
                  </Show>
                </td>
                <td className="text-brand-text/70 p-4 text-sm">
                  {isStopped && item.status.kind === 'stopped' ? (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-brand-text/90 font-medium">
                        {REASON_LABELS[item.status.reason]}
                      </span>
                      <span className="text-brand-text/40 text-xs">
                        {item.status.until
                          ? `До ${new Date(item.status.until).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                          : 'До конца смены'}
                      </span>
                    </div>
                  ) : (
                    <span className="text-brand-text/20">—</span>
                  )}
                </td>
                <td className="py-4 pl-4 text-right">
                  <Show
                    when={isStopped}
                    fallback={
                      <button className="bg-brand-accent hover:bg-brand-accent/90 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all">
                        В стоп-лист
                      </button>
                    }
                  >
                    <button
                      disabled={isOutOfStock}
                      title={
                        isOutOfStock ? 'Нельзя вернуть в продажу при нулевом остатке' : undefined
                      }
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                        isOutOfStock
                          ? 'border-brand-text/10 text-brand-text/30 bg-brand-text/2 cursor-not-allowed'
                          : 'border-brand-text/20 text-brand-text hover:bg-brand-text/5 cursor-pointer'
                      }`}
                    >
                      Вернуть в продажу
                    </button>
                  </Show>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
