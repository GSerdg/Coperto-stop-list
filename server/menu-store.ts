import { MenuItem, MenuItemStatus } from '@/types/menu';

const initialMenu: MenuItem[] = [
  {
    id: '1',
    title: 'Стейк Рибай',
    shop: 'kitchen',
    stock: 15,
    status: {
      kind: 'stopped',
      reason: 'out_of_stock',
      until: null,
    },
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Борщ с пампушками',
    shop: 'kitchen',
    stock: 24,
    status: { kind: 'available' },
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Салат Цезарь',
    shop: 'kitchen',
    stock: 0,
    status: { kind: 'available' },
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Кофе Капучино',
    shop: 'bar',
    stock: 50,
    status: { kind: 'available' },
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Коктейль Негрони',
    shop: 'bar',
    stock: 30,
    status: { kind: 'available' },
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Лимонад Домашний',
    shop: 'bar',
    stock: 40,
    status: { kind: 'available' },
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Торт Наполеон',
    shop: 'pastry',
    stock: 8,
    status: { kind: 'available' },
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Круассан классический',
    shop: 'pastry',
    stock: 12,
    status: { kind: 'available' },
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Макароны (набор)',
    shop: 'pastry',
    stock: 20,
    status: { kind: 'available' },
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    title: 'Суп Том Ям',
    shop: 'kitchen',
    stock: 10,
    status: { kind: 'available' },
    updatedAt: new Date().toISOString(),
  },
  {
    id: '11',
    title: 'Паста Карбонара',
    shop: 'kitchen',
    stock: 18,
    status: { kind: 'available' },
    updatedAt: new Date().toISOString(),
  },
  {
    id: '12',
    title: 'Чай Эрл Грей',
    shop: 'bar',
    stock: 99,
    status: { kind: 'available' },
    updatedAt: new Date().toISOString(),
  },
];

let globalMenuStore: MenuItem[] = [...initialMenu];

export const menuStore = {
  getAll: (): MenuItem[] => {
    return globalMenuStore;
  },

  stopItem: (
    id: string,
    stopStatus: Extract<MenuItemStatus, { kind: 'stopped' }>,
  ): MenuItem | null => {
    const itemIndex = globalMenuStore.findIndex((item) => item.id === id);

    if (itemIndex === -1) return null;

    globalMenuStore[itemIndex] = {
      ...globalMenuStore[itemIndex],
      status: stopStatus,
      updatedAt: new Date().toISOString(),
    };

    return globalMenuStore[itemIndex];
  },

  resumeItem: (id: string): MenuItem | null => {
    const itemIndex = globalMenuStore.findIndex((item) => item.id === id);

    if (itemIndex === -1) return null;

    if (globalMenuStore[itemIndex].stock === 0) {
      throw new Error('Нельзя вернуть в продажу позицию с нулевым остатком');
    }

    globalMenuStore[itemIndex] = {
      ...globalMenuStore[itemIndex],
      status: { kind: 'available' },
      updatedAt: new Date().toISOString(),
    };
    return globalMenuStore[itemIndex];
  },

  reset: (): void => {
    globalMenuStore = [...initialMenu];
  },
};
