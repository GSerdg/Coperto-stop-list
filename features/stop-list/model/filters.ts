import { parseAsStringEnum, useQueryStates } from 'nuqs';
import { Shop } from '@/types/menu';

export type StatusFilter = 'all' | 'active' | 'stopped';

export const menuFiltersParsers = {
  shop: parseAsStringEnum<Shop>(['kitchen', 'bar', 'pastry']),
  status: parseAsStringEnum<StatusFilter>(['all', 'active', 'stopped']).withDefault('all'),
};

export function useMenuFilters() {
  return useQueryStates(menuFiltersParsers, {
    history: 'push',
    shallow: false,
  });
}
