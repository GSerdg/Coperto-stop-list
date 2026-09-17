import { FC } from 'react';
import { Show } from './Show';
import { motion } from 'framer-motion';

type Props = {
  onClick: VoidFunction;
  isActive: boolean;
  label: string;
  groupId: string;
};

export const TabButton: FC<Props> = ({ onClick, isActive, label, groupId }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative z-10 cursor-pointer rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
        isActive ? 'text-brand-text font-semibold' : 'text-brand-text/60 hover:text-brand-text/90'
      }`}
    >
      {label}

      <Show when={isActive}>
        <motion.div
          layoutId={`active-pill-${groupId}`}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          className="absolute inset-0 -z-10 rounded-lg bg-white shadow-sm"
        />
      </Show>
    </button>
  );
};
