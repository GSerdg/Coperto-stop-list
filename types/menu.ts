export type Shop = 'kitchen' | 'bar' | 'pastry';

export type StopReason =
  | 'out_of_stock' // закончились продукты
  | 'equipment' // сломалось оборудование
  | 'quality' // вопросы к качеству партии
  | 'menu_change'; // позиция выведена из меню смены

export type MenuItemStatus =
  | { kind: 'available' }
  | {
      kind: 'stopped';
      reason: StopReason;
      until: string | null; // ISO-время или null = до конца смены
    };

export type MenuItem = {
  id: string;
  title: string;
  shop: Shop;
  stock: number; // остаток в штуках, 0..99
  status: MenuItemStatus;
  updatedAt: string; // ISO
};

export type StopItemPayload = {
  reason: StopReason;
  until: string | null;
};
