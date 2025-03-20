import {
  createContext,
  type PropsWithChildren,
  use,
  useEffect,
  useMemo,
} from 'react';

import { Messenger } from '@overdesk/webapp/features';

export type MessengerContextValue = Messenger;

export const MessengerContext = createContext<MessengerContextValue | null>(
  new Messenger(),
);

export const MessengerContextProvider = (
  props: PropsWithChildren & { url: string },
) => {
  const { children, url } = props;

  const messenger = useMemo(() => new Messenger(), []);

  useEffect(() => {
    if (!messenger.hasConnection()) {
      messenger.connect(url);
    }
  }, [messenger, url]);

  return <MessengerContext value={messenger}>{children}</MessengerContext>;
};

export const useMessengerContext = () => use(MessengerContext);
