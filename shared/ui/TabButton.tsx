import { FC } from 'react';

type Props = {
  onClick: VoidFunction;
  isActive: boolean;
  label: string;
};

export const TabButton: FC<Props> = ({ onClick, isActive, label }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'text-brand-text bg-white font-semibold shadow-xs'
          : 'text-brand-text/60 hover:text-brand-text/90'
      }`}
    >
      {label}
    </button>
  );
};
