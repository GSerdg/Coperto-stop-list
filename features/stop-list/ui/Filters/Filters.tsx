'use client';

import { FC } from 'react';
import { useMenuFilters, type MenuFiltersState } from '../../model/filters';
import type { Shop, StatusFilter } from '@/types/menu';
import { TabButton } from '@/shared/ui/TabButton';
import { TabSwitcher } from './TabSwitcher';

const SHOP_TABS: { label: string; value: Shop | null }[] = [
  { label: 'Все цеха', value: null },
  { label: 'Кухня', value: 'kitchen' },
  { label: 'Бар', value: 'bar' },
  { label: 'Кондитерская', value: 'pastry' },
];

const STATUS_TABS: { label: string; value: StatusFilter }[] = [
  { label: 'Все позиции', value: 'all' },
  { label: 'В продаже', value: 'active' },
  { label: 'В стоп-листе', value: 'stopped' },
];

type FiltersProps = {
  initialFilters?: MenuFiltersState;
};

export const Filters: FC<FiltersProps> = ({ initialFilters }) => {
  const [filters, setFilters] = useMenuFilters();

  const activeShop = filters.shop ?? initialFilters?.shop ?? null;
  const activeStatus = filters.status ?? initialFilters?.status ?? 'all';

  return (
    <div className="border-brand-text/10 flex flex-col gap-5 border-b pb-6 md:flex-row md:items-center md:justify-between">
      <TabSwitcher label="Цех смены">
        {SHOP_TABS.map((tab) => (
          <TabButton
            key={String(tab.value)}
            groupId="shop"
            onClick={() => setFilters({ shop: tab.value })}
            isActive={activeShop === tab.value}
            label={tab.label}
          />
        ))}
      </TabSwitcher>
      <TabSwitcher label="Статус блюда">
        {STATUS_TABS.map((tab) => (
          <TabButton
            key={String(tab.value)}
            groupId="status"
            onClick={() => setFilters({ status: tab.value })}
            isActive={activeStatus === tab.value}
            label={tab.label}
          />
        ))}
      </TabSwitcher>
    </div>
  );
};
