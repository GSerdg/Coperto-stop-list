import { FC } from 'react';

export const TableHeader: FC = () => {
  return (
    <thead>
      <tr className="border-brand-text/10 text-brand-text/40 border-b text-xs font-bold tracking-wider uppercase">
        <th className="py-4 pr-4">Название позиции</th>
        <th className="p-4">Цех</th>
        <th className="p-4">Остаток</th>
        <th className="p-4">Статус</th>
        <th className="p-4">Причина / Срок</th>
        <th className="py-4 pl-4 text-center">Действие</th>
      </tr>
    </thead>
  );
};
