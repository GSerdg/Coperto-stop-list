import { z } from 'zod';

const MAX_AHEAD_MS = 24 * 60 * 60 * 1000;
const STEP_MS = 15 * 60 * 1000;

export const stopReasonSchema = z.enum(['out_of_stock', 'equipment', 'quality', 'menu_change'], {
  message: 'Выберите причину из списка',
});

export const stopItemSchema = z.object({
  reason: stopReasonSchema,
  until: z
    .string()
    .nullable()
    .refine(
      (val) => {
        if (val === null) return true;

        const ts = Date.parse(val);
        if (Number.isNaN(ts)) return false;

        const now = Date.now();
        // 1. Время должно быть в будущем
        if (ts <= now) return false;
        // 2. Не больше чем на 24 часа вперёд
        if (ts - now > MAX_AHEAD_MS) return false;
        // 3. Шаг — 15 минут
        if (ts % STEP_MS !== 0) return false;

        return true;
      },
      {
        message: 'Время должно быть в будущем (макс. 24 часа) с шагом в 15 минут.',
      },
    ),
});

export type StopItemInput = z.infer<typeof stopItemSchema>;
