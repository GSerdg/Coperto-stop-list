'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { menuKeys } from './queries';
import { useMenuFilters } from './filters';
import { toast } from 'sonner';
import type { MenuItem, StopItemPayload } from '@/types/menu';

export function useStopItem() {
  const qc = useQueryClient();
  const [{ shop, status }] = useMenuFilters();

  const listKey = menuKeys.list({ shop, status });

  const stopMutation = useMutation({
    mutationFn: async (vars: { id: string; payload: StopItemPayload }) => {
      const response = await fetch(`/api/menu-items/${vars.id}/stop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vars.payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(errorData.message || 'Ошибка при постановке в стоп-лист');
      }

      return response.json();
    },
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries({ queryKey: listKey });

      const prev = qc.getQueryData<MenuItem[]>(listKey);

      qc.setQueryData<MenuItem[]>(listKey, (items = []) =>
        items.map((item) =>
          item.id === id ? { ...item, status: { kind: 'stopped', ...payload } } : item,
        ),
      );

      return { prev };
    },
    onError: (err, _vars, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(listKey, ctx.prev);
      }

      toast.error(err instanceof Error ? err.message : 'Не удалось обновить статус');
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: listKey });
    },
  });

  const resumeMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/menu-items/${id}/resume`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(errorData.message || 'Ошибка при возврате в продажу');
      }

      return response.json();
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: listKey });

      const prev = qc.getQueryData<MenuItem[]>(listKey);

      qc.setQueryData<MenuItem[]>(listKey, (items = []) =>
        items.map((item) => (item.id === id ? { ...item, status: { kind: 'available' } } : item)),
      );

      return { prev };
    },
    onError: (err, _vars, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(listKey, ctx.prev);
      }

      toast.error(err instanceof Error ? err.message : 'Не удалось вернуть в продажу');
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: listKey });
    },
  });

  return {
    stopItem: stopMutation.mutate,
    isStopping: stopMutation.isPending,
    resumeItem: resumeMutation.mutate,
    isResuming: resumeMutation.isPending,
    mutatingIds: new Set(
      [
        ...(stopMutation.isPending ? [stopMutation.variables?.id] : []),
        ...(resumeMutation.isPending ? [resumeMutation.variables] : []),
      ].filter(Boolean) as string[],
    ),
  };
}
