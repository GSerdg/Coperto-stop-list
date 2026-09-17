import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useMenuFilters } from '../../model/filters';
import { menuQueries } from '../../model/queries';

export const FetchError: FC = () => {
  const [{ shop, status }] = useMenuFilters();
  const { error, refetch } = useQuery(menuQueries.list({ shop, status }));

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-brand-error/10 text-brand-error mb-4 rounded-full p-3">⚠️</div>
      <h3 className="text-brand-text text-base font-semibold">Не удалось загрузить меню</h3>
      <p className="text-brand-text/60 mt-1 max-w-xs text-sm">
        {error instanceof Error
          ? error.message
          : 'Произошла непредвиденная ошибка при обращении к API'}
      </p>
      <button
        type="button"
        onClick={() => refetch()}
        className="bg-brand-text text-brand-bg hover:bg-brand-text/90 mt-4 cursor-pointer rounded-lg px-4 py-2 text-xs font-medium transition-all"
      >
        Повторить запрос
      </button>
    </div>
  );
};
