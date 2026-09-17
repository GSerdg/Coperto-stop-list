import { parseAsStringEnum, createSearchParamsCache } from 'nuqs/server';
import { useQueryStates } from 'nuqs';
import type { Shop, StatusFilter } from '@/types/menu';

export type MenuFiltersState = {
  shop: Shop | null;
  status: StatusFilter;
};

export const menuFiltersParsers = {
  shop: parseAsStringEnum<Shop>(['kitchen', 'bar', 'pastry']),
  status: parseAsStringEnum<StatusFilter>(['all', 'active', 'stopped']).withDefault('all'),
};

const menuFiltersCache = createSearchParamsCache(menuFiltersParsers);

export function parseMenuFilters(
  input?: Record<string, string | string[] | undefined> | URLSearchParams | null,
): MenuFiltersState {
  const normalizedInput =
    input instanceof URLSearchParams ? Object.fromEntries(input.entries()) : (input ?? {});

  return menuFiltersCache.parse(normalizedInput as never);
}

export function useMenuFilters() {
  return useQueryStates(menuFiltersParsers, {
    history: 'push',
    shallow: false,
  });
}
