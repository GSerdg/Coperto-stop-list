'use client';

import { create } from 'zustand';
import { MenuItem } from '@/types/menu';

interface UIState {
  activeId: string | null;
  activeItem: MenuItem | null;

  openStopPanel: (item: MenuItem) => void;
  closeStopPanel: () => void;
}

export const useUiStore = create<UIState>((set) => ({
  activeId: null,
  activeItem: null,

  openStopPanel: (item) =>
    set({
      activeId: item.id,
      activeItem: item,
    }),

  closeStopPanel: () =>
    set({
      activeId: null,
      activeItem: null,
    }),
}));
