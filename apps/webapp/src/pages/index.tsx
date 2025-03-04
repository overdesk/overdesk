import { useState } from 'react';

import { type Message } from '@overdesk/webapp/features';

import useMessenger from '../features/unbound/hook/useMessenger';

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([]);

  const { sendMessage } = useMessenger({
    onMessage: (message) => setMessages((prev) => [...prev, message]),
  });

  const handleSubmit = () => {
    const username = document.querySelector<HTMLInputElement>(
      'input[name="username"]',
    )?.value;
    const text =
      document.querySelector<HTMLInputElement>('input[name="text"]')?.value;

    if (username && text) {
      sendMessage({ username, text });
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl">Hi, there. 👋</h1>
      <div className="flex">
        username: <input className="w-full" name="username" />
      </div>
      <div className="flex">
        text: <input className="w-full" name="text" />
      </div>
      <button onClick={handleSubmit}>Send</button>
      <div>
        <ol>
          {messages.map((message, index) => (
            <li key={index}>
              <div>{message.username}</div>
              <div>{message.text}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
