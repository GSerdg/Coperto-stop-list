import { parseAsStringEnum } from 'nuqs/server';
import { useQueryStates } from 'nuqs';
import { Shop, StatusFilter } from '@/types/menu';

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
