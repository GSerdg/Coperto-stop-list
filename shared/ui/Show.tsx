import type { FC, PropsWithChildren, ReactNode } from 'react';

interface ShowProps extends PropsWithChildren {
  fallback?: React.JSX.Element;
  when?: boolean | null | number | ReactNode | string | undefined;
}

/**
 * Used to for readable conditional rendering.
 *
 * ```
 * <Show when={condition} fallback={<h1>I am fallback!</h1>}>
 *   <h1>It is true!</h1>
 * </Show>
 * ```
 */
export const Show: FC<ShowProps> = (props) => {
  const { children, fallback = null, when = false } = props;

  if (when) {
    return children;
  }

  return fallback;
};
