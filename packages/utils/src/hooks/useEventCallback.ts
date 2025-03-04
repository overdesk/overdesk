import { useCallback, useLayoutEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn<Args extends any[], R> = (...args: Args) => R;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useEventCallback<Args extends any[], R>(
  fn: Fn<Args, R>,
): Fn<Args, R> {
  const ref = useRef<Fn<Args, R>>(fn);
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args: Args): R => ref.current(...args), []);
}
