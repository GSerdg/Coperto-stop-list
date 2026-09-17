import { queryOptions } from '@tanstack/react-query';
import { MenuItem } from '@/types/menu';

export const menuKeys = {
  all: ['menu-items'] as const,
  lists: () => [...menuKeys.all, 'list'] as const,
  list: (filters: { shop: string | null; status: string }) =>
    [...menuKeys.lists(), filters] as const,
};

async function fetchMenuItems(shop: string | null, status: string): Promise<MenuItem[]> {
  const params = new URLSearchParams();

  if (shop) params.set('shop', shop);
  if (status) params.set('status', status);

  const response = await fetch(`/api/menu-items?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить меню смены');
  }

  return response.json();
}

export const menuQueries = {
  list: (filters: { shop: string | null; status: string }) =>
    queryOptions({
      queryKey: menuKeys.list(filters),
      queryFn: () => fetchMenuItems(filters.shop, filters.status),
    }),
};
