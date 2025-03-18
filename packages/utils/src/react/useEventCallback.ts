import { useCallback, useRef } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn<Args extends any[], R> = (...args: Args) => R;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEventCallback = <Args extends any[], R>(
  fn: Fn<Args, R>,
): Fn<Args, R> => {
  const ref = useRef<Fn<Args, R>>(fn);
  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args: Args): R => ref.current(...args), []);
};
