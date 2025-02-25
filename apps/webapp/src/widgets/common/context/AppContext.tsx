import { cloneElement } from 'react';

import type { ChildrenProps } from '@overdesk/webapp/shared';

import { MessengerContextProvider } from '../../unbound/context/MessengerContext';

export interface AppContextProviderProps extends ChildrenProps {}

export const AppContextProvider = (props: AppContextProviderProps) => {
  const { children } = props;

  const providers = [
    //
    <MessengerContextProvider url="" />,
  ];

  const combined = providers.reduceRight((acc, provider) => {
    return cloneElement(provider, provider.props, acc);
  }, children);

  return combined;
};
