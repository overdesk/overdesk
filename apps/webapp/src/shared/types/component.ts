import type { ReactNode } from 'react';

export type ChildrenProps<Required extends boolean = false> =
  Required extends true ? { children: ReactNode } : { children?: ReactNode };
