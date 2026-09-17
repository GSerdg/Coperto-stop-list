'use client';

import { FC } from 'react';
import { Drawer } from 'vaul';
import { useUiStore } from '../../model/ui-store';
import { StopReasonForm } from './StopReasonForm';

export const StopReasonPanel: FC = () => {
  const { activeId, activeItem, closeStopPanel } = useUiStore();

  return (
    <Drawer.Root open={activeId !== null} onOpenChange={(open) => !open && closeStopPanel()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300" />
        <Drawer.Content className="bg-brand-bg border-brand-text/10 fixed top-0 right-0 bottom-0 z-50 flex h-full w-full max-w-115 flex-col border-l shadow-2xl outline-hidden transition-transform duration-300">
          <div className="border-brand-text/10 border-b p-6">
            <Drawer.Title className="text-brand-text text-lg font-bold tracking-tight">
              {activeItem?.status.kind === 'stopped'
                ? 'Редактирование стоп-листа'
                : 'Постановка в стоп-лист'}
            </Drawer.Title>
            <Drawer.Description className="text-brand-text/50 mt-1 text-xs">
              Позиция меню:{' '}
              <span className="text-brand-text font-semibold">{activeItem?.title}</span>
            </Drawer.Description>
          </div>
          <StopReasonForm />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
