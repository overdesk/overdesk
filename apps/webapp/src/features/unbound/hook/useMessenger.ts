import { useEffect } from 'react';

import { useEventCallback } from '@overdesk/utils';
import { useMessengerContext } from '@overdesk/webapp/widgets/unbound/context/MessengerContext';

import type { Message } from '../lib/messenger';

export interface UseMessengerParams {
  channelId?: string;
  onMessage: (message: Message) => void;
}

export default function useMessenger(params: UseMessengerParams) {
  const { channelId, onMessage: onMessageParam } = params;

  const onMessage = useEventCallback(onMessageParam);

  const messenger = useMessengerContext();

  const sendMessage = (message: Message) => {
    if (messenger) {
      messenger.send(message);
    }
  };

  useEffect(() => {
    if (messenger) {
      const unsubscribe = messenger.subscribe((message) => {
        onMessage(message);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [messenger]);

  return {
    messenger,
    sendMessage,
  };
}
