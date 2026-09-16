import { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  label: string;
}

export const TabSwitcher: FC<Props> = ({ children, label }) => {
  return (
    <div className="space-y-2">
      <span className="text-brand-text/50 font-sans text-xs font-bold tracking-wider uppercase">
        {label}
      </span>
      <div className="bg-brand-text/5 flex w-fit rounded-xl p-1">{children}</div>
    </div>
  );
};
