import { cloneElement, useMemo } from 'react';

import type { ChildrenProps } from '@overdesk/webapp/shared';

import { MessengerContextProvider } from '../../unbound/context/MessengerContext';

export interface AppContextProviderProps extends ChildrenProps {}

export const AppContextProvider = (props: AppContextProviderProps) => {
  const { children } = props;

  const providers = [
    useMemo(() => {
      const port =
        typeof window !== 'undefined'
          ? new URLSearchParams(location.search).get('port') || 4001
          : 4001;
      return (
        <MessengerContextProvider url={`ws://127.0.0.1:${port}/transmission`} />
      );
    }, []),
  ];

  const combined = providers.reduceRight((acc, provider) => {
    return cloneElement(provider, provider.props, acc);
  }, children);

  return combined;
};
