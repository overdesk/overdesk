import { isObject, isString } from 'lodash-es';

import { type Referrer, SerializationError } from '@overdesk/utils';

export interface Message {
  body: string;
  sender: Referrer;
}

export const isMessage = (message: unknown): message is Message => {
  if (!isObject(message)) return false;
  const { body, sender } = message as Record<keyof Message, unknown>;
  if (!isString(body)) return false;
  if (!isObject(sender)) return false;
  const { id } = sender as Record<keyof Referrer, unknown>;
  if (!isString(id)) return false;
  return true;
};

export const serializeMessage = (message: Message): string => {
  if (!isMessage(message)) {
    throw new SerializationError('Failed to serialize message', message);
  }
  return JSON.stringify(message);
};

export const deserializeMessage = (message: string): Message => {
  const result = JSON.parse(message);
  if (!isMessage(result)) {
    throw new SerializationError('Failed to deserialize message', message);
  }
  return result;
};
