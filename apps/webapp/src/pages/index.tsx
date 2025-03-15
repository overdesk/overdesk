import { useState } from 'react';

import { type Message, useMessenger } from '@overdesk/webapp/features';

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([]);

  const { sendMessage } = useMessenger({
    onMessage: (message) => {
      setMessages((prev) => [...prev, message]);
    },
  });

  const handleSubmit = () => {
    const username = document.querySelector<HTMLInputElement>(
      'input[name="username"]',
    )?.value;
    const body =
      document.querySelector<HTMLInputElement>('input[name="body"]')?.value;

    if (!username || !body) {
      alert('Please fill in both fields');
      return;
    }

    sendMessage({ username, body });
  };

  return (
    <div className="">
      <h1 className="text-2xl">Hi, there. 👋</h1>
      <div className="flex">
        username: <input className="w-full" name="username" />
      </div>
      <div className="flex">
        body: <input className="w-full" name="body" />
      </div>
      <button onClick={handleSubmit}>Send</button>
      <div>
        <ol>
          {messages.map((message, index) => (
            <li key={index}>
              <div>
                <b>{message.username}</b>: {message.body}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
