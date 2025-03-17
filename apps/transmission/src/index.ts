import { Kafka } from 'kafkajs';
import { WebSocketServer } from 'ws';

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
  const consumer = kafka.consumer({ groupId: 'chat-receiver' });

  await producer.connect();
  await consumer.connect();

  wss.on('connection', async (ws) => {
    ws.on('message', async (data) => {
      const { username, body } = JSON.parse(data.toString());
      const message = JSON.stringify({ username, body });

      await producer.send({
        topic: 'chat',
        messages: [{ value: message }],
      });
    });
  });

  await consumer.subscribe({ topic: 'chat', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const parsedMessage = JSON.parse(message?.value?.toString() ?? '{}');
      console.log('Received message:', {
        message: {
          type: typeof message,
          value: message,
          valueToString: message?.value?.toString(),
        },
        parsedMessage: { type: typeof parsedMessage, value: parsedMessage },
      });

      wss.clients.forEach((client) => {
        if (client) {
          client.send(JSON.stringify(parsedMessage));
        }
      });
    },
  });

  console.log(`Server running on :${port}`);
};

main().catch(console.error);
