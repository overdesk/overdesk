import { Kafka } from 'kafkajs';
import { WebSocketServer } from 'ws';

import { deserializeMessage, serializeMessage } from '@overdesk/chat';

const main = async () => {
  const port = parseInt(process.env.PORT ?? '') || 4001;

  const wss = new WebSocketServer({
    path: '/transmission',
    port,
  });
  const kafka = new Kafka({
    brokers: ['localhost:9092'],
  });
  const producer = kafka.producer();
  const consumer = kafka.consumer({ groupId: `chat-receiver-${port}` });

  await producer.connect();
  await consumer.connect();

  wss.on('connection', async (ws) => {
    ws.on('message', async (data) => {
      const { sender, body } = deserializeMessage(data.toString());
      const message = serializeMessage({ sender, body });

      await producer.send({
        topic: 'chat',
        messages: [{ value: message }],
      });
    });
  });

  await consumer.subscribe({ topic: 'chat', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (topic === 'chat') {
        const parsedMessage = deserializeMessage(
          message?.value?.toString() ?? '{}',
        );

        wss.clients.forEach((client) => {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(parsedMessage));
          }
        });
      }
    },
  });

  console.log(`Server running on :${port}`);
};

main().catch(console.error);
