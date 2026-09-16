import { FC } from 'react';

export const EmptyList: FC = () => {
  return (
    <div className="text-brand-text/40 flex flex-col items-center justify-center py-16 text-center">
      <span className="mb-2 text-3xl">🍽️</span>
      <p className="text-sm font-medium">Нет позиций, соответствующих выбранным фильтрам</p>
    </div>
  );
};
