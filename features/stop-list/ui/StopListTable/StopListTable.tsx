'use client';

import { useQuery } from '@tanstack/react-query';
import { menuQueries } from '../../model/queries';
import { useMenuFilters } from '../../model/filters';
import { Table } from './Table';
import { TableSkeleton } from './TableSkeleton';
import { FetchError } from './FetchError';
import { EmptyList } from './EmptyList';
import { Show } from '@/shared/ui';

export function StopListTable() {
  const [{ shop, status }] = useMenuFilters();

  const { data: items, isLoading, isError } = useQuery(menuQueries.list({ shop, status }));

  return (
    <>
      <Show when={isLoading}>
        <TableSkeleton />
      </Show>
      <Show when={isError}>
        <FetchError />
      </Show>
      {items ? (
        <Show when={items.length > 0} fallback={<EmptyList />}>
          <Table items={items} />
        </Show>
      ) : null}
    </>
  );
}
