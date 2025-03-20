import { type FormEvent, useState } from 'react';

import type { Message } from '@overdesk/chat';
import { useMessenger } from '@overdesk/webapp/features';

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([]);

  const { sendMessage } = useMessenger({
    onMessage: (message) => {
      setMessages((prev) => [...prev, message]);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const sender = data.get('sender');
    const body = data.get('body');

    if (
      !sender ||
      typeof sender !== 'string' ||
      !body ||
      typeof body !== 'string'
    ) {
      alert('Please fill in both fields');
      return;
    }

    sendMessage({ sender: { id: sender }, body });
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <h1 className="text-2xl">Hi, there. 👋</h1>
      <div className="flex">
        sender: <input className="w-full" name="sender" />
      </div>
      <div className="flex">
        body: <input className="w-full" name="body" />
      </div>
      <input type="submit" value="Send" />
      <div>
        <ol>
          {messages.map((message, index) => (
            <li key={index}>
              <div>
                <b>{message.sender.id}</b>: {message.body}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </form>
  );
}
