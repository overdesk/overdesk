import { cloneElement, useMemo } from 'react';

import type { ChildrenProps } from '@overdesk/webapp/shared';

import { MessengerContextProvider } from '../../unbound/context/MessengerContext';

export interface AppContextProviderProps extends ChildrenProps {}

export const AppContextProvider = (props: AppContextProviderProps) => {
  const { children } = props;

  const providers = [
    useMemo(() => {
      const port = Math.random() > 0.5 ? 4001 : 4002;
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
