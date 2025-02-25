import { WebSocketServer } from 'ws';

const main = async () => {
  const wss = new WebSocketServer({ port: 8080 });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('received: %s', message);
    });
  });

  console.log('Server running on :8080');
};

main();
