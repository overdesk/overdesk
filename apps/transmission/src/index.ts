import { WebSocketServer } from 'ws';

const main = async () => {
  const port = parseInt(process.env.PORT ?? '') || 4001;

  const wss = new WebSocketServer({
    path: '/transmission',
    port,
  });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      wss.clients.forEach((client) => client.send(message));
    });
  });

  console.log(`Server running on :${port}`);
};

main();
