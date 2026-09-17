import { FC } from 'react';
import { TableHeader } from './TableHeader';

export const TableSkeleton: FC = () => {
  return (
    <div className="custom-scrollbar overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <TableHeader />
        <tbody className="animate-pulse-light">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="border-brand-text/5 border-b">
              <td className="py-4 pr-4">
                <div className="bg-brand-text/5 h-4 w-48 rounded" />
              </td>
              <td className="p-4">
                <div className="bg-brand-text/5 h-4 w-20 rounded" />
              </td>
              <td className="p-4">
                <div className="bg-brand-text/5 h-4 w-12 rounded" />
              </td>
              <td className="p-4">
                <div className="bg-brand-text/5 h-6 w-24 rounded-full" />
              </td>
              <td className="p-4">
                <div className="bg-brand-text/5 h-4 w-32 rounded" />
              </td>
              <td className="py-4 pl-4 text-right">
                <div className="bg-brand-text/5 inline-block h-8 w-24 rounded-lg" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
