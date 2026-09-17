import { StopItemInput, stopItemSchema } from '@/shared/validation/stop-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useUiStore } from '../../model/ui-store';
import { useStopItem } from '../../model/useStopItem';
import { StopReason } from '@/types/menu';
import { TabButton } from '@/shared/ui';
import { formatISOToLocalInput } from '@/shared/utils';

const reasons: { label: string; value: StopReason }[] = [
  { label: 'Закончились продукты на кухне / баре', value: 'out_of_stock' },
  { label: 'Сломалось кухонное оборудование', value: 'equipment' },
  { label: 'Вопросы к качеству партии продуктов', value: 'quality' },
  { label: 'Позиция выведена из меню текущей смены', value: 'menu_change' },
];

export const StopReasonForm: FC = () => {
  const { activeId, activeItem, closeStopPanel } = useUiStore();
  const { stopItem, mutatingIds } = useStopItem();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<StopItemInput>({
    resolver: zodResolver(stopItemSchema),
    mode: 'onBlur',
    defaultValues:
      activeItem?.status.kind === 'stopped'
        ? {
            reason: activeItem.status.reason,
            until: formatISOToLocalInput(activeItem.status.until),
          }
        : {
            reason: 'out_of_stock',
            until: null,
          },
  });

  const selectedReason = useWatch({ control, name: 'reason' });
  const selectedUntilTime = useWatch({ control, name: 'until' });

  const isUntilShiftEnd = selectedUntilTime === null;

  const handleTimeModeChange = (mode: 'shift' | 'time') => {
    if (mode === 'shift') {
      setValue('until', null, { shouldValidate: true });
    } else {
      const now = new Date();
      now.setMinutes(Math.ceil((now.getMinutes() + 15) / 15) * 15, 0, 0);

      const offset = now.getTimezoneOffset() * 60000;
      const localTime = new Date(now.getTime() - offset).toISOString().slice(0, 16);

      setValue('until', localTime, { shouldValidate: true });
    }
  };

  const isChange = !(
    activeItem?.status.kind === 'stopped' &&
    selectedReason === activeItem.status.reason &&
    selectedUntilTime === formatISOToLocalInput(activeItem?.status.until)
  );

  const isSaving = activeId ? mutatingIds.has(activeId) : false;

  const onSubmit = (data: StopItemInput) => {
    if (!activeId) return;

    const payload = {
      reason: data.reason,
      until: data.until ? new Date(data.until).toISOString() : null,
    };

    stopItem(
      { id: activeId, payload },
      {
        onSuccess: () => {
          closeStopPanel();
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="custom-scrollbar flex flex-1 flex-col justify-between overflow-y-auto p-6"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-brand-text/60 text-xs font-bold tracking-wider uppercase">
            Причина блокировки
          </h2>
          <div className="space-y-2">
            {reasons.map((reason) => {
              const isChecked = selectedReason === reason.value;

              return (
                <label
                  key={reason.value}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all duration-200 ${
                    isChecked
                      ? 'border-brand-accent bg-brand-accent/5 ring-brand-accent ring-1'
                      : 'border-brand-text/10 hover:border-brand-text/20 bg-white'
                  }`}
                >
                  <input
                    {...register('reason')}
                    type="radio"
                    value={reason.value}
                    className="text-brand-accent focus:ring-brand-accent mt-0.5 h-4 w-4 cursor-pointer"
                  />
                  <span
                    className={`text-sm font-medium ${isChecked ? 'text-brand-text' : 'text-brand-text/70'}`}
                  >
                    {reason.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-brand-text/60 text-xs font-bold tracking-wider uppercase">
            Срок действия стопа
          </h2>
          <div className="border-brand-text/5 inline-flex rounded-xl border bg-black/5 p-1">
            <TabButton
              groupId="form"
              onClick={() => handleTimeModeChange('shift')}
              isActive={isUntilShiftEnd}
              label="До конца смены"
            />
            <TabButton
              groupId="form"
              onClick={() => handleTimeModeChange('time')}
              isActive={!isUntilShiftEnd}
              label="Указать время"
            />
          </div>
          {!isUntilShiftEnd && (
            <div className="space-y-1.5">
              <input
                type="datetime-local"
                step="900"
                {...register('until')}
                className={`text-brand-text w-full rounded-xl border bg-white px-4 py-3 text-sm font-medium shadow-xs transition-all focus:ring-2 focus:outline-hidden ${
                  errors.until
                    ? 'border-brand-error focus:border-brand-error focus:ring-brand-error/20'
                    : 'border-brand-text/10 focus:border-brand-accent focus:ring-brand-accent/10'
                }`}
              />
              {errors.until && (
                <p className="text-brand-error mt-1 text-xs font-medium">{errors.until.message}</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="border-brand-text/10 mt-8 flex items-center gap-3 border-t pt-4">
        <button
          type="button"
          onClick={closeStopPanel}
          disabled={isSaving}
          className="border-brand-text/20 hover:bg-brand-text/5 text-brand-text flex-1 cursor-pointer rounded-xl border py-3 text-sm font-semibold transition-all"
        >
          Отмена
        </button>
        <button
          type="submit"
          disabled={isSaving || !isChange}
          className={`bg-brand-accent hover:bg-brand-accent/90 inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-md transition-all ${
            isSaving || !isChange ? 'bg-brand-accent/60 cursor-wait' : ''
          }`}
        >
          {isSaving && <span className="btn-spinner text-sm" />}
          {activeItem?.status.kind === 'stopped' ? 'Сохранить изменения' : 'Подтвердить стоп'}
        </button>
      </div>
    </form>
  );
};
